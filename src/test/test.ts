import chai, { expect } from "chai";
import app from '../index';
import chaiHttp from 'chai-http';
chai.use(chaiHttp)

const id = '61936a2a-e4bb-4382-adb7-a705685a10d6'
const receiver_id = '2e17a3b5-a488-489f-a317-6c6a1bacee34';
const amount = 50000

const email = `${Math.floor(Math.random() * 9000 + 1000)}@fakeemail.com`
const password = 'password'

describe('API Endpoint Tests', () => {

    // it(`1). POST requests to /users should create a new user ${email} with a default wallet size of 1000`, async () => {
    //     const response = await chai.request(app).post("/users").type('form').send({
    //         '_method': 'post',
    //         email,
    //         password
    //     });
    //     expect(response.status).to.equal(201);
    //     expect(response.body).to.be.an('object');
    //     // expect(response.body).to.have.property("name");
    //     // expect(response.body).to.have.property("_id");
    // });


    it(`2). GET requests to /users should get all user records`, async () => {
        const response = await chai.request(app).get("/users").type('form');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.user[0]).to.have.property("email");
        expect(response.body.user[0]).to.have.property("wallet");
        expect(response.body.user[0]).to.have.property("id");
    });
});
