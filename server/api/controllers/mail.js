import Email from './../models/Email.js';
import User from './../models/User.js';
import { validationResult } from 'express-validator';
import txtgen from 'txtgen';

export const sendEmail = async (request, response, next) => {
  try {
    // validate data types
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) return response.status(400).json(validationErrors);

    // construct email
    const newEmailSent = new Email({
      from: request.body.from,
      to: request.body.to,
      subject: request.body.subject,
      message: request.body.message,
    });

    // generate a random reply email
    const newEmailReceived = new Email({
      from: request.body.to,
      to: request.body.from,
      subject: 'Re: ' + request.body.subject,
      message: txtgen.paragraph(2),
    });

    // save both emails
    const savedEmailSent = await newEmailSent.save();
    const savedEmailReceived = await newEmailReceived.save();

    // find user and update it's email ID's (sent && received)
    const foundUser = await User.findOne({ _id: request.user });
    foundUser.mailbox.sent.unshift(savedEmailSent._id);
    foundUser.mailbox.inbox.unshift(savedEmailReceived._id);
    await foundUser.save();

    // return response status 201
    response.status(201).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
