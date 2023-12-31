import express, { RequestHandler, Request, Response } from 'express'
import { knex } from '../dbconfig';
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid';
import { transaction_object, transfer_object, user_object } from '../models/models'

async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function checkPassword(plaintextPassword: string, hashedPassword: string) {
    const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
    return isMatch; // true if the passwords match, false otherwise
}

export const getUsers: RequestHandler = async (req: Request, res: Response) => {
    try {

        const user = await knex('Users').select('id', 'email', 'wallet')
        // console.log(user)
        return res.status(200).json({
            message: "Success",
            user
        })
    } catch (error) {
        return res.status(400).json({ message: "Error" })
    }

}

export const register: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const exists = await knex('Users').select('*').where('email', email.toLowerCase()).first();
        if (exists) {
            return res.status(400).json({ Error: 'Email already exists' })
        }
        const hash = await hashPassword(password)
        const id = uuid()
        const newUser: user_object = {
            id,
            email: email.toLowerCase(),
            password: hash,
            wallet: 1000
        };
        const user = await knex('Users').insert(newUser);
        // console.log(user)
        return res.status(201).json({
            message: "Success",
            user
        })
    } catch (error) {
        // console.log(error)
        return res.status(400).json({ message: "Failed to register user" })
    }

}

export const login: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await knex('Users').select('*').where('email', email.toLowerCase()).first();
        if (!user) {
            return res.status(400).json({ Error: 'Wrong email or password' })
        }
        const hash = user.password
        const correct = await checkPassword(password, hash)
        if (!correct) {
            return res.status(400).json({ message: "Wrong email or password" })
        }
        req.session.user_id = user.id
        // console.log(req.session)
        return res.status(200).json({
            message: "Success",
            user
        })
    } catch (error) {
        // console.log(error)
        return res.status(400).json({ message: "Wrong email or password" })
    }

}

export const checkSession: RequestHandler = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            message: "Success",
            session: req.session
        })
    } catch (error) {
        return res.status(400).json({ message: "Error" })
    }

}

export const deposit: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body
        // console.log('amount is', amount)
        if (amount < 1 && typeof amount != 'number') {
            return res.status(400).json({ message: "Invalid amount" })
        }
        const id = req.body.id || req.session.user_id
        // console.log('id is', id)
        const update = await knex('Users')
            .where('id', '=', id)
            .increment('wallet', amount);
        const new_transaction: transaction_object = {
            id: uuid(),
            user_id: id,
            transaction_type: 'D',
            amount
        }
        const create_transaction = await knex('Transactions').insert(new_transaction);
        return res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        // console.log(error)
        return res.status(400).json({ message: "Error" })
    }
}

export const withdraw: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body
        // console.log('amount is', amount)
        if (amount < 1 && typeof amount != 'number') {
            return res.status(400).json({ message: "Invalid amount" })
        }
        const id = req.body.id || req.session.user_id
        // console.log('id is', id)
        const update = await knex('Users')
            .where('id', '=', id)
            .andWhere('wallet', '>=', amount)
            .decrement('wallet', amount);
        if (update === 0) {
            // console.log('Wallet amount not decreased: insufficient funds');
            return res.status(400).json({ message: "Withdrawal not successful: insufficient funds" })
        }
        const new_transaction: transaction_object = {
            id: uuid(),
            user_id: id,
            transaction_type: 'W',
            amount
        }
        const create_transaction = await knex('Transactions').insert(new_transaction);
        return res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        // console.log(error)
        return res.status(400).json({ message: "Error" })
    }
}

export const transfer: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { amount, receiver_id } = req.body
        const id = req.body.id || req.session.user_id
        // console.log('amount is', amount)

        if (!(amount && receiver_id && id)) {
            return res.status(400).json({ message: "Fill all necessary details" })
        }

        if (amount < 1 && typeof amount != 'number') {
            return res.status(400).json({ message: "Invalid amount" })
        }

        const receiver = await knex('Users')
            .where('id', '=', receiver_id)
            .increment('wallet', amount);
        if (!receiver) {
            return res.status('400').json({ message: "Not found" })
        }
        // console.log('id is', id)
        const update = await knex('Users')
            .where('id', '=', id)
            .andWhere('wallet', '>=', amount)
            .decrement('wallet', amount);
        if (update === 0) {
            // console.log('Wallet amount not decreased: insufficient funds');
            return res.status(400).json({ message: "Transfer not successful: insufficient funds" })
        }
        const new_transfer: transfer_object = {
            id: uuid(),
            sender_id: id,
            receiver_id,
            amount
        }
        const create_transfer = await knex('Transfers').insert(new_transfer);

        return create_transfer ? res.status(200).json({
            message: "Success"
        }) : res.status(400).json({ message: "Error" })
    } catch (error) {
        // console.log(error)
        return res.status(400).json({ message: "Error" })
    }
}

export const getDeposits: RequestHandler = async (req: Request, res: Response) => {
    try {

        const deposits = await knex('Transactions').select('*').where('transaction_type', '=', 'D')
        return res.status(200).json({
            message: "Success",
            deposits
        })
    } catch (error) {
        return res.status(400).json({ message: "Error" })
    }
}
export const getWithdrawals: RequestHandler = async (req: Request, res: Response) => {
    try {

        const withdrawals = await knex('Transactions').select('*').where('transaction_type', '=', 'W')
        return res.status(200).json({
            message: "Success",
            withdrawals
        })
    } catch (error) {
        return res.status(400).json({ message: "Error" })
    }
}

export const logout: RequestHandler = async (req: Request, res: Response) => {
    req.session.user_id = null
    delete req.session
    return res.status(200).json({ message: "Logged out" })
}