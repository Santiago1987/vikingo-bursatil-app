import { Schema, model } from "mongoose";

const optionSchema = new Schema(
  {
    ticket: { type: String, require: true, unique: true },
    expiration: { type: String, require: true },
    operations: [{ type: Schema.Types.ObjectId, ref: "Operations" }],
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

const operationsSchema = new Schema(
  {
    base: { type: Number, require: true },
    type: { type: String, require: true },
    quantity: { type: Number, require: true },
    prima: { type: Number, require: true },
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
export const Operations = model("Operations", operationsSchema);
