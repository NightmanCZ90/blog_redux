import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Menu, MenuItem } from '@mui/material'
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import './Navigation.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { useState } from 'react';
import { signOut } from '../../slices/currentUserSlice';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.currentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleUserProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

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

        <div className="user-buttons">
          {user ? renderUserButtons() : renderAuthButtons()}
        </div>
      </div>
    </div>
  )

  /**
   * renders buttons for managing content when user is logged in
   */
  function renderUserButtons() {
    return (
      <>
        <Button onClick={() => navigate('/my-articles')}>
          My Articles
        </Button>
        <Button onClick={() => navigate('/create')}>
          Create Article
        </Button>
        <Button onClick={handleUserProfileClick} startIcon={<ArrowDropDownIcon />}>
          User
        </Button>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'user-menu',
          }}
        >
          <MenuItem onClick={() => {handleClose(); dispatch(signOut())}}>Sign Out</MenuItem>
        </Menu>
      </>
    )
  }

  /**
   * renders buttons when user is not logged in
   */
  function renderAuthButtons() {
    return (
      <>
        <Button onClick={() => navigate('/signup')}>
          Sign Up
        </Button>
        <Button onClick={() => navigate('/login')} endIcon={<ArrowForwardIcon />}>
          Log in
        </Button>
      </>
    )
  }
}

export default Navigation;