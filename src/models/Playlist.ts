import mongoose, { Document, Model } from 'mongoose';

interface IPlaylist {
    deezer_id: number;
    title: string;
    fans: number;
    picture: string;
    picture_medium: string;
    creation_date: string;
    creator: string;
}
export interface IPlaylistModel extends IPlaylist, Document {}

const PlaylistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    picture_medium: {
      type: String,
    },
    deezer_id: {
      type: Number,
    },
    fans: {
      type: Number,
    },
    creation_date: {
      type: String,
    },
    creator: {
        type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPlaylistModel>('Playlist', PlaylistSchema);