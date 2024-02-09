/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import { Product } from '@/utils/apiUtils'
import React from 'react'
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';

function IndividualProduct({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState<number>(product.stock > 0 ? 1 : 0);

  const handleQuantity = (value: number) => {
    const newQuantity = quantity + value
    setQuantity(newQuantity < 0 ? 0 : newQuantity >= product.stock ? product.stock : newQuantity);
  }

  return (
    <Grid className='card max-w-full m-auto' container spacing={2}>
      <Grid className='p-4' item xs={12} md={5}>
        <Carousel>
          {product.images.map((image, index) =>
            <div key={`product-image-${index}`}>
              <img src={image} />
            </div>
          )}
        </Carousel>
      </Grid>
      <Grid className='p-4' item xs={12} md={7}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h5>{product.title}</h5>
          </Grid>
          <Grid item xs={12}>
            <h3>฿{product.price}</h3>
          </Grid>
          <Grid item xs={12}>
            <span>Quantity </span>
            <ButtonGroup className="mx-2" variant="contained" aria-label="Basic button group">
              <Button onClick={() => handleQuantity(-1)}>-</Button>
              <TextField className='w-[70px]' label="" variant="outlined" disabled value={quantity} />
              <Button onClick={() => handleQuantity(1)}>+</Button>
            </ButtonGroup>
            {product.stock} pieces available
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default IndividualProduct
