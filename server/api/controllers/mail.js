import Email from './../models/Email.js';
import User from './../models/User.js';
import { validationResult } from 'express-validator';

export const sendEmail = async (request, response, next) => {
  try {
    // validate data types
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) return response.status(400).json(validationErrors);

    // construct email
    const newEmail = new Email({
      from: request.body.from,
      to: request.body.to,
      subject: request.body.subject,
      message: request.body.message,
    });

    // save email
    const savedEmail = await newEmail.save();
    console.log(savedEmail);

    // FIRST TEST:
    // save email id to user
    // return response status 201

    // find user and update it's email ID's
    const foundUser = await User.findOne({ _id: request.user });
    foundUser.mailbox.sent.unshift(savedEmail._id);
    const savedUser = await foundUser.save();

    response.status(201).json({ message: 'Email sent successfully' });

    // THEN UPGRADE:
    // generate a random reply email (maybe an AI ???)
    // save email id to user && save random reply to user
    // return response status 201
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
