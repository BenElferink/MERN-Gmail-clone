import Email from '../models/Email.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';
import txtgen from 'txtgen';

export const getEmails = async (request, response, next) => {
  try {
    // find the user and select it's mailbox
    const { mailbox } = await User.findOne({ _id: request.user })
      .select('mailbox')
      .populate('mailbox.inbox mailbox.outbox mailbox.drafts');
    console.log('Emails found', mailbox);

    // return mailbox
    response.status(200).json({ message: 'Emails found', mailbox: mailbox });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const sendEmail = async (request, response, next) => {
  try {
    // validate data types
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty())
      return response.status(400).json({
        message: 'Invalid data, see response.data.errors for more information',
        errors: validationErrors.errors,
      });

    // construct and save outgoing email
    const newEmailOut = new Email({
      from: request.body.from,
      to: request.body.to,
      subject: request.body.subject,
      message: request.body.message,
    });
    const savedEmailOut = await newEmailOut.save();
    console.log('Email sent', savedEmailOut);

    // generate and save a random reply email
    const newEmailIn = new Email({
      from: request.body.to,
      to: request.body.from,
      subject: 'Re: ' + request.body.subject,
      message: txtgen.paragraph(),
    });
    const savedEmailIn = await newEmailIn.save();
    console.log('Reply received', savedEmailIn);

    // find user and update it's email ID's (outbox && inbox)
    const foundUser = await User.findOne({ _id: request.user });
    foundUser.mailbox.outbox.unshift(savedEmailOut._id);
    foundUser.mailbox.inbox.unshift(savedEmailIn._id);
    let savedUser = await foundUser.save();
    savedUser = await User.populate(savedUser, 'mailbox.inbox mailbox.outbox mailbox.drafts');

    // return mailbox
    response.status(201).json({ message: 'Email sent', mailbox: savedUser.mailbox });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const saveDraft = async (request, response, next) => {
  try {
    // construct and save draft
    let newDraft = new Email({
      from: request.body.from,
      to: request.body.to,
      subject: request.body.subject,
      message: request.body.message,
    });
    const savedDraft = await newDraft.save();
    console.log('Draft saved', savedDraft);

    // find user and update it's email ID's
    const foundUser = await User.findOne({ _id: request.user });
    foundUser.mailbox.drafts.unshift(savedDraft._id);
    let savedUser = await foundUser.save();
    savedUser = await User.populate(savedUser, 'mailbox.inbox mailbox.outbox mailbox.drafts');

    // return mailbox
    response.status(201).json({ message: 'Draft saved', mailbox: savedUser.mailbox });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const toggleStarred = async (request, response, next) => {
  try {
    // find email by id, and update it 'starred' status
    const foundEmail = await Email.findOne({ _id: request.params.id });
    foundEmail.starred = !foundEmail.starred;
    const savedEmail = await foundEmail.save();
    console.log('Starred status udpated', savedEmail);

    // return email
    response.status(200).json({ message: 'Starred status updated', email: savedEmail });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const toggleRead = async (request, response, next) => {
  try {
    // find email by id, and update it 'read' status
    const foundEmail = await Email.findOne({ _id: request.params.id });
    foundEmail.read = !foundEmail.read;
    const savedEmail = await foundEmail.save();
    console.log('Read status updated', savedEmail);

    // return email
    response.status(200).json({ message: 'Read status updated', email: savedEmail });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const toggleTrash = async (request, response, next) => {
  try {
    // find email by id, and update it 'trash' status
    const foundEmail = await Email.findOne({ _id: request.params.id });
    foundEmail.trash = !foundEmail.trash;
    const savedEmail = await foundEmail.save();
    console.log('Trash status updated', savedEmail);

    // return email
    response.status(200).json({ message: 'Trash status updated', email: savedEmail });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const deleteEmail = async (request, response, next) => {
  try {
    // find email by id, and update it delete it
    const removedEmail = await Email.deleteOne({ _id: request.params.id });
    console.log('Email deleted', request.params.id);

    // return email (so client can remove the email from a state)
    response.status(200).json({ message: 'Email deleted', id: request.params.id });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
