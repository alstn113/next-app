export interface IPost {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPostCreateRequest {
  title: string;
  body: string;
}

export interface IPostUpdateRequest extends IPostCreateRequest {}
