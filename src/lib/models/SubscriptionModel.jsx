import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  unsubscribeToken: {
    type: String,
    default: () => Math.random().toString(36).substring(2, 15),
  },
});

const SubscriptionModel =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);

export default SubscriptionModel;
