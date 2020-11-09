import axios from 'axios';
import { toast } from 'react-toastify';
import { apiEndpoint } from '../config.json';

const logErrors = (error: string | string[]): boolean => {
  if (error) {
    if (Array.isArray(error)) {
      error.forEach((e) => toast.error((e)));
    } else {
      toast.error(error);
    }
  }
  return !error;
};

const postWithErrors = async (path: string, postData: Object): Promise<boolean | any> => {
  const { error, ...response } = (await axios.post(`${apiEndpoint}${path}`, postData)).data;
  return logErrors(error) && response;
};

const getWithErrors = async (path: string): Promise<boolean | any> => {
  const { error, ...response } = (await axios.get(`${apiEndpoint}${path}`)).data;
  return logErrors(error) && response;
};

export { postWithErrors, getWithErrors };
