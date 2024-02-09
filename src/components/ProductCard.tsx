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
    <Card className="mb-[10px] product-card cursor-pointer m-[auto]" sx={{ maxWidth: 345 }} onClick={handleClick}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.images[0]}
        title={product.images[0]}
      />
      <CardContent className="product-card-content">
        <h5 className="ellipse-text">{product.title}</h5>
        <p className="ellipse-2-lines">{product.description}</p>
      </CardContent>
    </Card>
  )
}

export default ProductCard
