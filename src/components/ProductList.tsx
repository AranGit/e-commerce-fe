/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useState, useEffect } from "react";
import { GetAllProducts, Products, Product, GetAllCategories } from "@/utils/apiUtils"
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function ProductList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allProducts, setProducts] = useState<Products | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, onSelectCategory] = useState<string[]>([]);

  const handleSetProducts = (products: Products | null) => {
    setIsLoading(false);
    setProducts(products);
  }
  const handleSetCategories = (data: string[]) => {
    setCategories(data);
    GetAllProducts({ setProducts: handleSetProducts });
  }

  useEffect(() => {
    GetAllCategories({ setData: handleSetCategories });
  }, []);

  const handleChange = (event: any, value: string[]) => {
    onSelectCategory(value);
  };

  const filteredProducts = allProducts?.products.filter((product: Product) => {
    return selectedCategories.length > 0 ? selectedCategories.includes(product.category) : true;
  });

  return (
    <>
      {isLoading ? <Loading /> :
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  multiple
                  id="combo-box-demo"
                  options={categories}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} label="Select Catergories" />}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {filteredProducts?.length + " Items"}
          </Grid>
          {filteredProducts?.map((product: Product) =>
            <Grid item xs={12} sm={6} md={4} lg={3} key={`product-${product.id}`}>
              <ProductCard product={product} />
            </Grid>)
          }
        </Grid>
      }
    </>
  )
}

export default ProductList
