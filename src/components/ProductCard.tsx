import { Product } from "@/utils/apiUtils"
import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };
  return (
    <Card className="mb-[10px] product-card cursor-pointer m-[auto] relative" sx={{ maxWidth: 345 }} onClick={handleClick}>
      <div className="product-discount">
        <>{product.discountPercentage}%</>
      </div>
      <CardMedia
        sx={{ height: 140 }}
        image={product.thumbnail}
        title={product.title}
      />
      <CardContent className="product-card-content">
        <h5 className="ellipse-text">{product.title}</h5>
        <p className="ellipse-2-lines">{product.description}</p>
        <p className="text-[#EE4D2E] mt-3">฿{product.price}</p>
      </CardContent>
    </Card>
  )
}

export default ProductCard
