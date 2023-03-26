import {createContext, useState} from 'react'

interface IModalContext {
    modal: boolean
    open: (type:string)=> void
    close: ()=> void
    type: string
}

export const ModalContext = createContext<IModalContext>({
    modal: false,
    open: ()=> {},
    close: ()=> {},
    type: '',
})

export const ModalState = ({children}:{children:React.ReactNode})=> {
    const [modal,setModal] = useState(false)
    const [type, setType] = useState('')
    const open = (type: string) => {
        setType(type);
        setModal(true);
    }
    const close = () => setModal(false)
    return (
        <ModalContext.Provider value={{modal,open,close,type}}>
            {children}
        </ModalContext.Provider>
    )
}