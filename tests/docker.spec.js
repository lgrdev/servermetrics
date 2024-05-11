const request = require('supertest');
const axios = require('axios');
var expect = require('expect.js');

const baseurl = process.env.BASE_URL+":"+process.env.PORT

axios.post(baseurl+'/api/auth', { apikey: process.env.APIKEY, secretid: process.env.SECRETID })
    .then(res => {
        const token = res.data;
        describe('Test Api docker using supertest', () => { 
        
            it('should successfully pass the test for get api with token :', (done) => {
                request(baseurl)
                    .get('/api/docker')
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .set('x-auth-token',  token)
                    .end(function (err, res) {
                        expect(res.statusCode).to.be.equal(200);
                        expect(res.body).not.to.be.empty;
                        done();
                    });
            });

            it('should successfully pass the test for get api without token', (done) => {
                request(baseurl)
                    .get('/api/docker')
                    .end(function (err, res) {
                        expect(res.statusCode).to.be.equal(403);
                        done();
                    });
            });

            it('should successfully pass the test for get api with false token', (done) => {
                request(baseurl)
                    .get('/api/docker')
                    .set('x-auth-token', 'false token')
                    .end(function (err, res) {
                        expect(res.statusCode).to.be.equal(400);
                        done();
                    });
            });
            
            it('should successfully pass the test for get api with empty token', (done) => {
                request(baseurl)
                    .get('/api/docker')
                    .set('x-auth-token', '')
                    .end(function (err, res) {
                        expect(res.statusCode).to.be.equal(403);
                        done();
                    });
            });
        });

    })
    .catch(error => {
        console.error("Une erreur s'est produite :", error);
    });

