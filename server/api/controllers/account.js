import mongoose from 'mongoose';
import User from './../models/User.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
// more about response status codes   --->   https://restapitutorial.com/httpstatuscodes.html

export const registerController = async (request, response, next) => {
  try {
    // validate data types
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) return response.status(400).json(validationErrors);

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
  // try {
  //   const allExamples = await Example.find(); // what is .find() ???   --->   https://mongoosejs.com/docs/queries.html
  //   response.status(200).json(allExamples);
  // } catch (error) {
  //   response.status(500).json(error);
  // }
};
