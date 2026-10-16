import User from '../schema/user.js';

export const findUserByEmail = async (email) => {
    try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
     console.log(error)
  }
}


export const findAllUsers = async() => {
    return User.find();
}

export const createUser = async (user) => {
    return User.create(user);
}
 