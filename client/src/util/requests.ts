import axios from 'axios';
import { toast } from 'react-toastify';
import { apiEndpoint } from '../config.json';

const postWithErrors = async (path: string, postData: Object): Promise<boolean | any> => {
  const { error, ...data }: { error: string | string[] } = (await axios.post(`${apiEndpoint}/${path}`, postData)).data;
  if (error) {
    if (Array.isArray(error)) {
      error.forEach((e) => toast.error((e)));
    } else {
      toast.error(error);
    }
    return false;
  }
  return data || true;
};

// eslint-disable-next-line import/prefer-default-export
export { postWithErrors };
