const request = require('supertest');
const server = require('../server');

describe("API Server", () => {
    let api;
    let testCat = {
        name: "Bob",
        age: 6
    };

    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(5000, () => {
            console.log("Test server running on port 5000")
        });
    });

    afterAll((done) => {
        // close the server, then run done
        console.log("Gracefully stopping test server")
        api.close(done)
    });

    it('responds to get / with status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

    it('retrieves a profile by name', (done) => {
        request(api)
            .get('/Name1')
            .expect(200)
            .expect({ id:1, name: 'Name1', age: 21, email: 'test@gmail.com'}, done);
    });

    it('responds to a unknown profile name', (done) => {
        request(api).get('/43').expect(404).expect({"message": "This profile does not exist!"}, done);
    });
})