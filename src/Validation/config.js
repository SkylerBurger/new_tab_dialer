import Joi from "joi";

const dialSchema = Joi.object({
  name: Joi.string().required(),
  link: Joi.string().required(),
  icon: Joi.string().required(),
});

const groupSchema = Joi.object({
  name: Joi.string().required(),
  dials: Joi.array().items(dialSchema).required(),
});

const settingsSchema = Joi.object({
  background: Joi.string(),
  configUrl: Joi.string(),
  currentGroupIndex: Joi.number(),
  timeFormat: Joi.string(),
  timeEnabled: Joi.boolean(),
});

const configSchema = Joi.object({
  groups: Joi.array().items(groupSchema).required(),
  settings: settingsSchema.required(),
});

export default configSchema;
