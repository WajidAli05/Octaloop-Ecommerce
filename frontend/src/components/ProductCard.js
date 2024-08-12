import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Badge from '@mui/material/Badge';


function ProductCard({product}) {    
  return (
    <>
      {product.discountRate > 0 ?
    <Badge badgeContent={`${product.discountRate} %`} color='error' >
    <Card sx={{ maxWidth: 345 }} className='product-card'>
        <CardActionArea>
        <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
        />
        <CardContent className='product-info-section'>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
            <div>
                <Typography variant="body2" color="text.secondary" className='info-item'>
                    <p>{product.price}</p>
                    <span>Price</span>
                </Typography>
                <Typography variant="body2" color="text.secondary" className='info-item'>
                    <p>{product.size}</p>
                    <span>Size</span>
                </Typography>
                <Typography variant="body2" color="text.secondary" className='info-item'>
                    <p>{product.color}</p>
                    <span>Color</span>
                </Typography>
                <Typography variant="body2" color="text.secondary" className='info-item'>
                    <p>{product.fit}</p>
                    <span>Fit</span>
                </Typography>
            </div>
        </CardContent>
        </CardActionArea>
     </Card>
     </Badge> :
     <Card sx={{ maxWidth: 345 }} className='product-card'>
     <CardActionArea>
     <CardMedia
         component="img"
         height="140"
         image={product.image}
         alt={product.name}
     />
     <CardContent className='product-info-section'>
             <Typography gutterBottom variant="h5" component="div">
                 {product.name}
             </Typography>
         <div>
             <Typography variant="body2" color="text.secondary" className='info-item'>
                 <p>{product.price}</p>
                 <span>Price</span>
             </Typography>
             <Typography variant="body2" color="text.secondary" className='info-item'>
                 <p>{product.size}</p>
                 <span>Size</span>
             </Typography>
             <Typography variant="body2" color="text.secondary" className='info-item'>
                 <p>{product.color}</p>
                 <span>Color</span>
             </Typography>
             <Typography variant="body2" color="text.secondary" className='info-item'>
                 <p>{product.fit}</p>
                 <span>Fit</span>
             </Typography>
         </div>
     </CardContent>
     </CardActionArea>
  </Card>
    }
    </>
  )
}

export default ProductCard