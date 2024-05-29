import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/test/companies';

export const getProducts = async (company, category, top, minPrice, maxPrice) => {
  try {
    const response = await axios.get(`${BASE_URL}/${company}/categories/${category}/products`, {
      params: { top, minPrice, maxPrice },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
