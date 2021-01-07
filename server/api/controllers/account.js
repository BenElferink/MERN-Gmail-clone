import User from './../models/User.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// more about response status codes   --->   https://restapitutorial.com/httpstatuscodes.html

export const registerController = async (request, response, next) => {
  try {
    // validate data types
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty())
      return response.status(400).json({
        message: 'Invalid data, see response.data.errors for more information',
        errors: validationErrors.errors,
      });

    // check if email is taken
    const foundUser = await User.findOne({ email: request.body.email });
    if (foundUser)
      return response
        .status(400)
        .json({ message: 'That email is already taken', email: foundUser.email });

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(request.body.password, salt);

    // create and save new user
    const newUser = new User({
      email: request.body.email,
      password: encryptedPassword,
      name: {
        first: request.body.firstName,
        middle: request.body.middleName,
        last: request.body.lastName,
      },
    });
    const savedUser = await newUser.save();
    console.log('Account created', savedUser);

    // return email
    response.status(201).json({
      message: 'Account created',
      email: savedUser.email,
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
    if (!validationErrors.isEmpty())
      return response.status(400).json({
        message: 'Invalid data, see response.data.errors for more information',
        errors: validationErrors.errors,
      });

    // find user with email
    const foundUser = await User.findOne({ email: request.body.email });
    if (!foundUser) return response.status(401).json({ message: 'Bad credentials' });
    // decrypt & compare password
    const isPasswordOk = await bcrypt.compare(request.body.password, foundUser.password);
    if (!isPasswordOk) return response.status(401).json({ message: 'Bad credentials' });

    // generate token
    const token = jwt.sign(
      { id: foundUser._id },
      new Buffer.from(process.env.JWT_SECRET || 'secret', 'base64'),
      { expiresIn: '1h' },
    );
    console.log('Token generated', token);

    // return token
    response.status(200).json({ message: 'Login success', token });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const getUserData = async (request, response, next) => {
  try {
    // find user with id decoded from token
    const foundUser = await User.findOne({ _id: request.user }).select('-password -mailbox');
    if (!foundUser) return response.status(404).json({ message: 'User not found' });
    console.log('User found', foundUser);

    // return user data
    response.status(200).json({ message: 'User found', user: foundUser });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const updateProfile = async (request, response, next) => {
  try {
    // find user
    const foundUser = await User.findOne({ _id: request.user });
    if (!foundUser) return response.status(404).json({ message: 'User not found' });
    // and update its image filename
    foundUser.imageFileName = request.file.filename;
    const savedUser = await foundUser.save();
    console.log('Image uploaded', savedUser);

    // send user back to client
    response.status(200).json({ message: 'Image uploaded', user: savedUser });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
