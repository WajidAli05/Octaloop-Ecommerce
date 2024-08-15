import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { IconButton, Typography, Divider } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';

function About() {

  const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));

  const reviews = [
    {
      image: '/customer1.jpg',
      description: 'This is an amazing service! Highly recommended.',
      rating: 5
    },
    {
      image: '/customer2.jpg',
      description: 'Great experience, will use again!',
      rating: 4
    },
    {
      image: '/customer3.jpg',
      description: 'Good value for money. Satisfied with the service.',
      rating: 4
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentReview((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <Root>
      <div className='about-container'>
        <Navbar />
        <img className='gif' src='/about.gif' alt='About GIF' />

        <div className='heading-div'>
          <Divider variant='fullWidth' style={{ borderBottomWidth: 2, marginBottom: 10 }} />
          <Typography variant='h4' className='about-heading'>
            Satisfied Customers
          </Typography>
          <Divider variant='fullWidth' style={{ borderBottomWidth: 2, marginTop: 10 }} />
        </div>

        <div className='reviews'>
        <IconButton className='nav-button left' onClick={prevReview}>
            <ArrowBackIosIcon />
          </IconButton>
          <div className='review-container'>
            <img className='customer-image' src={reviews[currentReview].image} alt='Customer' />
            <p className='description'>{reviews[currentReview].description}</p>
            <p className='rating'>
              {'★'.repeat(reviews[currentReview].rating) +
                '☆'.repeat(5 - reviews[currentReview].rating)}
            </p>
          </div>

          <IconButton className='nav-button right' onClick={nextReview}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>

        <Footer />
      </div>
    </Root>
  );
}

export default About;
