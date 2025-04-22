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
    operations: [{ base: 10, type: "call", prima: 100, quantity: 10 }],
  },
  {
    ticket: "testTicket2",
    expiration: "2023-12-30",
    operations: [
      {
        base: 150,
        type: "put",
        prima: 200,
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

  let oper1 = await Operations.insertMany(
    testOptions[0].operations.map((op) => ({ ...op, option: option1._id }))
  );

  option1.operations = oper1.map((op) => op._id);
  await option1.save();

  let oper2 = await Operations.insertMany(
    testOptions[1].operations.map((op) => ({ ...op, option: option2._id }))
  );

  option2.operations = oper2.map((op) => op._id);
  await option2.save();

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

  test("save a new operarion with missing quantity and prima", async () => {
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
    };
    await api
      .post("/api/options/saveNewOperation")
      .send(newOperation)
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("base");
        expect(response.body).toHaveProperty("type");
        expect(response.body).toHaveProperty("prima");
        expect(response.body).toHaveProperty("quantity");
        expect(response.body).toHaveProperty("id");

        expect(response.body.base).toBe(100);
        expect(response.body.type).toBe("call");
        expect(response.body.prima).toBe(0);
        expect(response.body.quantity).toBe(0);
      });
  });

  test("save a new operarion with missing id", async () => {
    const newOperation = {
      base: 100,
      type: "call",
    };
    await api
      .post("/api/options/saveNewOperation")
      .send(newOperation)
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("missing parameter");
      });
  });

  test("update a operation", async () => {
    const DBConnection = await getLocalConnection();

    const OperationList = await Operations.find();
    await DBConnection.connection.close();

    let { _id: id, base, type } = OperationList[0];
    const newOperation = {
      quantity: 5,
      prima: 15,
    };
    await api
      .put(`/api/options/updateOperation/${id}`)
      .send(newOperation)
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("base");
        expect(response.body).toHaveProperty("type");
        expect(response.body).toHaveProperty("quantity");
        expect(response.body).toHaveProperty("prima");
        expect(response.body.id).toBe(id.toString());
        expect(response.body.base).toBe(base);
        expect(response.body.type).toBe(type);
        expect(response.body.quantity).toBe(5);
        expect(response.body.prima).toBe(15);
      });
  });

  test("update the prima with a negative value", async () => {
    const DBConnection = await getLocalConnection();
    const OperationList = await Operations.find();
    await DBConnection.connection.close();

    let { _id: id } = OperationList[0];

    return api
      .put("/api/options/updateOperation/" + id)
      .send({ quantity: 5, prima: -15 })
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("prima cannot be negative");
      });
  });

  test("get all exercises for a especific ticket", async () => {
    const ticket = testOptions[0].ticket;
    return api
      .get(`/api/options/exercise/${ticket}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveLength(1);
        expect(response.body[0].ticket).toBe(ticket);
        expect(response.body[0].expiration).toBe(testOptions[0].expiration);
        expect(response.body[0]).toHaveProperty("id");
      });
  });

  test("get all operations for a ticket and period", async () => {
    let DBConnection = await getLocalConnection();
    const ticket = await Option.find();
    await DBConnection.connection.close();

    let { _id: id } = ticket[0];

    return api
      .get("/api/options/getAllOperations/" + id)
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((result) => {
        expect(result.body).toHaveLength(1);
        expect(result.body[0]).toHaveProperty("id");
        expect(result.body[0]).toHaveProperty("base");
        expect(result.body[0]).toHaveProperty("type");
        expect(result.body[0]).toHaveProperty("prima");
        expect(result.body[0]).toHaveProperty("quantity");
      });
  });

  test("get all operations for a ticket with a incorrect id", async () => {
    return api
      .get("/api/options/getAllOperations/123456789012345678901234")
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Option not found");
      });
  });

  test("delete an operation", async () => {
    let DBConnection = await getLocalConnection();
    const ticket = await Option.findOne({ ticket: "testTicket1" }).populate(
      "operations"
    );
    const operation = ticket?.operations[0];
    const { _id: id } = operation!;
    await DBConnection.connection.close();

    await api
      .delete("/api/options/deleteOperation/" + id)
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("base");
        expect(response.body).toHaveProperty("type");
        expect(response.body).toHaveProperty("quantity");
      });

    DBConnection = await getLocalConnection();
    const ticket2 = await Option.findOne({ ticket: "testTicket1" }).populate(
      "operations"
    );
    const operation2 = ticket2?.operations[0];
    expect(operation2).toBeUndefined(); // Check if the operation was deleted
    await DBConnection.connection.close(); // Close the database connection after the test
  });

  test("delete an operation with a incorrect id", async () => {
    return api
      .delete("/api/options/deleteOperation/123456789012345678901234")
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Operation not found");
      });
  });
});

afterAll(() => {
  console.log("Closing server...");
  server.close(); // Close the server after all tests
});
