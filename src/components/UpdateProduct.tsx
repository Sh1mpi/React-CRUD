import React, { useState } from 'react'
import { IProduct } from '../models'
import axios from 'axios'
import { ErrorMessage } from './Error'

const productData: IProduct = {
  id: 1,
  title: "",
  price: -1,
  description: "",
  images: [''],
  category: {
    id: 1,
    name: 'kek',
    image: "https://cdn.lorem.space/images/shoes/.cache/640x480/paul-gaudriault-a-QH9MAAVNI-unsplash.jpg",
  },
}

interface CreateProductProps {
  onCreate: (product: IProduct) => void
  type: string
}

export async function updateProduct(product: IProduct,type: string): Promise<IProduct> {
  const response = await axios.put<IProduct>(`https://api.escuelajs.co/api/v1/products/${type}`, {
    "title": product.title,
    "price": product.price,
    "description": product.description,
  });
  return response.data;
}

export function UpdateProduct({ onCreate,type}: CreateProductProps) {
  const [product, setProduct] = useState<IProduct>(productData);
  const [error, setError] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (product.title.trim().length === 0) {
      setError('Please enter valid title.');
      return;
    }
    if (product.description.trim().length === 0) {
        setError('Please enter valid title.');
        return;
    }
    if (product.price < 0) {
      setError('Please enter valid title.');
      return;
    }


    try {
      const updatedProduct = await updateProduct(product,type);
      setProduct(updatedProduct);
      onCreate(updatedProduct);
    } catch (error) {
      console.error(error);
      setError('Failed to update product.');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product title..."
        onChange={(event) => setProduct({...product, title: event.target.value})}
      />
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product description..."
        onChange={(event) => setProduct({...product, description: event.target.value})}
      />
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product price..."
        onChange={(event) => setProduct({...product, price: Number(event.target.value)})}
      />

      {error && <ErrorMessage error={error} />}

      <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">
        Save
      </button>
    </form>
  );
}