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

  describe('GET /quizzes/:id', () => {
    it('should return a specific quiz from the database', done => {
      request(url)
        .get('/api/quizzes/563a78030474e73d275408d7')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('PUT /quizzes/:id', () => {
    it('should edit the properties of a quiz', done => {
      request(url)
        .put('/api/quizzes/563a78030474e73d275408d7')
        .send({ title: 'Test Quiz' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          let quiz = JSON.parse(res.text).quiz;

          if (quiz.title === 'Test Quiz') {
            done();
          } else {
            done(err);
          }
        });
    });
  });
});
