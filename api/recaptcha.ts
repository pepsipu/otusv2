import axios from 'axios';
import { recaptchaSecret as secret } from '../config/config.json';

export default async (response: string): Promise<boolean> => {
  const { success }: { success: boolean } = (await axios.post('https://www.google.com/recaptcha/api/siteverify', {}, {
    params: {
      secret,
      response,
    },
  })).data;
  return success;
};
