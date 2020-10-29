import joi from 'joi';

const loginSchema = joi.object({
  password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  username: joi.string()
    .min(3)
    .max(20)
    .required(),
});

export interface LoginData {
  password: string,
  username: string,
}

export { loginSchema };
