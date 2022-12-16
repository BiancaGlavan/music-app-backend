import { addToFavArtist, getAlbums, getArtists, getPlaylists, getSongs, removeFavArtist } from "../controllers/favouritesController";
import express from "express";

import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get("/albums", getAlbums);

router.get("/playlists", getPlaylists);

router.get("/artists", isAuth, getArtists);

router.get("/songs", getSongs);

router.post("/add/artist", isAuth, addToFavArtist);

// id is the deezer_id
router.post("/remove/artist/:id", isAuth, removeFavArtist);

export default router;
