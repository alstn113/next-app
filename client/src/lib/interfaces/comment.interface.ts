import { IUser } from './user.interface';

export interface IComment {
  id: string;
  text: string;
  postId: string;
  userId: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentCreateRequest {
  text: string;
  postId: string;
}
