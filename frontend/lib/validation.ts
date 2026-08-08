import { z } from "zod";

export const LeadFormSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  businessName: z.string().optional(),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  whatsapp: z.string().optional(),
  service: z.string().min(1, "Please select a service."),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(10, "Please describe your project requirement in at least 10 characters."),
  privacyAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Privacy Policy.",
  }),
});

export type LeadFormValues = z.infer<typeof LeadFormSchema>;

export const ContactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Valid email required."),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type ContactMessageValues = z.infer<typeof ContactMessageSchema>;
