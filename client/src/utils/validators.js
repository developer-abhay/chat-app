import { z } from "zod";

// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

// const nameSchema = z.string();
// const userNameSchema = z.string();
// const passwordSchema = z.string();
// const photoSchema = z
//   .any()
//   .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
//   .refine(
//     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
//     "Only .jpg, .jpeg, .png and .webp formats are supported."
//   );

export const validateFormInput = (
  e,
  photoType,
  photoURL,
  name,
  userName,
  password
) => {
  console.log("Form validated");
  //   if (e.target.value === "Login") {
  //   } else {
  //     const output = userNameSchema.safeParse(userName);
  //     const output2 = passwordSchema.safeParse(password);
  //   }
};
