import React,{useEffect, useState} from 'react';
import {Product} from '../components/Product'
import { IProduct } from '../models';
import axios, { AxiosError } from 'axios';

export function useProducts() {
    const [products,setProducts] = useState<IProduct[]>([])
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState('')

    function addProduct(product: IProduct){
        setProducts(prev=>[...prev,product])
    }

    async function deleteProduct(id:number) {
        try {
            setLoading(true)
            await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
            const updatedProducts = products.filter(p => p.id !== id)
            setProducts(updatedProducts)
            setLoading(false)
          } catch (e: unknown) {
            const error = e as AxiosError
            setLoading(false)
            setError(error.message)
          }
    }

    async function fetchProducts() {
        try {
        setLoading(true)
        const response = await axios.get<IProduct[]>('https://api.escuelajs.co/api/v1/products?offset=0&limit=10')
        setProducts(response.data)
        setLoading(false)
        }
        catch(e: unknown) {
        const error = e as AxiosError 
        setLoading(false)
        setError(error.message)
        } 
    }
    useEffect(()=> {
        fetchProducts()
    },[])
    
    
    return {products,error,loading,addProduct,deleteProduct}
}