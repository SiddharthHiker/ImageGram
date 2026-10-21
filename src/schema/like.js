import mongoose from "mongoose";
import { required } from "zod/mini";

const likeSchma = new mongoose.Schema({
   onModel:{
       type: String,
       required: true,
       enum:["Post", "Comment"]
   },
   likeableId:{
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       refPath:"onModel",
   },
   user:{
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref:"User"
   }
},{timestamps: true});

const Like = mongoose.model('Like', likeSchma);

export default Like;