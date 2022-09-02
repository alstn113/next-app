export interface AuthParams {
  username: string;
  password: string;
}

export interface Comment {
  id: string;
  text: string;
  likes: number;
  level: number;
  parentCommentId: string | null;
  subCommentsCount: number;
  subComments?: Comment[];
  postId: string;
  userId: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDeletd: boolean;
}

export type CommentList = Comment[];

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
  isLiked: boolean;
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

export interface GetPostResult extends Post {
  postStats: PostStats;
  user: User;
}

export interface GetPostsByQueriesResult {
  posts: (Post & {
    postStats: PostStats;
    user: User;
  })[];
  nextCursor?: string;
}

export type GetSearchPostsResult = (Post & {
  postStats: PostStats;
  user: User;
})[];

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
