import { countAllPosts, createPost, deletePostById, findAllPosts, updatePostById, } from "../repositories/postRepository.js";

export const createPostService = async (createPostObject) => {
    const caption = createPostObject.caption?.trim();
    const { image, user } = createPostObject;

    if (!caption || !image) {
        throw new Error("Caption and image are required");
    }

    return createPost({ caption, image, user });
};

export const getAllPostsService = async (offset, limit) => {
     const posts = await findAllPosts(offset, limit);
      
     // Calculate total number of posts and total number of pages
     const totalDocuments = await countAllPosts();

     const totalPages = Math.ceil(totalDocuments / limit);
     return {
        posts, 
        totalPages,
        totalDocuments
     }
}

export const deletePostService = async (id) => {
    // Call the repository function 
       const response = await deletePostById(id);
       return response;
}

export const updatePostService = async (id, updateObject) => {
    // Call the repository function
    const response = await updatePostById(id, updateObject);
        return response;
    
}
