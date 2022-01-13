import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Product from './Product';
import axios from 'axios'
import { API } from '../config'

// import data for slider
import { popularProducts } from '../data';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ category, filters, sort }) => {

    const [products, setProducts] = useState([]);
    const [filterProducts, setFilterProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(category
                    ? `${API}/products?category=${category}`
                    : `${API}/products/`);
                setProducts(res.data);
            } catch (error) {

            }
        }
        getProducts();
    }, [category]);

    useEffect(() => {
        category &&
            setFilterProducts(
                products.filter(item =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value)
                    )
                )
            );
    }, [products, category, filters]);

    useEffect(() => {
        if (sort === 'newest') {
            setFilterProducts(prev =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === 'asc') {
            setFilterProducts(prev =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setFilterProducts(prev =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);

    return (
        <Container>
            {category
                ? filterProducts.map(item => (
                    <Product item={item} key={item.id} />
                ))
                : products.slice(0, 8).map(item => (
                    <Product item={item} key={item.id} />
                ))
            }
        </Container>
    )
}

export default Products
