import { Comment } from './comments';
import { Pagination } from './misc'

export interface Article {
  articleId: string,
  title: string,
  perex: string,
  imageId: string,
}

export interface ArticleWithDates extends Article {
  createdAt: Date,
  lastUpdatedAt: Date,
}

export interface ArticleDetail extends ArticleWithDates {
  content: string;
  comments: Comment[];
}

export type ArticleList = {
  pagination: Pagination,
  items: ArticleWithDates[],
}