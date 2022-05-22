import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleWithDates } from '../../types/articles';

interface ArticleListState {
  articles: ArticleWithDates[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ArticleListState = {
  articles: [],
  isLoading: false,
  error: null,
}

const articleListSlice = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    
  }
});

export default articleListSlice.reducer;