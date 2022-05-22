import { Button, CircularProgress, Link, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { signUp } from '../../slices/currentUserSlice';
import './SignUp.scss';
import { useNavigate } from 'react-router-dom';

export type SignUpPageFormData = {
  email: string;
  password: string;
}

const initialFormData = {
  email: '',
  password: '',
}

interface SignUpPageProps {

}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.currentUser);
  const [formData, setFormData] = useState<SignUpPageFormData>(initialFormData);

  // TODO: Implement sign up

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(signUp(formData));
  }

  return (
    <div className="signup-page">
      <Paper>
        <h2>Sign Up</h2>
        <br/>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            size="small"
            id="email-input"
            label="Email"
            name="email"
            type="email"
            placeholder="me@example.com"
            error={!Boolean(formData.email)}
            onChange={handleChange}
          />
          <TextField
            required
            fullWidth
            size="small"
            id="password-input"
            label="Password"
            type="password"
            name="password"
            placeholder="********"
            error={!Boolean(formData.password)}
            onChange={handleChange}
          />
          <div className="error-message">
            {error && <span className="error">{error}</span>}
          </div>
          <div className="signup-form--actions">
            <Link
              variant="body2"
              component="button"
              underline="always"
              onClick={() => navigate('/login')}
            >
              Already have an account?
            </Link>
            <Button
              variant="contained"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (<CircularProgress size={24} />) : "Sign Up"}
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default SignUpPage;