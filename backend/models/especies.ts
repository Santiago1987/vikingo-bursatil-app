import { Schema, model } from "mongoose";

const especieSchema = new Schema({
  especie: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  cotizacionnes: [
    {
      fecha: { type: Date, required: true },
      value: { type: Number, required: true },
    },
  ],
});

especieSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject._id, delete returnedObject.__v;
  },
});

const Especie = model("Especie", especieSchema);

export default Especie;
