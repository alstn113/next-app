// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import apiClient from '@/libs/api/apiClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const access_token = getCookie('access_token', { req, res }) ?? false;
    if (access_token === false) {
      return res.status(401).json({
        error: 'User unauthorized to make this request',
      });
    }

    try {
      const apiRes = await apiClient.get('/auth/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const { data } = apiRes;

      if (apiRes.status === 200) {
        return res.status(apiRes.status).json({
          user: data.user,
        });
      } else {
        return res.status(apiRes.status).json({
          error: 'failed to get user data',
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Something went wrong when retrieving user',
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      error: `Method ${req.method} is not allowed`,
    });
  }
}
