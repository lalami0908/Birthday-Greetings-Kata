const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../server');

const api = supertest('http://localhost:4000/greeting/api');

describe('greeting', () => {
    it('greeting msg meets the requirements', (done) => {
      api.get('/v1') 
        .query({ today: '8/8' })
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
          }
         expect(res.body[0]).to.deep.equal({ "title": 'Subject: Happy birthday!',
                                           "content": 'Happy birthday, dear Robert!'});
         expect(res.body[1]).to.deep.equal({ "title": 'Subject: Happy birthday!',
                                           "content": 'Happy birthday, dear Sherry!'});
         done();
        });
    });
  });