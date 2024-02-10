/* eslint-disable @next/next/no-img-element */
'use client'
import { Cart, Carts, GetCartsOfUser, Product } from '@/utils/apiUtils';
import React from 'react'
import { AuthContext } from "@/contexts/userContext";
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Loading from './Loading';

const getNetPrice = (product: Product) => {
  return (product.price - (product.price * product.discountPercentage / 100));
}

function CartList() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [userCarts, setUserCarts] = React.useState<Carts | null>(null);
  const userContextData = React.useContext(AuthContext);

  React.useEffect(() => {
    if (userContextData?.user) {
      GetCartsOfUser(
        {
          userId: userContextData?.user.id,
          onSuccess: (data: Carts) => {
            setUserCarts(data);
            setLoading(false);
          },
          onFailed: () => {
            console.log("Failed");
            setLoading(false);
          }
        })
    }
  }, [userContextData?.user])

  return (
    <Grid className='m-auto max-w-full' container spacing={2}>
      {
        loading ?
          <Loading />
          :
          userCarts?.carts.map((cart: Cart, index) =>
            <Grid className='card mb-4' item xs={12} key={`cart-${index}`}>
              <h4>Products Cart {index + 1}</h4>
              <Divider />
              {cart.products.map((product: Product, index) =>
                <>
                  <Grid className='py-4' container spacing={2} key={`cart-product-${index}`}>
                    <Grid className='flex justify-center' item xs={1}>
                      <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                      />
                    </Grid>
                    <Grid className='flex justify-center' item xs={3}>
                      <img className='max-h-[180px] object-contain' src={product.thumbnail} alt={product.title} />
                    </Grid>
                    <Grid className='flex justify-center' item xs={8}>
                      <Grid container spacing={2}>
                        <Grid className='flex justify-left items-center' item xs={12} md={3}>
                          {product.title}
                        </Grid>
                        <Grid className='flex justify-left items-center' item xs={12} md={3}>
                          <span className='mr-2 text-[#afafaf]'>Unit Price: </span>
                          <span><s className='text-xs'>฿{product.price}</s> ฿{(getNetPrice(product).toFixed(0))}</span>
                        </Grid>
                        <Grid className='flex justify-left items-center' item xs={12} md={3}>
                          <span className='mr-2 text-[#afafaf]'>Quantity: </span>
                          <span>{product.quantity}</span>
                        </Grid>
                        <Grid className='flex justify-left items-center' item xs={12} md={3} >
                          <span className='mr-2 text-[#afafaf]'>Total: </span>
                          <span className='text-[#EE4D2E]'>฿{(getNetPrice(product) * product.quantity).toFixed(0)}</span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {index !== cart.products.length - 1 ? <Divider /> : null}
                </>
              )}
            </Grid>
          )
      }

    </Grid>
  )
}

export default CartList
