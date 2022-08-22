export interface AuthParams {
  username: string;
  password: string;
}

export interface Comment {
  id: string;
  text: string;
  postId: string;
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentParams {
  text: string;
  postId: string;
}

export type PostList = Omit<Post, 'comments'>[];

export interface Post {
  id: string;
  title: string;
  body: string;
  slug: string;
  userId: string;
  user: User;
  postStats: PostStats;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface PostStats {
  id: string;
  likes: number;
  commentCounts: number;
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
