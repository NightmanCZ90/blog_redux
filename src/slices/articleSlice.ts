import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import RestApiClient from '../services/RestApiClient';
import { ArticleDetail } from '../types/articles';

interface ArticleState {
  status: 'idle' | 'loading' | 'successful' | 'failed',
  error: string | null;
}

const initialState: ArticleState = {
  status: 'idle',
  error: null,
}

export const createArticle = createAsyncThunk(
  'createArticle',
  async (body: { title: string, imageId: string, content: string, accessToken: string }) => {
    const { title, imageId, content, accessToken } = body;
    const response = await RestApiClient.createArticle({
      title,
      imageId,
      content,
    }, accessToken);
    return response;
  }
)

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setError: (state: ArticleState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state: ArticleState) => {
      state.error = null;
    },
  },
  extraReducers: {

    /** Create Article */

    [createArticle.fulfilled.type]: (state: ArticleState, action: PayloadAction<ArticleDetail>) => {
      state.status = 'successful';
      state.error = null;
    },
    [createArticle.pending.type]: (state: ArticleState) => {
      state.status = 'loading';
      state.error = null;
    },
    [createArticle.rejected.type]: (state: ArticleState, { error }) => {
      state.status = 'failed';
      state.error = error.message;
    },
  },
})

export const { setError, clearError } = articleSlice.actions;
export default articleSlice.reducer;
