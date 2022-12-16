import mongoose, { Document, Model } from "mongoose";

export interface IArtist {
  deezer_id: number;
  name: string;
  picture_big: string;
  nb_fan: number;
  picture: string;
}
export interface IArtistModel extends IArtist, Document {}

const ArtistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    picture_big: {
      type: String,
    },
    nb_fan: {
      type: Number,
    },
    deezer_id: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IArtistModel>("Artist", ArtistSchema);
