import React,{useState} from 'react'
import { IProduct } from '../models'
import axios from 'axios'
import { ErrorMessage } from './Error'

const productData: IProduct = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
        rate: 3.9,
        count: 120
    },
}

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

export function CreateProduct({onCreate}:CreateProductProps) {
    const [value,setValue] = useState('')
    const [error,setError] = useState('')

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        setError('')

        if (value.trim().length === 0){
            setError('Please enter valid title.')
            return 
        }

        productData.title = value
        const response = axios.post<IProduct>('https://fakestoreapi.com/products',productData)
        onCreate((await response).data)
    }

    return (
        <form onSubmit={submitHandler}>
            <input 
                type="text" 
                className='border py-2 px-4 mb-2 w-full outline-0'
                placeholder='Enter product title...'
                value={value}
                onChange={event => setValue(event.target.value)}
            />

            {error && <ErrorMessage error={error}/>}

            <button type='submit' className='py-2 px-4 border bg-yellow-400 hover:text-white'>Create</button>
        </form>
    )
}