import { model, Schema } from "mongoose";

const TeamSchema = new Schema(
  {
    name: String,
    foundation: Number,
    logoUrl: String,
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_, ret) {
        delete ret._id;
        return ret;
      },
    },
  }
);

export default model("Team", TeamSchema);
