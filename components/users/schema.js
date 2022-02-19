const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim: null,
    },
    lname: {
      type: String,
      required: true,
      trim: null,
    },
    email: {
      type: String,
      required: true,
      trim: null,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    phone: {
      type: String,
      required: true,
      trim: null,
    },
    dob: {
      type: String,
      trim: null,
    },
    avatar: {
      type: String,
      trim: true,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fen%2Ffree-png-dlglg&psig=AOvVaw011rkIS1zznvv7QL0h__wv&ust=1632694487110000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMCY25KTm_MCFQAAAAAdAAAAABAJ",
    },
    userType: {
      type: String,
      trim: true,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password connot contain "password"');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  userObject.token = user.tokens[user.tokens.length - 1].token;

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  if (!email || !password) {
    throw new Error("You must provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Email Not Found !!!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Wrong Password !!!");
  }

  return user;
};

// Hash the plain text password before save
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
