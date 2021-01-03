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
    foundUser.mailbox.unshift(savedEmailSent._id);
    foundUser.mailbox.unshift(savedEmailReceived._id);
    await foundUser.save();

    // return response status 201
    console.log(savedEmailSent);
    console.log(savedEmailReceived);
    response.status(201).json({ message: 'Email sent' });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const saveDraft = async (request, response, next) => {
  try {
    // construct email (draft)
    let newDraft = new Email({
      from: request.body.from,
      to: request.body.to,
      subject: request.body.subject,
      message: request.body.message,
      draft: true,
    });

    // save email
    const savedEmailDraft = await newDraft.save();

    // find user and update it's email ID's
    const foundUser = await User.findOne({ _id: request.user });
    foundUser.mailbox.unshift(savedEmailDraft._id);
    await foundUser.save();

    // return response status 201
    console.log(savedEmailDraft);
    response.status(201).json({ message: 'Draft saved' });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const handleStar = async (request, response, next) => {
  try {
    // find email by id, and update it 'starred' status
    const foundEmail = await Email.findOne({ _id: request.params.id });
    foundEmail.starred = !foundEmail.starred;

    // save updated data
    const savedEmail = await foundEmail.save();

    console.log(savedEmail);
    response.status(200).json({ message: 'Starred status updated' });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
