import mongoose from 'mongoose';

const instance = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: String,
    subject: String,
    message: String,
    read: {
      type: Boolean,
      default: false,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// modelName = model name   --->   https://mongoosejs.com/docs/guide.html
// note: use a singular name, mongoose automatically creates a collection like so -> model: 'Person' === collection: 'people'
const modelName = 'Email';

export default mongoose.model(modelName, instance);
