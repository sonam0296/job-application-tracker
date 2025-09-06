import Joi from "joi";

export const jobSchema = Joi.object({
  title: Joi.string().required().messages({
    "string:empty": "Job title is required",
  }),
  company: Joi.string().required().messages({
    "string:empty": "Company is required",
  }),
  status: Joi.string()
    .valid("applied", "interview", "offer", "rejected")
    .required(),
  notes: Joi.string().optional().allow(""),
});
