import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Accordion, InputGroup, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoryThunk, getProductsThunk, setProducts } from '../store/slices/products.slice';

const Filter = ({ categories }) => {

    const dispatch = useDispatch();
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [message, setMessage] = useState(false)
    const [productToFilter, setProductToFilter] = useState([])

    useEffect(() => {
        axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products")
            .then(res => setProductToFilter(res.data))
    }, [])


    const getFilter = () => {
        let filteredProducts = productToFilter.filter(product =>
            product.price >= Number(from) && product.price <= Number(to))
        if (filteredProducts[0]) {
            dispatch(setProducts(filteredProducts))
        } else {
            showMessage()
        }
    }

    const showMessage = () => {
        setMessage(true)
        setFrom(0)
        setTo(0)
        setTimeout(() => {
            setMessage(false)
        }, 2000)
    }

    const filterCategory = (category) => {
        dispatch(filterCategoryThunk(category.id))
    }

    return (
        <>
            <Accordion className='filters' defaultActiveKey={['0', '1']}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter by Category</Accordion.Header>
                    <hr />
                    <Accordion.Body>
                        {
                            categories.map(category => (
                                <p className='categories' key={category.id}
                                    onClick={() => filterCategory(category)}>
                                    {category.name}</p>
                            ))
                        }
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Filter by Price</Accordion.Header>
                    <hr />
                    <Accordion.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder='From'
                                type='number'
                                value={from}
                                onChange={e => setFrom(e.target.value)} />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                aria-label="Dollar amount (with dot and two decimal places)"
                                placeholder='To'
                                type='number'
                                value={to}
                                onChange={e => setTo(e.target.value)} />

                        </InputGroup><br />
                        <Button
                            variant="primary"
                            onClick={() => getFilter()}
                            disabled={Number(to) <= Number(from)}>Applay
                        </Button>
                        {
                            message && <p style={{ color: "red" }}><i>No existen productos en ese rango de precios</i></p>
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default Filter;