import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "movie",
      required : true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required : true
    },
  },
  { timestamps: { updatedAt: false, createdAt: true } }
);

export default model("fav",schema)

