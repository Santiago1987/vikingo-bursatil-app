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
        ret.data = ret.data.map(
          (item: { quantity: number; prima: number; _id: string }) => {
            return {
              quantity: item.quantity,
              prima: item.prima,
              id: item._id,
            };
          }
        );
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Option = model("Option", optionSchema);
