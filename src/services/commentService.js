import { findPostById } from "../repositories/postRepository.js";
import {
  createComment,
  findCommentById,
} from "../repositories/commentRepository.js";
export const createCommentService = async (
  content,
  userId,
  onModel,
  commentableId,
) => {
  const parent = await fetchCommentParent(onModel, commentableId);
  if (!parent) {
    throw { message: `${onModel} not found`, status: 404 };
  }

  const newComment = await createComment(
    content,
    userId,
    onModel,
    commentableId,
  );

  await addChildCommentToParent(onModel, newComment, parent);
  return newComment;
};

export const findCommentByIdService = async (id) => {
    const comment = await findCommentById(id);
    if(!comment){
        throw { message: "Comment not found", status:404 };
    }
    return comment;
}

const addChildCommentToParent = async (onModel, comment, parent) => {
  try {
    if (onModel === "Post") {
      parent.comments.push(comment._id);
    } else if (onModel === "Comment") {
      parent.replies.push(comment._id);
    }
    await parent.save();
  } catch (error) {
    console.log(error);
  }
};

const fetchCommentParent = async (onModel, commentableId) => {
  if (onModel === "Post") {
    return findPostById(commentableId);
  }
  if (onModel === "Comment") {
    return findCommentById(commentableId);
  }
  return null;
};
