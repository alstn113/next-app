// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import apiClient from '@/libs/api/apiClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const apiRes = await apiClient.post('/auth/login', req.body);
      const { data } = apiRes;

      if (apiRes.status === 201) {
        setCookie('access_token', data.access_token, {
          req,
          res,
          httpOnly: true,
          maxAge: 60 * 30, // 30m
          path: '/',
          secure: process.env.NODE_ENV !== 'development',
        });
        setCookie('refresh_token', data.refresh_token, {
          req,
          res,
          httpOnly: true,
          maxAge: 60 * 60 * 24, // 24h
          path: '/',
          secure: process.env.NODE_ENV !== 'development',
        });

        res.status(apiRes.status).json({
          success: 'Logged in successfully',
        });
      } else {
        return res.status(apiRes.status).json({
          error: 'Authentication failed',
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
