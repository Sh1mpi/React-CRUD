import React, {useState,useContext} from 'react';
import { CreateProduct } from '../components/CreateProduct';
import { UpdateProduct } from '../components/UpdateProduct';
import { ErrorMessage } from '../components/Error';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';
import {Product} from '../components/Product'
import { ModalContext } from '../context/ModalContext';
import { useProducts } from '../hooks/product';
import { IProduct } from '../models';

export function ProductPage() {
    const {loading,products,error,addProduct,deleteProduct} = useProducts()
    const {modal,open,close,type} = useContext(ModalContext)

    const createHandler = (product: IProduct)=> {
        close()
        addProduct(product)
    }

    return (
        <div className='container mx-auto max-w-2xl pt-5'>
        {loading && <Loader/>}
        {error && <ErrorMessage error={error}/>}
        {products.map(product => <Product product={product} deleteProduct={deleteProduct} key={product.id}/>)}

        {modal && type === 'create' && <Modal title="Create new product" onClose={close}>
            {<CreateProduct onCreate={createHandler}/>}
        </Modal>}

        {modal && type !== 'create' && <Modal title="Update product" onClose={close}>
            {<UpdateProduct onCreate={createHandler} type={type}/>}
        </Modal>}

        <button 
            className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'
            onClick={()=>{open('create')}}
        >+</button>
        </div>
    );
}