import express from 'express'
const router = express.Router()

import { checkSession, deposit, getUsers, login, register, transfer, withdraw } from '../controllers/users'

router.route("/login")
    .get(checkSession)
    .post(login)

router.route("/")
    .post(register)
    .get(getUsers)

router.post("/deposit", deposit)
router.post("/withdraw", withdraw)
router.patch("/transfer", transfer)

module.exports = router