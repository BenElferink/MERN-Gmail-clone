import Account from './../models/Account.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { generateToken } from './../middleware/authToken.js';

export async function register(request, response, next) {
  try {
    // validate data types
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty())
      return response.status(400).json({
        message: 'Invalid data, see response.data.errors for more information',
        errors: validationErrors.errors,
      });

    // check if email is taken
    const foundAccount = await Account.findOne({ email: request.body.email });
    if (foundAccount)
      return response
        .status(400)
        .json({ message: 'That email is already taken', email: foundAccount.email });

    // at this point everything is OK, proceed with creating the account
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(request.body.password, salt);

    // create new user
    const newAccount = new Account({
      email: request.body.email,
      password: encryptedPassword,
      name: {
        first: request.body.firstName,
        middle: request.body.middleName,
        last: request.body.lastName,
      },
    });

    // save created user
    const savedAccount = await newAccount.save();
    console.log('Account created', savedAccount);

    response.status(201).json({
      message: 'Account created',
      email: savedAccount.email,
    });
  } catch (error) {
    console.log(error);
    response.status(500);
  }
}

export async function login(request, response, next) {
  try {
    // validate data types
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty())
      return response.status(400).json({
        message: 'Invalid data, see response.data.errors for more information',
        errors: validationErrors.errors,
      });

    // find user by email
    const foundAccount = await Account.findOne({ email: request.body.email });
    if (!foundAccount) return response.status(401).json({ message: 'Bad credentials' });

    // decrypt & compare password
    const isPasswordOk = await bcrypt.compare(request.body.password, foundAccount.password);
    if (!isPasswordOk) return response.status(401).json({ message: 'Bad credentials' });

    // at this point everything is OK, proceed with creating an authentication token
    // generate token
    const token = generateToken(foundAccount._id);
    console.log('Token generated', token);

    response.status(200).json({ message: 'Login success', token });
  } catch (error) {
    console.log(error);
    response.status(500);
  }
}

export async function getUser(request, response, next) {
  try {
    // find user with id (decoded from token)
    // deselect the: password && mailbox
    const foundAccount = await Account.findOne({ _id: request.user }).select('-password -mailbox');
    console.log('Account found', foundAccount);

    response.status(200).json({ message: 'Account found', user: foundAccount });
  } catch (error) {
    console.log(error);
    response.status(500);
  }
}

export async function updateProfilePicture(request, response, next) {
  try {
    // validate data types
    // const validationErrors = validationResult(request);
    // if (!validationErrors.isEmpty())
    //   return response.status(400).json({
    //     message: 'Invalid data, see response.data.errors for more information',
    //     errors: validationErrors.errors,
    //   });

    // find user with id (decoded from token)
    const foundAccount = await Account.findOne({ _id: request.user });

    // and update its image (base64) data
    foundAccount.profilePicture = request.body.image.base64;

    // save changes
    const savedAccount = await foundAccount.save();
    console.log('Image uploaded', savedAccount.profilePicture);

    response
      .status(201)
      .json({ message: 'Image uploaded', profilePicture: savedAccount.profilePicture });
  } catch (error) {
    console.log(error);
    response.status(500);
  }
}
