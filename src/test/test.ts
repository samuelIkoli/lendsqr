import chai, { expect } from "chai";
import app from '../index';
import chaiHttp from 'chai-http';
chai.use(chaiHttp)

const id = '61936a2a-e4bb-4382-adb7-a705685a10d6'
const ayibanimi_id = '2e17a3b5-a488-489f-a317-6c6a1bacee34';
const amount = 50000

const email = `${Math.floor(Math.random() * 9000 + 1000)}@fakeemail.com`
const password = 'password'

describe('API Endpoint Tests', () => {

    it(`1). POST requests to /users should create a new user ${email} with a default wallet size of 1000`, async () => {
        const response = await chai.request(app).post("/users").type('form').send({
            '_method': 'post',
            email,
            password
        });
        expect(response.status).to.equal(201);
        expect(response.body).to.be.an('object');
    });


    it(`2). GET requests to /users should get all user records`, async () => {
        const response = await chai.request(app).get("/users").type('form');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.user[0]).to.have.property("email");
        expect(response.body.user[0]).to.have.property("wallet");
        expect(response.body.user[0]).to.have.property("id");
    });

    it(`3). POST requests to /users/login should login a user and return the user record`, async () => {
        const response = await chai.request(app).post("/users/login").type('form').send({
            '_method': 'post',
            email: "ayibanimi_ikoli@yahoo.com",
            password
        }).timeout(15000);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.user).to.have.property("email");
        expect(response.body.user).to.have.property("wallet");
        expect(response.body.user).to.have.property("id");
    });

    it(`4). GET requests to /users/logout should logout and destroy the session`, async () => {
        const response = await chai.request(app).get("/users/logout").type('form');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    });

    it(`5). PATCH requests to /users/deposit should deposit ${amount} into the wallet of ayibanimi_ikoli@yahoo.com`, async () => {
        const response = await chai.request(app).patch("/users/deposit").type('form').send({
            '_method': 'patch',
            amount,
            id: ayibanimi_id
        });
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    });

    it(`6). PATCH requests to /users/withdraw should withdraw 500 from the wallet of ayibanimi_ikoli@yahoo.com`, async () => {
        const response = await chai.request(app).patch("/users/deposit").type('form').send({
            '_method': 'patch',
            amount: 500,
            id: ayibanimi_id
        });
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    });

    it(`7). PATCH requests to /users/transfer should transfer 500 from the wallet of ayibanimi_ikoli@yahoo.com to the wallet of johndoe@yahoo.com`, async () => {
        const response = await chai.request(app).patch("/users/transfer").type('form').send({
            '_method': 'patch',
            amount: 500,
            receiver_id: "c6f93f0e-4550-422f-aae4-753da948f85b",
            id: ayibanimi_id
        });
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    });



});
