import Comment from "../schema/comment.js"

export const createComment = async (content,userId,onModel,commentableId) => {
     return Comment.create({
        content,
        userId,
        onModel,
        commentableId,
        replies: []
     })
}

export const findCommentById = async (id) => {
    return Comment.findById(id).populate('replies');
}
