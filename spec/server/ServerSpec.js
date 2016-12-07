var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var {app} = require('../../server/server');
var {db, User, Expense} = require('../../server/database/db-config');

var testUser1 = {
  userName: 'TestingMcTesty',
  password: 'password',
  email: 'test@email.com'
};

var testUser2 = {
  userName: 'Waldo',
  password: 'falalalala',
  email: 'waldo@gmail.com'
};

before((done) => {
  const options = {force: true };
  db.sync(options)
  .then(() => {
    User.destroy({where: { _id: 1 } })
    .then(() => User.destroy({where: { _id: 2 } }))
    .then(() => Expense.destroy({ where: { id: 1 } }))
    .then(() => User.create(testUser1))
    .then(() => User.create(testUser2))
    .then(() => done()).catch((err) => done(err));
  });
});

describe('Test Authentication', () => {

  beforeEach((done) => {
    request(app)
    .post('/auth/signup')
    .send(testUser1)
    .expect((res) => {
      expect(res.status).to.be.calledWith(200);
      done();
    })
    .end(done);
  });

  afterEach(() => {
    User.destroy({ 
      where: { 
        _id: 1 
      } 
    });
  });

  describe('User Login /auth/login', () => {

    it('user should exist', () => {
      User.findOne({ where: { _id: 1 } })
      .then((user) => {
        expect(user).to.exist;
      });
    });
  });
});