import chai from 'chai';
import mongoose from 'mongoose';
import request from 'supertest';
import sampleQuiz from './helpers/sampleQuiz';

describe('Restful API', () => {
  // Establish a connection to the testing database.
  before(done => {
    mongoose.connect('mongodb://localhost:27017/porfiry');
    done();
  });

  const url = 'http://localhost:5000';

  describe('GET /quizzes', () => {
    it('should respond with JSON', done => {
      request(url)
        .get('/api/quizzes')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /quizzes', () => {
    it('should save a quiz to the database', done => {
      request(url)
        .post('/api/quizzes')
        .send(sampleQuiz)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

});
