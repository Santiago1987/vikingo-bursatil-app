import supertest from "supertest";
import { app, server } from "../../server";
import { test, expect, afterAll, beforeEach, describe } from "@jest/globals";
import { Especie } from "../models/especies";
import { getLocalConnection } from "../../Mongo/getLocalconnection";

const api = supertest(app);
const testEspecies = [
  {
    name: "testEspecie1",
    ticket: "testTicket1",
  },
  { name: "testEspecie2", ticket: "testTicket2" },
];

beforeEach(async () => {
  const DBConnection = await getLocalConnection();
  // Clean up the database before each test
  await Especie.deleteMany({});

  // test especies

  const especie1 = new Especie(testEspecies[0]);
  const especie2 = new Especie(testEspecies[1]);
  await especie1.save();
  await especie2.save();
  await DBConnection.connection.close();
});

describe("especies endpoints tests", () => {
  test("get all especies: inital 2", async () => {
    return await api
      .get("/api/especies/all")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveLength(testEspecies.length);
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("ticket");
      });
  });

  test("the fist ticket has the name testEspecie1", async () => {
    return await api
      .get("/api/especies/all")
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body[0].ticket).toBe(testEspecies[0].ticket);
        expect(response.body[0].name).toBe(testEspecies[0].name);
      });
  });

  test("save a new especie", async () => {
    const newEspecie = {
      ticket: "testTicket",
      name: "testName",
    };

    await api
      .post("/api/especies/save")
      .send(newEspecie)
      .expect(201)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("ticket");
      });

    const response = await api.get("/api/especies/all");
    expect(response.body).toHaveLength(testEspecies.length + 1);
    expect(response.body[2].ticket).toBe(newEspecie.ticket);
  });

  test("save same especie", async () => {
    const newEspecie = {
      ticket: "testTicket",
      name: "testName",
    };

    // Save the first especie
    const DBConnection = await getLocalConnection();
    const firstEspecie = new Especie(newEspecie);
    await firstEspecie.save();
    await DBConnection.connection.close();
    // Try to save the same especie again
    return await api
      .post("/api/especies/save")
      .send(newEspecie)
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Ticket already exists");
      });
  });

  test("save without name", async () => {
    const newEspecie = {
      ticket: "testTicket",
    };

    return await api
      .post("/api/especies/save")
      .send(newEspecie)
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Name and ticket are required");
      });
  });

  test("get ispecific especie", async () => {
    const especie = testEspecies[0];
    return await api
      .get(`/api/especies/${especie.ticket}`)
      .expect(200)
      .expect("Content-Type", /application\/json/)
      .then((response) => {
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("ticket");
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toBe(especie.name);
        expect(response.body[0].ticket).toBe(especie.ticket);
      });
  });
});

afterAll(() => {
  server.close(); // Close the server after all tests
});
