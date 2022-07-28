// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import apiClient from '@/libs/api/apiClient';
import type { NextApiRequest, NextApiResponse } from 'next';
import runMiddleware from '@/libs/utils/runMiddleware';
import Cors from 'cors';
import { setCookie } from '@/libs/utils/cookies';

const cors = Cors({
  methods: ['POST'],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  try {
    const apiRes = await apiClient.post('/auth/login', req.body);
    const { access_token, refresh_token } = apiRes.data;

    if (apiRes.status === 200) {
      setCookie(res, 'access_token', access_token, {
        httpOnly: true,
        maxAge: 60 * 30, // 30m
        // secure: process.env.NODE_ENV !== 'development',
        // sameSite: 'strict',
        // path: '/api/',
      });
      setCookie(res, 'refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 24h
        // secure: process.env.NODE_ENV !== 'development',
        // sameSite: 'strict',
        // path: '/api/',
      });

      // Return the `set-cookie` header so we can display it in the browser and show that it works!
      res.end(res.getHeader('Set-Cookie'));

      return res.status(200).json({
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
}
