import mongoose, { Document, Model } from 'mongoose';

interface IAlbum {
    deezer_id: number;
    title: string;
    cover: string;
    cover_medium: string;
    cover_small: string;
    cover_big: string;
    genre_id: number;
    fans: number;
    release_date: string;
    type: string;
}
export interface IAlbumModel extends IAlbum, Document {}

const AlbumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
    },
    cover_medium: {
      type: String,
    },
    cover_small: {
      type: String,
    },
    cover_big: {
      type: String,
    },
    type: {
      type: String,
    },
    deezer_id: {
      type: Number,
    },
    genre_id: {
      type: Number,
    },
    fans: {
      type: Number,
    },
    release_date: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAlbumModel>('Album', AlbumSchema);