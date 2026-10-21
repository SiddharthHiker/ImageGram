import mongoose, { Mongoose } from "mongoose";
import { required } from "zod/mini";


const commentSchema = new mongoose.Schema({
    content: {
         type: String,
         required: true,
         minLength: 1
    },
    userId: {
         type: mongoose.Schema.Types.ObjectId,
         required:true,
         ref:"User"
    },
    onModel: {
         type: String,
         required: true,
         enum: ["Post", "Comment"]
    },
    commentableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel"
    },
    replies:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

const Comment = mongoose.model('Comment',commentSchema);

export default Comment;
