export interface AuthParams {
  username: string;
  password: string;
}

export interface Comment {
  id: string;
  text: string;
  likes: number;
  level: number;
  parentCommentId?: string;
  subCommentsCount: number;
  subComments: Comment[];
  postId: string;
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type CommentList = Comment[];

export interface CreateCommentParams {
  text: string;
  postId: string;
}

export type PostList = Post[];

export interface Post {
  id: string;
  title: string;
  body: string;
  slug: string;
  userId: string;
  user: User;
  postStats: PostStats;
  createdAt: string;
  updatedAt: string;
}

export interface PostStats {
  id: string;
  likes: number;
  commentsCount: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostParams {
  title: string;
  body: string;
}

export type UpdatePostParams = CreatePostParams;

export interface FindPostQuery {
  cursor?: string;
}

export interface User {
  id: string;
  username: string;
}
