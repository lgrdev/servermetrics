const request = require('supertest');
var expect = require('expect.js');

describe('Test Api auth using supertest', () => {
	const baseurl = process.env.BASE_URL+":"+process.env.PORT
	
	it('should successfully pass the test for get api with apikey and secretid', (done) => {
		request(baseurl)
			.post('/api/auth')
            .send({ apikey: process.env.APIKEY, secretid: process.env.SECRETID })
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(200);
				expect(res.body.token).not.to.be.empty;
				done();
			});
	});
	it('should successfully pass the test for get api without apikey and secretid', (done) => {
		request(baseurl)
			.post('/api/auth')
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(400);
				done();
			});
	});
	it('should successfully pass the test for get api without secretid', (done) => {
		request(baseurl)
			.post('/api/auth')
			.send({ apikey: process.env.APIKEY })
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(400);
				done();
			});
	});
	it('should successfully pass the test for get api without apikey', (done) => {
		request(baseurl)
			.post('/api/auth')
			.send({ secretid: process.env.SECRETID })
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(400);
				done();
			});
	});
	it('should successfully pass the test for get api with false apikey and secretid', (done) => {
		request(baseurl)
			.post('/api/auth')
			.send({ apikey: "falsekey", secretid: "falsesecret" })
			.end(function (err, res) {
				expect(res.statusCode).to.be.equal(400);
				done();
			});
	});

});