"use client"
import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function LoginCard() {
  return (
    <Grid className='card py-4' container spacing={2}>
      <Grid item xs={12} className='px-4'>
        <TextField id="username-input" label="Username" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={12} className='px-4'>
        <TextField error={false} helperText={""} type='password' id="password-input" label="Password" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={12} className='px-4'><Button variant="contained" fullWidth={true}>LOG IN</Button></Grid>
    </Grid>
  )
}

export default LoginCard
