import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

const CartContext = createContext([])
export const useCartContext = () => useContext(CartContext)

const CartContextProvider = ({ children }) => {
    const [carList, setCartList] = useState([])
    const [bandera,setBandera] = useState(false)
    const [totalCant, setTotalCant] = useState(0)

    useEffect(()=>{

        if (bandera) {
            carList.pop()
            setTotalCant(cantProd())
        
        } else {
            setBandera(false)
            setTotalCant(cantProd())
        }
    },[carList])

    const addCart = (prod) => {
        setCartList([...carList, prod])
        produRepetido(prod)
    
    }

    const produRepetido = (produ) => {

        const idxCarList = carList.findIndex(ele => ele.id === produ.id)

        if (idxCarList != -1) {     // este producto se repite
        

            const catidadTotal = carList[idxCarList].cantidad + produ.cantidad

            carList[idxCarList].cantidad = catidadTotal
            carList[idxCarList].price = produ.price * catidadTotal

            setBandera(true)

        } else {                    // este produco no se repite
        
            setBandera(false)
        }

    }

    const redondeo = (num) => {
        const numBack = (Math.round(num * 100)) / 100
        return numBack
    }

    const precioTotalSinIVA = () => {
        return redondeo(carList.reduce((acum, prod) => acum + (prod.cantidad * prod.price), 0))
    }

    const precioTotalConIVA = () => {
        const iva = 0.21
        const total = precioTotalSinIVA()
        return redondeo((total + (total * iva)))
    }

    const removeItem = (id) => {
        setBandera(false)
        setCartList(carList.filter(item => item.id !== id))
        //setBandera(false)
    }

    const cleanCart = () => {
        setCartList([])
    }

    const cantProd = () => {
    
        const total = carList.reduce((acc,curr)=> acc + curr.cantidad,0)
    
        return total
    }

    return (
        <CartContext.Provider value={{
            carList,
            totalCant,
            addCart,
            precioTotalSinIVA,
            precioTotalConIVA,
            removeItem,
            cleanCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider