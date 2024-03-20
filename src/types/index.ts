//Asi seria la otra manera usando interface 
// interface Guitar {
//     id: number
//     name: string
//     image: string
//     description: string
//     price: number
// }

export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export interface CartItem extends Guitar {
    quantity: number
}
//esto es un lookup,se soluciona  asi, "id : Guitar['id']" en la parte de useCart de los id de removeFromCart 
//lo tengo que tipiar para que typescript se de cuenta lo que estoy haciendo    
// export type GuitarId = Guitar['id']
