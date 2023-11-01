import express, { RequestHandler, Request, Response } from 'express'
import { knex } from '../dbconfig';
import bcrypt from 'bcryptjs'
import { v4 as uuid } from 'uuid';

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
        console.log(user)
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
        const newUser = {
            id,
            email: email.toLowerCase(),
            password: hash,
            wallet: 1000
        };
        const user = await knex('Users').insert(newUser);
        console.log(user)
        return res.status(201).json({
            message: "Success",
            user
        })
    } catch (error) {
        console.log(error)
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
        console.log(user)
        const hash = user.password
        const correct = await checkPassword(password, hash)
        console.log('pass is', correct)
        if (!correct) {
            return res.status(400).json({ message: "Wrong email or password" })
        }
        req.session.user_id = user.id
        console.log(req.session)
        return res.status(200).json({
            message: "Success",
            user
        })
    } catch (error) {
        console.log(error)
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
        console.log('amount is', amount)
        if (amount < 1 && typeof amount != 'number') {
            return res.status(400).json({ message: "Invalid amount" })
        }
        const id = req.body.id || req.session.user_id
        console.log('id is', id)
        const update = await knex('Users')
            .where('id', '=', id)
            .increment('wallet', amount);
        const new_transaction = {
            id: uuid(),
            user_id: id,
            transaction_type: 'D',
            amount
        }
        const create_transfer = await knex('Transactions').insert(new_transaction);
        return res.status(201).json({
            message: "Success"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error" })
    }
}

export const withdraw: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body
        console.log('amount is', amount)
        if (amount < 1 && typeof amount != 'number') {
            return res.status(400).json({ message: "Invalid amount" })
        }
        const id = req.body.id || req.session.user_id
        console.log('id is', id)
        const update = await knex('Users')
            .where('id', '=', id)
            .decrement('wallet', amount);
        const new_transaction = {
            id: uuid(),
            user_id: id,
            transaction_type: 'W',
            amount
        }
        const create_transfer = await knex('Transactions').insert(new_transaction);
        return res.status(201).json({
            message: "Success"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error" })
    }
}

export const transfer: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { amount, receiver_id } = req.body
        const id = req.body.id || req.session.user_id
        console.log('amount is', amount)

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
        console.log('id is', id)
        const update = await knex('Users')
            .where('id', '=', id)
            .andWhere('wallet', '>=', amount)
            .decrement('wallet', amount);
        if (update === 0) {
            console.log('Wallet amount not decreased: insufficient funds');
            return res.status(400).json({ message: "Wallet amount not decreased: insufficient funds" })
        }
        const new_transfer = {
            id: uuid(),
            sender_id: id,
            receiver_id,
            amount
        }
        const create_transfer = await knex('Transfers').insert(new_transfer);

        return create_transfer ? res.status(201).json({
            message: "Success"
        }) : res.status(400).json({ message: "Error" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error" })
    }
}

export const logout: RequestHandler = async (req: Request, res: Response) => {
    res.session.user_id = null
    delete res.session
    return res.status(200).json({ message: "Logged out" })
}