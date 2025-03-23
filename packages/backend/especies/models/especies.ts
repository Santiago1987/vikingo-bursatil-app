import { Schema, model } from "mongoose";

const especieSchema = new Schema(
  {
    name: { type: String, require: true },
    ticket: { type: String, require: true, unique: true },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Especie = model("Especie", especieSchema);
