import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions = 

    {type: 'add-to-cart', payload: {item: Guitar}} |
    {type: 'remove-from-cart', payload: {id: Guitar['id']}} |
    {type:  'decrease-quantity', payload: {id: Guitar['id']}} | 
    {type:  'increase-quantity', payload: {id: Guitar['id']}} | 
    {type: 'clear-cart'}

export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}    

const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

//este se utiliza cuando esta useReducer
export const initialState : CartState = {
    data: db,
    cart: initialCart()
}
export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
    ) => {

    if(action.type === 'add-to-cart'){
        //esto itera sobre nuestro carrito de compras
        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)

        let updateCart : CartItem[] = []
        
        if(itemExists){
            updateCart = state.cart.map(item => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < 5) {
                        return{...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                } else {
                    return item
                }
            })
        } else {
            const newItem : CartItem = {...action.payload.item, quantity : 1}
            updateCart = [...state.cart, newItem]
        }
        return{
            ...state,
            cart: updateCart
        }
    }    

    if(action.type === 'remove-from-cart'){
        
        const cart = state.cart.filter(item => item.id !== action.payload.id)

        return{
            ...state,
            cart
        }
    }

    if(action.type === 'decrease-quantity'){
        //Decrementar el carrito
        const cart = state.cart.map(item => {
            if(item.id === action.payload.id && item.quantity > 1){
              return{
                ...item,
                quantity: item.quantity - 1
              }
            }
            return item
          })

        return{
            ...state,
            cart
        }
    }

    if(action.type === 'increase-quantity'){
        //Crementar el carrito
        const cart = state.cart.map(item => {
            if(item.id === action.payload.id && item.quantity < 5){
              return{
                ...item,
                quantity: item.quantity + 1
              }
            }
            return item
          })
          
        return{
            ...state,
            cart
        }
    }

    if(action.type === 'clear-cart'){
        return{
            ...state,
            cart:[]
        }
    }

    return state
}