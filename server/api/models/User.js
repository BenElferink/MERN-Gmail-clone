import mongoose from 'mongoose';

const instance = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      first: String,
      middle: String,
      last: String,
    },
    imageFileName: String,
    mailbox: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Email' }],
  },
  {
    timestamps: true,
  },
);

// modelName = model name   --->   https://mongoosejs.com/docs/guide.html
// note: use a singular name, mongoose automatically creates a collection like so -> model: 'Person' === collection: 'people'
const modelName = 'User';

export default mongoose.model(modelName, instance);
