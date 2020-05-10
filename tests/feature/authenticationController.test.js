import request from "supertest";

import app, { server } from "../../src/server";
import DbConnection from "../../src/database";

const url = "/api/v1";

afterAll(async () => {
  DbConnection.dropDb();  // drop db
  await server.close();   // close server
});

describe("Authentication Controller test", () => {
  describe("Validate user inputs", () => {
    it("should return a BadRequest error for missing required fields", async () => {
      const response = await request(app).post(`${url}/signup`).send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].type).toBe("BadRequest");
    });

    it("should return a BadRequest error for invalid type of data for a field", async () => {
      const response = await request(app).post(`${url}/signup`).send({
        name: 524214,
        username: "johnddde",
        email: "john@dode.com",
        password: "password",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toBe("name must be a string");
    });
  });

  describe("Create a new user", () => {
    it("should create a new user and return a token", async () => {
      const response = await request(app).post(`${url}/signup`).send({
        name: "john doe",
        username: "johndoe",
        email: "john@dode.com",
        password: "password",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("Singup successful");
    });
  });

  describe("Check if email or username already exists", () => {
    it("should return DuplicatRecord error is user signs up with an email or username that already exists in the database", async () => {
      const response = await request(app).post(`${url}/signup`).send({
        name: "john doe",
        username: "johndoe",
        email: "john@dode.com",
        password: "password",
      });
      expect(response.statusCode).toBe(409);
      expect(response.body.error.type).toBe("DuplicateRecord");
    });
  });
});
