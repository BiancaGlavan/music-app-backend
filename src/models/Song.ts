import mongoose, { Document, Model } from "mongoose";

export interface ISong {
  deezer_id: number;
  title: string;
  preview: string;
  duration: number;
  album_cover: string;
  artist_id: number;
  artist_name: string;
}

export interface ISongModel extends ISong, Document {}

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    album_cover: {
      type: String,
    },
    deezer_id: {
      type: Number,
    },
    preview: {
        type: String,
    },
    duration: {
        type: Number,
    },
    artist_id: {
        type: Number,
    },
    artist_name: {
        type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISongModel>("Song", SongSchema);
