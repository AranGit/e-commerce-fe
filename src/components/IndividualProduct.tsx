/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import { Product } from '@/utils/apiUtils'
import React from 'react'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { AuthContext } from "@/contexts/userContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';

function IndividualProduct({ product }: { product: Product }) {
  const router = useRouter();
  const userContextData = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(product.stock > 0 ? 1 : 0);

  const handleQuantity = (value: number) => {
    const newQuantity = quantity + value
    setQuantity(newQuantity < 0 ? 0 : newQuantity >= product.stock ? product.stock : newQuantity);
  }

  const handleAddToCart = () => {
    if (userContextData?.user) {
      //Call Add To User Cart
      setIsLoading(true);
    } else {
      router.push('/login');
    }
  }

  return (
    <>
      <Grid className='card max-w-full m-auto py-4' container spacing={2}>
        <Grid className='px-4' item xs={12} md={5}>
          <Carousel>
            {product.images.map((image, index) =>
              <div key={`product-image-${index}`}>
                <img src={image} />
              </div>
            )}
          </Carousel>
        </Grid>
        <Grid className='px-4' item xs={12} md={7}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h5>{product.title}</h5>
            </Grid>
            <Grid className='py-5 flex items-center' item xs={12}>
              <div className='inline-block'>
                <s>฿{product.price}</s>
              </div>
              <div className='inline-block mx-5'>
                <h3 className='text-[#EE4D2E]'>
                  ฿{(product.price - (product.price * product.discountPercentage / 100)).toFixed(0)}
                </h3>
              </div>
              <div className='inline-block bg-[#EE4D2E] text-white px-[5px]'>
                {product.discountPercentage}% OFF
              </div>
            </Grid>
            <Grid className='py-10' item xs={12}>
              <span>Quantity </span>
              <ButtonGroup className="mx-2" variant="contained" aria-label="Basic button group">
                <Button onClick={() => handleQuantity(-1)}>-</Button>
                <TextField className='w-[70px]' label="" variant="outlined" disabled value={quantity} />
                <Button onClick={() => handleQuantity(1)}>+</Button>
              </ButtonGroup>
              {product.stock} pieces available
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                disabled={quantity <= 0}
                className='secondary-button'
                variant="contained"
                fullWidth
                onClick={handleAddToCart}
              >
                Add To Cart
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="contained" fullWidth>By Now</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
      <Grid className='card max-w-full m-auto mt-4 pb-4' container spacing={2}>
        <Grid className='px-4' item xs={12}>
          <h6 className='p-4 bg-[#ededed]'>Product Specifications</h6>
        </Grid>
        <Grid className='px-4 text-[#afafaf]' item xs={12} md={2}>
          Category
        </Grid>
        <Grid className='px-4' item xs={12} md={10}>
          {product.category}
        </Grid>
        <Grid className='px-4 text-[#afafaf]' item xs={12} md={2}>
          Stock
        </Grid>
        <Grid className='px-4' item xs={12} md={10}>
          {product.stock}
        </Grid>
      </Grid>
      <Grid className='card max-w-full m-auto mt-4 pb-4' container spacing={2}>
        <Grid className='px-4' item xs={12}>
          <h6 className='p-4 bg-[#ededed]'>Product Description</h6>
        </Grid>
        <Grid className='px-4' item xs={12}>
          {product.description}
        </Grid>
      </Grid>
    </>
  )
}

export default IndividualProduct
