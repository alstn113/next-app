// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import apiClient from '@/libs/api/apiClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const apiRes = await apiClient.post('/auth/logout');

      if (apiRes.status === 201) {
        deleteCookie('access_token', {
          req,
          res,
        });
        deleteCookie('refresh_token', {
          req,
          res,
        });

        res.status(apiRes.status).json({
          success: 'logout success',
        });
      } else {
        return res.status(apiRes.status).json({
          error: 'logout failed',
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Something went wrong when authenticating',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      error: `Method ${req.method} is not allowed`,
    });
  }
}
