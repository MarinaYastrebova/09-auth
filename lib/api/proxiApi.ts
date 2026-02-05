import axios from 'axios';
import { cookies } from 'next/headers';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await axios.get(`${baseURL}/auth/session`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    withCredentials: true,
  });

  return response;
};
