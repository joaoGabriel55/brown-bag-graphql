import { Schema, model } from "mongoose";

const PlayerSchema = new Schema(
  {
    name: String,
    age: Number,
    position: String,
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Player", PlayerSchema);
