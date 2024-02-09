"use client"
import { useState, useEffect } from "react";
import { GetProductByID, Product } from "@/utils/apiUtils"
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";

export default function ProductByIDPagePage({ params }: { params: any }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  const handleSetProducts = (product: Product | null) => {
    setIsLoading(false);
    setProduct(product);
  }
  useEffect(() => {
    setIsLoading(true);
    GetProductByID({ productID: params.productID, setProduct: handleSetProducts });
  }, [params.productID]);

  return (
    <div>
      {
        isLoading ? <Loading /> :
          product ? <ProductCard product={product} /> : <p>Product not found</p>
      }
    </div>
  )
}
