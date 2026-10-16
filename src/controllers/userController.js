import { signinUserService, signupUserService } from "../services/userService.js";

// After /users the remaining part of url is handle here 
export async function getProfile(req, res){
    // return unimplemented
    return res.status(501).json({
        success: false,
        message: "Not Implemented"
    });
}

export async function signup(req, res){
   try {
    const { user, token } = await signupUserService(req.body);

    return res.status(201).json({
        success:true,
        message:"User created successfully",
        data: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          },
          token
        }
    })
   } catch (error) {
      console.error(error);
      
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "Username or email already exists"
        });
      }
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      });
   } 
}

// export async function signin(req, res){
//   try {
//     const token = await signinUserService(req.body);
//     return res.status(200).json({
//       success: true,
//       message: "User signed in Successfully",
//       data: { token }
//     })
//   } catch (error) {
//     console.log(error)
//     if(error.status) {
//       return res.status(error.status).json({
//           success:false,
//           message: error.message
//       })
//     }
//     return res.status(500).json({
//         success:false,
//         message: "Internal Server Error"
//     })
//   }
// }
export async function signin(req, res) {
  try {
    const token = await signinUserService(req.body);

    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: { token }
    });
  } catch (error) {
    console.error(error);

    if (error.status) {
      return res.status(error.status).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}
