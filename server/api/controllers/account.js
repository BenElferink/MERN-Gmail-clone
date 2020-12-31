import mongoose from 'mongoose';
import User from './../models/User.js';
// more about response status codes   --->   https://restapitutorial.com/httpstatuscodes.html

export const registerController = async (request, response, next) => {
  // try {
  //   const savedExample = await newExample.save(); // what is .save() ???   --->   https://mongoosejs.com/docs/api.html#document_Document-save
  //   response.status(201).json(savedExample);
  // } catch (error) {
  //   response.status(500).json(error);
  // }
};

export const loginController = async (request, response, next) => {
  // try {
  //   const allExamples = await Example.find(); // what is .find() ???   --->   https://mongoosejs.com/docs/queries.html
  //   response.status(200).json(allExamples);
  // } catch (error) {
  //   response.status(500).json(error);
  // }
};
