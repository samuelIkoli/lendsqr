import chai from "chai";
import app from '../index';
import chaiHttp from 'chai-http';
chai.use(chaiHttp)

describe('API Endpoint Tests', () => {

    const id = '61936a2a-e4bb-4382-adb7-a705685a10d6'
    const receiver_id = '2e17a3b5-a488-489f-a317-6c6a1bacee34';
    const amount = 50000

    const email = `${Math.floor(Math.random() * 9000 + 1000)}@fakeemail.com`
    const password = 'password'

    it(`1). POST requests to /users should create a new user ${email} with a default wallet size of 1000`, async () => {
        const response = await chai.request(app).post("/users").type('form').send({
            '_method': 'post',
            email,
            password
        });
        console.log(response.body)
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        // expect(response.body).to.have.property("name");
        // expect(response.body).to.have.property("_id");
    }).timeout(15000);

    // it(`2). should return user detail when a GET request is made to /api/${name}`, async () => {
    //     const response = await request(app).get(`/api/${name}`);
    //     console.log('\n', response.body)
    //     expect(response.status).to.equal(200);
    //     expect(response.body).to.be.an('object');
    //     expect(response.body).to.have.property("_id"); // Assuming the response includes an 'id'
    //     expect(response.body).to.have.property("name");        // expect(response).to.be.an('object');
    // }).timeout(15000);

    // it(`3). should update user details for ${name} to ${newName}`, async () => {
    //     const response = await request(app).put(`/api/${name}`).type('form').send({
    //         '_method': 'put',
    //         name: newName,
    //         value: newValue
    //     });;
    //     console.log('\n', response.body)
    //     expect(response.status).to.equal(200);
    //     expect(response.body).to.be.an('object');
    //     // expect(response).to.be.an('object');
    // }).timeout(15000);

    // it(`4). should delete user when a POST request is made to /api/${newName}`, async () => {
    //     const response = await request(app).post(`/api/${newName}`);
    //     expect(response.status).to.equal(200);
    //     expect(response.body).to.be.an('object');
    //     expect(response.body).to.have.property("name");
    //     expect(response.body).to.have.property("_id");
    // }).timeout(15000);

    // it(`5). should delete user when a POST request is made to /api/${newName}`, async () => {
    //     const response = await request(app).post(`/api/${newName}`);
    //     expect(response.status).to.equal(200);
    //     expect(response.body).to.be.an('object');
    //     expect(response.body).to.have.property("name");
    //     expect(response.body).to.have.property("_id");
    // }).timeout(15000);

});
