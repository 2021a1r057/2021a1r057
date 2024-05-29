import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <Container>
      <CssBaseline />
      <h1>Product Listing</h1>
      <ProductList company="AMZ" category="Laptop" top={10} minPrice={1} maxPrice={10000} />
    </Container>
  );
};

export default App;
