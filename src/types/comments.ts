export type Comment = {
  commentId?: string;
  articleId: string;
  author: string;
  content: string;
  postedAt?: Date;
  score?: number;
}