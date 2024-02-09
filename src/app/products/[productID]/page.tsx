"use client"
import { useState, useEffect } from "react";
import { GetProductByID, Product } from "@/utils/apiUtils"
import Loading from "@/components/Loading";
import IndividualProduct from "@/components/IndividualProduct";

export default function ProductByIDPagePage({ params }: { params: { productID: string } }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  const handleSetProducts = (product: Product | null) => {
    setIsLoading(false);
    setProduct(product);
  }
  useEffect(() => {
    setIsLoading(true);
    GetProductByID({ productID: params.productID, setProduct: handleSetProducts });
  }, []);

  return (
    <div>
      {
        isLoading ? <Loading /> :
          product ?
            <IndividualProduct product={product} />
            : <p>Product not found</p>
      }
    </div>
  )
}
