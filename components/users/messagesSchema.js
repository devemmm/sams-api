const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_QaKphzoBGTV8UYbHu_xbyLA2k2ySTIUS7Q&usqp=CAU",
    },
    subject: {
      type: String,
      trim: true,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model("Messages", messagesSchema);

module.exports = Messages;
