/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect } from "react";
import { GetAllProducts, Products, Product } from "@/utils/apiUtils"
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import Grid from '@mui/material/Grid';


export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allProducts, setProducts] = useState<Products | null>(null);
  const handleSetProducts = (products: Products | null) => {
    setIsLoading(false);
    setProducts(products);
  }
  useEffect(() => {
    setIsLoading(true);
    GetAllProducts({ setProducts: handleSetProducts });
  }, []);

  return (
    <div>
      <h1 className="mb-[8px]">Products</h1>
      {isLoading ? <Loading /> :
        <Grid container spacing={2}>
          {allProducts?.products.map((product: Product) =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={`product-${product.id}`}>
              <ProductCard product={product} />
            </Grid>)
          }
        </Grid>
      }
    </div>
  )
}
