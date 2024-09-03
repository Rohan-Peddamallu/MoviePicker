import * as z from "zod";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const nameSchema = z
  .string()
  .min(3, { message: "Name must be at least 3 characters" });
const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" })
  .regex(passwordRegex, {
    message:
      "Password must contain at least one letter, one number, and one special character",
  });

export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpBody = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginBody = z.infer<typeof loginSchema>;
