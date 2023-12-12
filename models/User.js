import { model, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        // Use a regular expression to validate the email format
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    // validate: {
    //     validator: function (value) {
    //         // Use a regular expression to validate the phone number format
    //         return /^[0-9]{10}$/.test(value);
    //     },
    //     message: (props) => `${props.value} is not a valid phone number!`,
    // },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
