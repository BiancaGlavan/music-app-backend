import mongoose, { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  imageThumb?: string;
  role: string;
  albums: string[];
  artists: string[];
  songs: string[];
  playlists: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    imageThumb: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    albums: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Album",
        default: [],
      },
    ],
    artists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Artist",
        default: [],
      },
    ],
    playlists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Playlist",
        default: [],
      },
    ],
    songs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Song",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUserModel>("User", UserSchema);
