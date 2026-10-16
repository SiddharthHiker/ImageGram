import { success } from "zod";
import { VerifyJWT } from "../utils/jwt.js";
import { checkIfUserExists } from "../services/userService.js";



export const isAuthenticated = async (req, res, next) =>{
     // check if jwt is passed in the header
     const token = req.headers["x-access-token"];

     if(!token){
        return res.status(400).json({
            success: false,
            message: "Token is required"
        })
     }
     // Verfiy the token 
     try {
        const response = VerifyJWT(token);

        const doesUserExists = await checkIfUserExists(response.email);
            if(!doesUserExists){
                return res.status(400).json({
                    success:false,
                    message:"User not Found"
                })
            }
        req.user = response;
        next()
     } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Invalid token"
        });
     }
}