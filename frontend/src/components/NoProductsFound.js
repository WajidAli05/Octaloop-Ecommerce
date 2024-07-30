import React from 'react'
import Alert from '@mui/material/Alert';

function NoProductsFound() {
  return (
    <Alert variant="filled" severity="error">
        NoProductsFound for the set filters!
    </Alert>
  )
}

export default NoProductsFound;
