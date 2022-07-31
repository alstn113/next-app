export type JwtPayload = {
  userId: string;
  username: string;
  sub: 'access_token' | 'refresh_token';
};
