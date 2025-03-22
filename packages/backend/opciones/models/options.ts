import { Schema, model } from "mongoose";

const especieSchema = new Schema({
  name: { type: String, require: true },
  ticket: { type: String, require: true, unique: true },
});

export const Especie = model("Especie", especieSchema);

const optionSchema = new Schema({
  ticket: { type: String, require: true, unique: true },
  expiration: { type: String, require: true },
  base: { type: Number, require: true },
  data: [
    {
      quantity: { type: Number, require: true },
      Prima: { type: Number, require: true },
    },
  ],
});

export const Option = model("Option", optionSchema);
