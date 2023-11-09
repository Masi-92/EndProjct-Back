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
//Wenn Sie timestamps: true setzen
//   createdAt: ein Datum, das angibt, wann dieses Dokument erstellt wurde
// updatedAt: ein Datum, das angibt, wann dieses Dokument zuletzt aktualisiert wurde
  { timestamps: { updatedAt: false, createdAt: true } }
);

export default model("fav",schema)

