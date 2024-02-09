"use client"
import React, { useReducer } from 'react'
import { useRouter } from 'next/navigation';
import { Login, ErrorResponse } from "@/utils/apiUtils"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


// state
interface State {
  username: string;
  password: string;
  errorResponse: ErrorResponse | null;
}

// action
type Action =
  | { type: 'SET_USERNAME', data: string }
  | { type: 'SET_PASSWORD', data: string }
  | { type: 'SET_USER', data: ErrorResponse | null };

// reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.data };
    case 'SET_PASSWORD':
      return { ...state, password: action.data };
    case 'SET_USER':
      return { ...state, errorResponse: action.data };
    default:
      return state;
  }
}

function LoginCard() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer,
    {
      username: "",
      password: "",
      errorResponse: null
    }
  );

  const handleChangeUsername = (value: string) => {
    dispatch({ type: 'SET_USERNAME', data: value });
  };
  const handleChangePassword = (value: string) => {
    dispatch({ type: 'SET_PASSWORD', data: value });
  };

  const login = () => {
    Login(
      {
        username: state.username,
        password: state.password,
        onSuccess: () => router.push(`/`),
        onFailed: (data: ErrorResponse | null) => dispatch({ type: 'SET_USER', data: data })
      })
  };

  return (
    <Grid className='card py-4' container>
      <Grid item xs={12} className='px-4'>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                id="username-input"
                value={state.username}
                label="Username"
                variant="outlined"
                fullWidth
                required
                onChange={e => handleChangeUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                helperText={""}
                value={state.password}
                type='password'
                id="password-input"
                label="Password"
                variant="outlined"
                fullWidth
                required
                onChange={e => handleChangePassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <Button type='submit' variant="contained" fullWidth={true}>LOG IN</Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>

    </Grid>
  )
}

export default LoginCard
