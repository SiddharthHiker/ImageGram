import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 5
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      validate: {
        validator(emailValue) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
        },
        message: "Invalid email format"
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 5
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function modifyPassword() {
  if (!this.isModified("password")) return;

  const salt = bcrypt.genSaltSync(9);
  this.password = bcrypt.hashSync(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;