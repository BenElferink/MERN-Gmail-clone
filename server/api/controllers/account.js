import User from './../models/User.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// more about response status codes   --->   https://restapitutorial.com/httpstatuscodes.html

export const registerController = async (request, response, next) => {
  try {
    // validate data types
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) return response.status(400).json(validationErrors);

    // check if email is taken
    const foundEmail = await User.findOne({ email: request.body.email });
    if (foundEmail) return response.status(400).json({ message: 'That email is already taken' });

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(request.body.password, salt);

    // create new user
    const newUser = new User({
      email: request.body.email,
      password: encryptedPassword,
      name: {
        first: request.body.firstName,
        middle: request.body.middleName,
        last: request.body.lastName,
      },
    });

    // save new user
    const savedUser = await newUser.save();

    console.log(savedUser);
    response.status(201).json({
      message: 'Account created succesffuly',
      user: {
        id: savedUser._id,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const loginController = async (request, response, next) => {
  try {
    // validate data types
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) return response.status(401).json(validationErrors);

    // find user with email
    const foundUser = await User.findOne({ email: request.body.email });
    if (!foundUser) return response.status(401).json({ message: 'Bad credentials' });

    // decrypt & compare password
    const isPasswordOk = await bcrypt.compare(request.body.password, foundUser.password);
    if (!isPasswordOk) return response.status(401).json({ message: 'Bad credentials' });

    // generate token
    const token = jwt.sign(
      { id: foundUser._id },
      new Buffer.from(process.env.JWT_KEY || 'secret', 'base64'),
      { expiresIn: '1h' },
    );

    // send token to client
    console.log(token);
    response.status(200).json({ message: 'Login success', token });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const getUserById = async (request, response, next) => {
  try {
    const foundUser = await User.findOne({ _id: request.user });
    if (!foundUser) return response.status(404).json({ message: 'User not found' });

    console.log(foundUser);
    response.status(200).json({ message: 'User found', user: foundUser });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
