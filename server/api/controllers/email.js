import Email from '../models/Email.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';
import txtgen from 'txtgen';

export const getEmails = (request, response, next) => {
  // find the user, select and populate it's mailbox
  User.findOne({ _id: request.user }, 'mailbox')
    .populate('mailbox.inbox mailbox.outbox mailbox.drafts')
    .exec((error, user) => {
      if (error) {
        // internal error
        console.log(error);
        return response.status(500).json(error);
      } else if (!user) {
        // not found error
        console.log('Could not find user mailbox, ivalid user ID', request.user);
        return response
          .status(404)
          .json({ message: 'Could not find user mailbox, ivalid user ID', id: request.user });
      } else {
        console.log('Emails found', user.mailbox);
        // filter mailbox to UI categories
        let inboxArr = user.mailbox.inbox?.filter((email) => !email.trash);
        let sentArr = user.mailbox.outbox?.filter((email) => !email.trash);
        let draftsArr = user.mailbox.drafts?.filter((email) => !email.trash);
        let starredArr = user.mailbox.inbox
          ?.filter((email) => email.starred && !email.trash)
          .concat(user.mailbox.outbox?.filter((email) => email.starred && !email.trash));
        let trashArr = user.mailbox.inbox
          ?.filter((email) => email.trash)
          .concat(
            user.mailbox.outbox?.filter((email) => email.trash),
            user.mailbox.drafts?.filter((email) => email.trash),
          );

        // sort all categories by date
        inboxArr?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        sentArr?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        draftsArr?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        starredArr?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        trashArr?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // apply categories to clients mailbox
        let sortedMailbox = {
          inbox: inboxArr ? inboxArr : [],
          sent: sentArr ? sentArr : [],
          drafts: draftsArr ? draftsArr : [],
          starred: starredArr ? starredArr : [],
          trash: trashArr ? trashArr : [],
        };

        console.log('Emails sorted', sortedMailbox);
        response.status(200).json({ message: 'Emails found', mailbox: sortedMailbox });
      }
    });
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
    if (!foundUser) return response.status(404).json({ message: 'User not found' });
    foundUser.mailbox.outbox.unshift(savedEmailOut._id);
    foundUser.mailbox.inbox.unshift(savedEmailIn._id);

    // save changes made to users mailbox
    let savedUser = await foundUser.save();
    savedUser = await User.populate(savedUser, 'mailbox.inbox mailbox.outbox mailbox.drafts');

    response.status(201).json({ message: 'Email sent', mailbox: savedUser.mailbox });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const deleteEmail = async (request, response, next) => {
  try {
    // find email by id, and update it delete it
    await Email.deleteOne({ _id: request.params.id });
    console.log('Email deleted', request.params.id);

    // return email (so client can remove the email from a state)
    response.status(200).json({ message: 'Email deleted', id: request.params.id });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const toggleEmailProperty = async (request, response, next) => {
  try {
    // find email by id,
    const foundEmail = await Email.findOne({ _id: request.params.id });
    if (!foundEmail) return response.status(404).json({ message: 'Email not found' });

    // and update its chosen property
    switch (request.params.toggle) {
      case 'read':
        foundEmail.read = !foundEmail.read;
        break;
      case 'starred':
        foundEmail.starred = !foundEmail.starred;
        break;
      case 'trash':
        foundEmail.trash = !foundEmail.trash;
        break;
      default:
        break;
    }

    const savedEmail = await foundEmail.save();
    console.log(`${request.params.toggle} status updated`, savedEmail);

    // return email
    response
      .status(200)
      .json({ message: `${request.params.toggle} status updated`, email: savedEmail });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const saveDraft = async (request, response, next) => {
  try {
    // construct new draft
    let newDraft = new Email({
      from: request.body.from,
      to: request.body.to,
      subject: request.body.subject,
      message: request.body.message,
    });

    // save constructed draft
    const savedDraft = await newDraft.save();
    console.log('Draft saved', savedDraft);

    // find user and update it's email ID's
    const foundUser = await User.findOne({ _id: request.user });
    if (!foundUser) return response.status(404).json({ message: 'User not found' });
    foundUser.mailbox.drafts.unshift(savedDraft._id);

    // save changes made to users mailbox
    let savedUser = await foundUser.save();
    savedUser = await User.populate(savedUser, 'mailbox.inbox mailbox.outbox mailbox.drafts');

    response.status(201).json({ message: 'Draft saved', mailbox: savedUser.mailbox });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export const updateDraft = async (request, response, next) => {
  try {
    // find draft using id
    let foundEmail = await Email.findOne({ _id: request.params.id });
    if (!foundEmail) return response.status(404).json({ message: 'Email not found' });

    // update it contents
    foundEmail.to = request.body.to;
    foundEmail.subject = request.body.subject;
    foundEmail.message = request.body.message;

    // and save the draft
    const savedEmail = await foundEmail.save();
    console.log('Draft updated', savedEmail);

    response.status(200).json({ message: 'Draft updated', email: savedEmail });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};
