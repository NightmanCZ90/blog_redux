import { useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './Navigation.scss';

const Navigation: React.FC = (props) => {
  const navigate = useNavigate();

  return (
    <div className="navigation">
      <div className="menu">
        <div>
          <IconButton
            size="large"
            edge={false}
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/')}
          >
            <EmojiNatureIcon />
          </IconButton>

          <Button onClick={() => navigate('/')} color="inherit">Recent Articles</Button>

          <Button onClick={() => navigate('/about')} color="inherit">About</Button>
        </div>

        <Button endIcon={<ArrowForwardIcon />}>
          Log in
        </Button>
      </div>
    </div>
  )
}

export default Navigation;