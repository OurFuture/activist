/* eslint-env mocha */
process.env.NODE_ENV = 'test';

// const mongoose = require('mongoose');
const Event = require('../../models/Event');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const should = chai.should();

chai.use(chaiHttp);

describe('Events', () => {
  beforeEach((done) => {
    // before each test we empty the database
    Event.remove({}, () => {
      done();
    });
  });

  describe('/GET event', () => {
    it('does GET all the events', (done) => {
      chai.request(app)
        .get('/api/event')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.keys('confirmation', 'results');
          res.body.confirmation.should.be.eql('success');
          res.body.results.should.be.a('array');
          res.body.results.should.be.empty;
          done();
        });
    });
  });

  describe('/POST event', () => {
    it('does POST an event', (done) => {
      const testEvent = {
        title: 'foo title 2',
        street: '11 wall st',
        city: 'new york',
        state: 'ny',
      };

      chai.request(app)
        .post('/api/event')
        .send(testEvent)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.keys('confirmation', 'result');
          res.body.confirmation.should.be.eql('success');
          res.body.result.should.have.keys('title', 'slug', 'description', 'address', 'geo', 'timestamp', 'id');
          res.body.result.geo.should.be.a('array');
          res.body.result.geo.should.have.length(2);
          done();
        });
    });
  });
});
