"use client"
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function LoginCard() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeUsername = (value: string) => {
    setUsername(value)
  };
  const handleChangePassword = (value: string) => {
    setPassword(value)
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
            console.log("onSubmit")
          }}
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                id="username-input"
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
