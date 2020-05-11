import request from "supertest";

import app, { server } from "../../src/server";
import DbConnection from "../../src/database";

const url = "/api/v1";

afterAll(async () => {
  DbConnection.dropDb(); // drop db
  await server.close(); // close server
});

describe("Authentication Requests test", () => {
  describe("User Sign Up", () => {
    describe("Validate signup credentials", () => {
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
          email: "john@doe.com",
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

  describe("User Log In", () => {
    describe("Validate login credentials", () => {
      it("should return a BadRequest error for missing required fields", async () => {
        const response = await request(app).post(`${url}/login`).send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].type).toBe("BadRequest");
      });

      it("should return a BadRequest error for invalid type of data for a field", async () => {
        const response = await request(app).post(`${url}/login`).send({
          email: "johndoe.com",
          password: "password",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].message).toBe(
          "email must be a valid email"
        );
      });
    });

    describe("Verify login credentials", () => {
      it("should return an InvalidCredentials error for incorrect login email", async () => {
        const response = await request(app).post(`${url}/login`).send({
          email: "john@dode.com",
          password: "password",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.error.type).toBe("InvalidCredentials");
      });

      it("should return an InvalidCredentials error for incorrect login password", async () => {
        const response = await request(app).post(`${url}/login`).send({
          email: "john@doe.com",
          password: "passwordd",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.error.type).toBe("InvalidCredentials");
      });
    });

    describe("Login user", () => {
      it("should login user with correct credentials", async () => {
        const response = await request(app).post(`${url}/login`).send({
          email: "john@doe.com",
          password: "password",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Log in successfull");
      });
    });
  });
});
