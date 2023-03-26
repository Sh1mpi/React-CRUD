import React,{useState} from 'react'
import { IProduct } from '../models'
import axios from 'axios'
import { ErrorMessage } from './Error'

const productData: IProduct = {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    images: [''], 
    category: {
        id: 1,
        name: 'kek',
        image: "https://cdn.lorem.space/images/shoes/.cache/640x480/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg",
    },
}

interface CreateProductProps {
    onCreate: (product: IProduct) => void
}

export async function addProduct(product: IProduct): Promise<IProduct> {
    console.log(product);
    const response = await axios.post<IProduct>('https://api.escuelajs.co/api/v1/products', {
      "title": product.title,
      "price": product.price,
      "description": product.description,
      "categoryId": product.category.id,
      "images": ["https://placeimg.com/640/480/any"],
    });
    return response.data;
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
        try {
            const createdProduct = await addProduct(productData);
            onCreate(createdProduct);
        }

        catch (error) {
            console.error(error);
            setError('Failed to create product.');
        }
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