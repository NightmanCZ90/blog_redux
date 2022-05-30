import { useRef, useState } from 'react';
import { Button, CircularProgress, IconButton, InputLabel, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import './CreateArticle.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import RestApiClient from '../../services/RestApiClient';
import { createArticle, setError } from '../../slices/articleSlice';

export type NewArticleFormData = {
  title: string;
  perex: string;
  content: string;
}

const initialFormData = {
  title: '',
  perex: '',
  content: '',
}

const CreateArticle: React.FC = () => {
  const { accessToken } = useAppSelector(state => state.currentUser);
  const { error, status } = useAppSelector(state => state.article);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<NewArticleFormData>(initialFormData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleImportImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files?.[0] || null);
  }

  const handleClearImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    setImage(null);
    if (fileInputRef && fileInputRef.current) fileInputRef.current.value = '';
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(setError(null));

    if (!image || !accessToken) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(image);

    reader.onloadend = async () => {
      try {
        const res = await RestApiClient.uploadImage({ image: reader.result }, accessToken?.access_token);
        res && res.length > 0 && dispatch(createArticle({ ...formData, imageId: res[0].imageId, accessToken: accessToken?.access_token }));
      } catch (err: any) {
        dispatch(setError(err || 'Error uploading image'));
      }
    }

    reader.onerror = (err: any) => {
      dispatch(setError(err.message));
    }
  };

  const isDisabled = !image || !formData.title || !formData.content;

  return (
    <form className="create-article-page" onSubmit={handleSubmit}>

      <div className="create-article-page__header">
        <h1>Create new article</h1>
        <Button
          variant="contained"
          type="submit"
          disabled={status === 'loading' || isDisabled}
        >
          {status === 'loading' ? (<CircularProgress size={24} />) : "Publish Article"}
        </Button>
        <div className="error-message">
          {error && <span className="error">{error}</span>}
        </div>
      </div>

      <div className="create-article-page__inputs">
        <div>
          <InputLabel htmlFor="article-title">Article Title</InputLabel>
          <TextField 
            id="article-title"
            fullWidth
            size="small"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="image-upload">
          <InputLabel>Featured image</InputLabel>
          <label htmlFor="image-upload-button">
            <Button
              variant="contained"
              component="span"
              onClick={(event: any) => {
                event.preventDefault()
                fileInputRef?.current?.click()
              }}
            >
              Select file
            </Button>
            <input
              accept="image/*"
              required
              id="image-upload-button"
              onChange={handleImportImage}
              type="file"
              ref={fileInputRef}
            />
          </label>
          {image ? (
            <div className="imported-image">
              <img src={URL.createObjectURL(image)} alt="uploaded-file" />
              <IconButton
                aria-label="clear-image-selection"
                size="small"
                onClick={handleClearImage}
              >
                <ClearIcon fontSize="inherit" />
              </IconButton>
            </div>
          )
          : null}
        </div>

        <div>
          <InputLabel htmlFor="article-perex">Perex</InputLabel>
          <TextField 
            id="article-perex"
            fullWidth
            size="small"
            name="perex"
            required
            value={formData.perex}
            onChange={handleChange}
          />
        </div>

        <div>
          <InputLabel htmlFor="article-content">Content</InputLabel>
          <TextField
            id="article-content"
            name="content"
            required
            size="small"
            fullWidth
            multiline
            rows={30}
            onChange={handleChange}
            value={formData.content}
          />
        </div>
      </div>

    </form>
  )
}

export default CreateArticle;