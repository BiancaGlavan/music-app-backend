import { addToFavAlbum, addToFavArtist, getAlbums, getArtists, getPlaylists, getSongs } from "../controllers/favouritesController";
import express from "express";

import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get("/albums", isAuth, getAlbums);

router.get("/playlists", isAuth, getPlaylists);

router.get("/artists", isAuth, getArtists);

router.get("/songs", isAuth, getSongs);

router.post("/add/artist", isAuth, addToFavArtist);

router.post("/add/album", isAuth, addToFavAlbum);

export default router;
