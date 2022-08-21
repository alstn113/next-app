export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegisterRequest {
  username: string;
  password: string;
}

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

export type IPostList = Omit<IPost, 'comments'>[];

export interface IPost {
  id: string;
  title: string;
  body: string;
  slug: string;
  likes: number;
  userId: string;
  user: IUser;
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
}

export interface IPostCreateRequest {
  title: string;
  body: string;
}

export interface IPostUpdateRequest extends IPostCreateRequest {}

export interface IFindPostQuery {
  cursor?: string;
}

export interface IUser {
  id: string;
  username: string;
}
