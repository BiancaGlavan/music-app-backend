import { Request, Response, NextFunction } from 'express';
import Album from '../models/Album';
import Artist from '../models/Artist';
import User from '../models/User';

export const getAlbums = async (req: Request, res: Response, next: NextFunction) => {};

export const getPlaylists = async (req: Request, res: Response, next: NextFunction) => {};

export const getArtists = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate('artists');
    return res.status(200).json(user?.artists);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getSongs = async (req: Request, res: Response, next: NextFunction) => {};

export const addToFavArtist = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json('Something went wrong');
    }

    // Check if artist exists in db
    const artist = await Artist.findOne({
      deezer_id: req.body.deezer_id,
    });

    if (!artist) {
      const newArtist = new Artist({ ...req.body });
      await newArtist.save();

      await user.updateOne({
        $push: { artists: newArtist.id },
      });

      return res.status(201).json({ artist: newArtist, message: 'Artist added from favorites' });
    } else {

      // artist already exists
      // user possibly already liked the artist

      if(user.artists.includes(artist.id)) {
        await user.updateOne({
          $pull: { artists: artist.id },
        });

        return res.status(201).json({ artist: artist, message: 'Artist removed from favorites' });
      } else {
        await user.updateOne({
          $push: { artists: artist.id },
        });

        return res.status(201).json({ artist: artist, message: 'Artist added from favorites' });
      }

    }
  } catch (error) {
    return res.status(400).json('Something went wrong!!!');
  }
};

export const addToFavAlbum = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json('Something went wrong');
    }

    // Check if artist exists in db
    const album = await Album.findOne({
      deezer_id: req.body.deezer_id,
    });

    if (!album) {
      const newAlbum = new Album({ ...req.body });
      await newAlbum.save();

      await user.updateOne({
        $push: { albums: newAlbum.id },
      });

      return res.status(201).json({ album: newAlbum, message: 'Album added to favorites' });
    } else {

      // album already exists
      // user possibly already liked the album

      if(user.albums.includes(album.id)) {
        await user.updateOne({
          $pull: { albums: album.id },
        });

        return res.status(200).json({ album, message: 'Album removed from favorites' });

      } else {
        await user.updateOne({
          $push: { albums: album.id },
        });

        return res.status(200).json({ album, message: 'Album added to favorites' });
      }


    }
  } catch (error) {
    return res.status(400).json('Something went wrong!!!');
  }
};
