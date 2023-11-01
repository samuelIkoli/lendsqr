import express from 'express'
const router = express.Router()

import { checkSession, deposit, getUsers, login, logout, register, transfer, withdraw } from '../controllers/users'



/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all user records in the database.
 *     description: Get all user records in the database.
 *     tags: [User]
 *     responses:
 *       200:
 *         users: Array of user records or empty array if no users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     successful:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       500:
 *         description: Failed to fetch users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Register a new user.
 *     description: Create records for a new user.
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: User
 *         description: The data for the user record to be created.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         example:
 *           email: trial@email.com
 *           password: password
 *     responses:
 *       201:
 *         description: User record successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Failed to register user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to register user"
 *                 data:
 *                   type: null
 */
router.route("/")
    .post(register)
    .get(getUsers)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login for a user who has previously registered successfully.
 *     description: Login for a user using their email and password.
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: Login details
 *         description: Login details for a user, their email and password.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         example:
 *           email: ayibanimi_ikoli@yahoo.com
 *           password: password
 *     responses:
 *       201:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Wrong email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Wrong email or password"
 *                 data:
 *                   type: null
 */
router.route("/login")
    .get(checkSession)
    .post(login)

/**
 * @swagger
 * /users/deposit:
 *   post:
 *     summary: Make a deposit to your wallet.
 *     description: Make a deposit to your account.
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: Deposit
 *         description: The amount to be deposited.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             amount:
 *               type: number
 *             id:
 *               type: string
 *         example:
 *           amount: 500
 *           id: 2e17a3b5-a488-489f-a317-6c6a1bacee34
 *     responses:
 *       201:
 *         description: Deposit successfully done.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Failed to make deposit.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to make deposit"
 *                 data:
 *                   type: null
 */
router.post("/deposit", deposit)

/**
 * @swagger
 * /users/withdraw:
 *   post:
 *     summary: Withdraw from your wallet.
 *     description: Withdraw from your wallet.
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: Withdrawal
 *         description: Amount to withdraw and id for user if not signed in.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             amount:
 *               type: number
 *             id:
 *               type: string
 *         example:
 *           amount: 50
 *           id: 2e17a3b5-a488-489f-a317-6c6a1bacee34
 *     responses:
 *       201:
 *         description: Withdrawal successfully done.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Failed to process withdrawal.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to process withdrawal"
 *                 data:
 *                   type: null
 */
router.post("/withdraw", withdraw)

/**
 * @swagger
 * /users/transfer:
 *   patch:
 *     summary: Transfer funds from one wallet to another (P2P).
 *     description: Transfer funds from one wallet to another (P2P).
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: Transfer details
 *         description: The data for the transfer to be made.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             receiver_id:
 *               type: string
 *             id:
 *               type: string
 *             amount:
 *               type: number
 *         example:
 *           amount: 500
 *           receiver_id: c6f93f0e-4550-422f-aae4-753da948f85b
 *           id: 2e17a3b5-a488-489f-a317-6c6a1bacee34
 *
 *     responses:
 *       201:
 *         description: Education details successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       500:
 *         description: Failed to create education details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 successful:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "invalid input syntax for type integer: \"\""
 *                 data:
 *                   type: null
 */
router.patch("/transfer", transfer)

router.get("/logout", logout)

module.exports = router