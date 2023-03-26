import {IProduct} from '../models'
import {useState,useContext} from 'react'
import axios from 'axios'
import { ModalContext } from '../context/ModalContext';

interface ProductProps {
    product: IProduct;
    deleteProduct: (productId: number) => void;
}

export function Product({product,deleteProduct}:ProductProps) {
    const [details,setDetails] = useState(false)
    const btnClassName = details ? 'bg-yellow-400':'bg-blue-400'
    const btnClasses = ['py-2 px-4 border',btnClassName]
    const {modal,open,close} = useContext(ModalContext)

    return (
        <div 
            className="border py-2 px-4 rounded flex flex-col items-center mb-2 relative"
        >
            <img src={product.category.image} alt={product.title} className='w-1/6'/>
            <p>{product.title}</p>
            <p className='font-bold'>{product.price}$</p>
            <button 
            className={btnClasses.join(' ')}
            onClick={()=> setDetails(prev=>!prev)}

            >
                {details ? 'Hide Details': 'Show Details'}
            </button>
            {details && <div>
                <p>{product.description}</p>
            </div>}
            <button className='absolute right-0 top-0' onClick={()=>{deleteProduct(product.id)}}>
                <svg fill="#000000" width="32px" height="32px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                </svg>
            </button>
            <button className='absolute right-10 top-0' onClick={()=>{open(String(product.id))}}>
            <svg width="32" height="32" viewBox="0 0 33 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.93327 34.395C6.2356 34.7203 5.44737 34.1684 5.51446 33.4015L6.20096 25.5548C6.26806 24.7879 7.14015 24.3813 7.77073 24.8228L14.223 29.3407C14.8535 29.7822 14.7697 30.7408 14.072 31.0662L6.93327 34.395Z" fill="#7C66B9"/>
                <rect x="15.2016" y="30.5538" width="10.8715" height="19.7664" transform="rotate(-145 15.2016 30.5538)" fill="#7C66B9"/>
                <path d="M27.7437 12.6417L18.8383 6.40604L19.7595 5.09047C21.4814 2.6313 24.8708 2.03365 27.33 3.75557C29.7892 5.4775 30.3868 8.86695 28.6649 11.3261L27.7437 12.6417Z" fill="#7C66B9"/>
            </svg>
            </button>
        </div>
    )
}