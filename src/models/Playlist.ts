import mongoose, { Document, Model } from 'mongoose';

interface IPlaylist {
    deezer_id: number;
    title: string;
    picture_medium: string;
    creator: string;
}
export interface IPlaylistModel extends IPlaylist, Document {}

const PlaylistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    picture_medium: {
      type: String,
    },
    deezer_id: {
      type: Number,
    },
    creator: {
        type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPlaylistModel>('Playlist', PlaylistSchema);