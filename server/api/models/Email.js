import mongoose from 'mongoose';

const instance = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    starred: {
      type: Boolean,
      required: true,
      default: false,
    },
    trash: {
      type: Boolean,
      required: true,
      default: false,
    },
    draft: {
      type: Boolean,
      required: true,
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
