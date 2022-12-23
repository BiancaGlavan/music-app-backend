import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const signJWTToken = (userId: string, role = 'user') => {
  return jwt.sign({ id: userId, role: role }, process.env.JWT_SECRET || 'jwt_secret', {
    expiresIn: '1d',
  });
};

const signJWTRefreshToken = (userId: string, role = 'user') => {
  return jwt.sign({ id: userId, role: role }, process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret', {
    expiresIn: '2d',
  });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validation schema for register
    const joiSchema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = joiSchema.validate(req.body);

    // return error message if user input is not correct
    if (error) {
      return res.status(400).send(error);
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    return res.status(201).json({ success: 'User has been created!', user: newUser });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return res.status(404).json('User not found!');

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return res.status(400).json('Wrong Credentials!');

    const token = signJWTToken(user.id, user.role);

    const refreshToken = signJWTRefreshToken(user.id, user.role);

    return res
      .cookie('jwt_refresh_token', refreshToken, {
        httpOnly: true,
      })
      .status(200)
      .json({ access_token: token });
  } catch (err) {
    next(err);
  }
};

export const profile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.userId;
    const user = await User.findById(id)
      .select({ password: 0 })
      .populate('artists', 'deezer_id')
      .populate('albums', 'deezer_id')
      .populate('playlists', 'deezer_id')
      .populate('songs', 'deezer_id');

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId);

    if(!user){
      return res.status(400).json('Something went wrong!');
    }

    // validation schema for updateProfile
    const joiSchema = Joi.object({
      name: Joi.string().min(2).required(),
      image: Joi.string().min(5)
    });

    const { error } = joiSchema.validate(req.body);

    const newUser = {
      name: req.body.name,
      image: req.body.image,
    }

    // return error message if user input is not correct
    if (error) {
      return res.status(400).send(error);
    }


    Object.assign(user, newUser);


    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);

  } catch (error) {
    return res.status(400).send(error); 
  }
};
