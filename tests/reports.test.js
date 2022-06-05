const supertest = require("supertest")
const should = require("should");
const { assert } = require("chai");
const axios = require('axios').default;

const server = supertest.agent("localhost:8081")

describe('Test REST api GET', () => {
    it('testing GET which is add', done => {
        server.get('/add?x=10&y=20')
        .end((err, res) => {
            res.status.should.equal(200)
            res.body.should.equal(30)
            done()
        })
    });
})

describe('Test REST api POST', () => {
    it('testing POST which is add', done => {
        server.post('/add_post')
        .send({ x: 10, y: 20 })
        .end((err, res) => {
            res.status.should.equal(201)
            res.body.should.equal(30)
            done()
        })
    });
})

describe('Test REST api GET with axios', () => {
    it('testing GET which is add', done => {
        axios.get('http://localhost:8081/add?x=10&y=20')
        .then(function (res) {
            res.status.should.equal(200)
            console.log(res)
            res.data.should.equal(30)
            done(null)
        })
        .catch(function (error) {
           console.log(error);
          done(error)         
        })
    });
})