import { Button, IconButton } from '@mui/material'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import './Navigation.scss';

const Navigation: React.FC = (props) => {
  return (
    <div className="Navigation">
      <div className="menu">
        <div>
          <IconButton
            size="large"
            edge={false}
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <EmojiNatureIcon />
          </IconButton>

          <Button color="inherit">Recent Articles</Button>

          <Button color="inherit">About</Button>
        </div>

        <Button endIcon={<ArrowForwardIcon />}>
          Log in
        </Button>
      </div>
    </div>
  )
}

export default Navigation;