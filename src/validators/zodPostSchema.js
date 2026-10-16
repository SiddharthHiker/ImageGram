import { z } from 'zod';
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const zodPostSchema = z.object({
    caption: z.string({ error: "Caption is required" }).min(1, "Caption is required"),
    image: z.any().refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.mimetype),
      ".jpg, .jpeg, .png and .webp files are accepted.")
});

