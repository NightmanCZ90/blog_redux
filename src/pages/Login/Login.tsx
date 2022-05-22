import { Button, CircularProgress, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { login } from '../../slices/currentUserSlice';
import './Login.scss';

export type LoginPageFormData = {
  email: string;
  password: string;
}

const initialFormData = {
  email: '',
  password: '',
}

interface LoginPageProps {

}

const LoginPage: React.FC<LoginPageProps> = () => {
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state) => state.currentUser);
  const [formData, setFormData] = useState<LoginPageFormData>(initialFormData);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(login(formData));
  }

  return (
    <div className="login-page">
      <Paper>
        <h2>Log In</h2>
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
          <div className="login-form--actions">
            <div className="error-message">
              {error && <span>{error}</span>}
            </div>
            <Button
              variant="contained"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (<CircularProgress size={24} />) : "Log In"}
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default LoginPage;