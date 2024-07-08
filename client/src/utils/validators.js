import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const nameSchema = z.string();
const userNameSchema = z.string();
const passwordSchema = z.string();
const photoSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

export const validateFormInput = (profilePhoto, name, userName, password) => {
  try {
    if (nameSchema.safeParse(name).success) {
    }
    if (userNameSchema.safeParse(userName)) {
    }
    if (passwordSchema.safeParse(password)) {
    }

    console.log(profilePhoto.size);
    console.log(photoSchema.safeParse(profilePhoto).error);
    console.log("Form validated");
  } catch (err) {
    console.log(err);
  }
};
