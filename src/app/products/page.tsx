/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect, useContext } from "react";
import { GetAllProducts, Products, Product } from "@/utils/apiUtils"
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import { AuthContext } from "@/contexts/userContext";
import Grid from '@mui/material/Grid';


export default function ProductsPage() {
  const userContextData = useContext(AuthContext);

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
      <h1 className="mb-[8px]">Products {userContextData?.user?.firstName}</h1>
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
