import { addToFavAlbum, addToFavArtist, getAlbums, getArtists, getPlaylists, getSongs } from "../controllers/favouritesController";
import express from "express";

import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get("/albums", getAlbums);

router.get("/playlists", getPlaylists);

router.get("/artists", isAuth, getArtists);

router.get("/songs", getSongs);

router.post("/add/artist", isAuth, addToFavArtist);

router.post("/add/album", isAuth, addToFavAlbum);

export default router;
