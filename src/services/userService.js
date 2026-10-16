import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../utils/jwt.js";
import { email } from "zod";

export const signupUserService = async (user) => {
    const existingUser = await findUserByEmail(user.email);
    if (existingUser) {
        const error = new Error("A user with this email already exists");
        error.code = 11000;
        throw error;
    }

    const createdUser = await createUser(user);
    const token = generateJwtToken({
        _id: createdUser._id,
        email: createdUser.email,
        username: createdUser.username
    });

    return { user: createdUser, token };
};


export const signinUserService = async (userDetails) => {
  const user = await findUserByEmail(userDetails.email);

  if (!user) {
    throw { status: 404, message: "User not found" };
  }

  const isPasswordValid = await bcrypt.compare(
    userDetails.password,
    user.password
  );

  if (!isPasswordValid) {
    throw { status: 401, message: "Invalid password" };
  }

  return generateJwtToken({
    _id: user._id,
    email: user.email,
    username: user.username
  });
};


export const checkIfUserExists = async (email) => {
   try {
     const user = await findUserByEmail(email)
     return user;
   } catch (error) {
     throw error;
   }
}


 
