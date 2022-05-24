import { Button, InputLabel, TextField } from '@mui/material';
import './CreateArticle.scss';

const CreateArticle: React.FC = () => {
  return (
    <form className="create-article-page">

      <div className="create-article-page__header">
        <h1>Create new article</h1>
        <Button
          variant="contained"
          type="submit"
        >
          Publish Article
        </Button>
      </div>

      <div className="create-article-page__inputs">
        <div>
          <InputLabel htmlFor="article-title">Article Title</InputLabel>
          <TextField 
            id="article-title"
            fullWidth
            size="small"
          />
        </div>

        <div>
          <InputLabel>Featured image</InputLabel>
          <Button variant="contained" component="span">
            Upload an Image
          </Button>
        </div>

        <div>
          <InputLabel htmlFor="article-content">Content</InputLabel>
          <TextField
            id="article-content"
            size="small"
            fullWidth
            multiline
            rows={30}
          />
        </div>
      </div>

    </form>
  )
}

export default CreateArticle;