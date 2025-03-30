import { Schema, model } from "mongoose";

const optionSchema = new Schema(
  {
    ticket: { type: String, require: true, unique: true },
    expiration: { type: String, require: true },
    base: { type: Number, require: true },
    data: [
      {
        quantity: { type: Number, require: true },
        prima: { type: Number, require: true },
      },
    ],
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

export const Option = model("Option", optionSchema);
