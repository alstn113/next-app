// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import apiClient from '@/libs/api/apiClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie, getCookie } from 'cookies-next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const refresh_token = getCookie('refresh_token', { req, res }) ?? false;
    if (refresh_token === false) {
      return res.status(401).json({
        error: 'User unauthorized to make this request',
      });
    }

    try {
      const apiRes = await apiClient.post('/auth/refresh', { refresh_token });
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
          success: 'refresh success',
        });
      } else {
        return res.status(apiRes.status).json({
          error: 'refresh failed',
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
