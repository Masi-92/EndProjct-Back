import { model, Schema } from "mongoose";
// um in MoongoDB Dokumente anhand dieser Referenzen abrufen und füllen
//Movie <=>  user no name no date just Id wile ist indexde 
const schema = new Schema(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "movie", // Verweis auf das "movie"-Model
      required : true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",// Verweis auf das "User"-Model
      required : true
    },
  },
  { timestamps: { updatedAt: false, createdAt: true } }
);

export default model("fav",schema)

