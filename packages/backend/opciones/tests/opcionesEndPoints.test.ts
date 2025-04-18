import supertest from "supertest";
import { app, server } from "../../server";
import { test, expect, afterAll, beforeEach, describe } from "@jest/globals";
import { Option, Operations } from "../models/options";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

const api = supertest(app);
const testOptions = [
  {
    ticket: "testTicket1",
    expiration: "2023-12-31",
    operations: [
      {
        type: "call",
        price: 100,
        quantity: 10,
      },
    ],
  },
  {
    ticket: "testTicket2",
    expiration: "2023-12-30",
    operations: [
      {
        type: "put",
        price: 200,
        quantity: 20,
      },
    ],
  },
];

beforeEach(async () => {
  const DBConnection = await getLocalConnection();
  // Clean up the database before each test
  await Operations.deleteMany({});
  await Option.deleteMany({});

  // test especies
  const option1 = new Option({
    ticket: testOptions[0].ticket,
    expiration: testOptions[0].expiration,
    operations: [],
  });
  const option2 = new Option({
    ticket: testOptions[1].ticket,
    expiration: testOptions[1].expiration,
    operations: [],
  });
  await option1.save();
  await option2.save();

  await Operations.insertMany(
    testOptions[0].operations.map((op) => ({ ...op, option: option1._id }))
  );
  await Operations.insertMany(
    testOptions[1].operations.map((op) => ({ ...op, option: option2._id }))
  );
  await DBConnection.connection.close(); // Close the database connection after the test
});

describe("options endpoints tests", () => {
  test("save a new option", async () => {
    const newOption = {
      ticket: "testTicket",
      expiration: "2023-12-31",
    };

    await api
      .post("/api/options/save")
      .send(newOption)
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body.ticket).toBe(newOption.ticket);
        expect(response.body.expiration).toBe(newOption.expiration);
        expect(response.body.operations).toHaveLength(0);
      });
    const DBConnection = await getLocalConnection();
    const response = await Option.find({});
    expect(response).toHaveLength(3); // Check if the new option was added
    expect(response[2].ticket).toBe(newOption.ticket);
    await DBConnection.connection.close(); // Close the database connection after the test
  });

  test("save same option again", async () => {
    await api
      .post("/api/options/save")
      .send({ ticket: "testTicket1", expiration: "2023-12-31" })
      .expect(400) // Expecting a 400 Bad Request for duplicate entry
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body.message).toBe("Option already exists");
      });

    const DBConnection = await getLocalConnection();
    const resources = await Option.find({});
    expect(resources).toHaveLength(2); // Check if the new option was not added again
    await DBConnection.connection.close(); // Close the database connection after the test
  });

  test("delete an option", async () => {
    const DBConnection = await getLocalConnection();
    const option = await Option.findOne({ ticket: "testTicket1" });
    const { _id: id } = option!;
    await DBConnection.connection.close(); // Close the database connection after the test

    await api
      .delete(`/api/options/deleteOption/${id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("ticket");
        expect(response.body).toHaveProperty("expiration");

        expect(response.body.ticket).toBe("testTicket1");
        expect(response.body.expiration).toBe("2023-12-31");
      });
  });
});

describe("test operations endpoints", () => {
  test("save a new operation", async () => {
    const DBConnection = await getLocalConnection();

    const ticket = await Option.find({
      ticket: "testTicket1",
      expiration: "2023-12-31",
    });
    await DBConnection.connection.close();

    let { _id: id } = ticket[0];
    const newOperation = {
      id,
      base: 100,
      type: "call",
      quantity: 10,
      prima: 5,
    };
    await api
      .post("/api/options/saveNewOperation")
      .send(newOperation)
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("base");
        expect(response.body).toHaveProperty("type");
        expect(response.body).toHaveProperty("quantity");
        expect(response.body).toHaveProperty("prima");
        expect(response.body.base).toBe(100);
        expect(response.body.type).toBe("call");
        expect(response.body.quantity).toBe(10);
        expect(response.body.prima).toBe(5);
      });
  });
});

afterAll(() => {
  console.log("Closing server...");
  server.close(); // Close the server after all tests
});
