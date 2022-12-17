import mongoose, { Document, Model } from 'mongoose';

interface IAlbum {
    deezer_id: number;
    title: string;
    cover_medium: string;
    artist: string;
}
export interface IAlbumModel extends IAlbum, Document {}

const AlbumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover_medium: {
      type: String,
    },
    deezer_id: {
      type: Number,
    },
    artist: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAlbumModel>('Album', AlbumSchema);