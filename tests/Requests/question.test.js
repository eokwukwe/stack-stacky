import request from 'supertest';

import app, { server } from '../../src/server';
import DbConnection from '../../src/database';
import JwtHelper from '../../src/helpers/JwtHelper';

const url = '/api/v1';

afterAll(async () => {
  DbConnection.dropDb(); // drop db
  await server.close(); // close server
});

describe('Question Requests test', () => {
  const token = `Bearer ${JwtHelper.generateToken({ id: '5eb96a4470a496331497b66c' })}`;

  let question;

  describe('Create a new question', () => {
    describe('Verify token', () => {
      it('should return a UnauthorizedAccess error for missing token', async () => {
        const response = await request(app).post(`${url}/questions`).send({
          title: 'title',
          body: 'body',
        });
        expect(response.statusCode).toBe(401);
        expect(response.body.error.type).toBe('UnauthorizedAccess');
      });

      it('should return a UnauthorizedAccess error for an invalid token', async () => {
        const response = await request(app)
          .post(`${url}/questions`)
          .set({ Authorization: `${token}d` })
          .send({
            title: 'title',
            body: 'body',
          });
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toBe('Invalid token');
      });
    });

    describe('Validate request payload', () => {
      it('should return a BadRequest error for missing required fields', async () => {
        const response = await request(app)
          .post(`${url}/questions`)
          .set({ Authorization: token })
          .send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].type).toBe('BadRequest');
      });

      it('should return a BadRequest error for invalid type of data for a field', async () => {
        const response = await request(app)
          .post(`${url}/questions`)
          .set({ Authorization: token })
          .send({
            title: 5241522,
            body: 'body',
          });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].message).toBe('question title must be a string');
      });
    });

    describe('Create a new question', () => {
      it('should create a new question', async () => {
        const response = await request(app)
          .post(`${url}/questions`)
          .set({ Authorization: token })
          .send({
            title: 'title',
            body: 'body',
          });
        question = response.body.data;
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Question created successfully');
      });
    });

    describe('Fetch a question by ID', () => {
      it('should return BadRequst error for invalid ID', async () => {
        const response = await request(app).get(`${url}/questions/5eb96a5c70a496331497b66g`);
        expect(response.statusCode).toBe(400);
        expect(response.body.error.message).toBe('Resource ID is not a invalid object Id');
      });

      it('should return RecordNotFound error for a question that does not exist', async () => {
        const response = await request(app).get(`${url}/questions/5eb96a5c70a496331497b664`);
        expect(response.statusCode).toBe(404);
        expect(response.body.error.type).toBe('RecordNotFound');
      });

      it('should return a question that does exist', async () => {
        const response = await request(app).get(`${url}/questions/${question._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
      });
    });
  });
});
