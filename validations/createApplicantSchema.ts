import { z } from "zod";

export const createApplicantSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  yoe: z.string().regex(/^\d+$/, {
    message: "Years of experience must be greater than 1.",
  }),
  phoneNumber: z.string().regex(/^(\+?\d{1,3}[-.\s]?)?(\d{10,15})$/, {
    message: "Invalid phone number format",
  }),
  applicantRole: z.string().nonempty("Please select an applicant role."),
  location: z.string().min(4),
  resumeLink: z.string().min(4),
});
