import { useState } from 'react'
import { Guitar, Header } from './components'
import { db } from './data/db'

import './App.css'

function App() {

    const [data, setData] = useState(db)
    const [cart, setCart] = useState([])

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    const addToCart = item => {

        const itemExists = cart.findIndex( guitar => guitar.id === item.id)
        if (itemExists >= 0 ) {
            console.log("Este elemento ya existe")
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        } else {
            console.log("Agregando...")
            item.quantity = 1
            setCart([...cart, item])
        }
    }

    const removeFromCart = id => {
        setCart(prevState => prevState.filter( guitar => id !== guitar.id))
    }

    const increaseQuantity = id => {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    const decreaseQuantity = id => {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    const emptyCart = () => setCart([])

    return (    
        <>
        <Header
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            emptyCart={emptyCart}
         />
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map(guitar => (
                    <Guitar
                        key={guitar.id}
                        guitar={guitar}
                        setCart={setCart}
                        addToCart={addToCart}
                    />
                ))}
            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
        </>
    )
}

export default App
