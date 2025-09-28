import React from "react";
import mongoose from "mongoose";
export const ConnectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kartikjagdale0511:VuREOx8EqroiPhLH@cluster0.plvwxot.mongodb.net/blog-app-next"
  );
};
