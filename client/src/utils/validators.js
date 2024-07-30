import { z } from "zod";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

const fileValidation = (file) => {
  if (!file || !file.type || !file.size) {
    return true; // No error if file is undefined (optional case)
  }
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return false;
  }
  if (file.size > MAX_FILE_SIZE) {
    return false;
  }
  return true;
};

const userSchema = z.object({
  avatar: z
    .any()
    .optional()
    .refine(
      fileValidation,
      "Avatar must be JPEG/PNG/webp/AVIF and less than 2MB"
    ),
  name: z
    .string()
    .min(3, "Name must be longer than 3 characters")
    .max(50, "Name can't be longer than 50 characters"),
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username can't be longer than 50 characters")
    .regex(/^[a-zA-Z_]+$/, "Username can only contain letters and underscores")
    .refine((value) => !/\s/.test(value), {
      message: "Username cannot contain spaces",
    }),
  password: z
    .string()
    .min(6, "Password must be between 6 and 30 characters")
    .max(30, "Password must be between 6 and 30 characters")
    .regex(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])/,
      "Password must contain at least one number, uppercase/lowercase letter, and one special character"
    ),
  bio: z.string().max(100, "Bio can't be longer than 100 characters"),
});

export const validateFormInput = (avatar, name, userName, password, bio) => {
  try {
    userSchema.parse({ avatar, name, userName, password, bio });
    console.log("Signup data is valid");
    return;
  } catch (e) {
    if (e instanceof z.ZodError) {
      const fieldErrors = e.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      return fieldErrors;
    }
  }
};
