import { createContext, useState } from "react";

export const wishListContext = createContext({
    items: [],
    wishListIsOpen: false,
    toggleWishList: () => {},
    addToWishList: () => {},
    removeFromWishList: () => {},
})

export function WishListProvider ({ children }) {
    const [wishListItems, setwishListItems] = useState([])
    const [wishListIsOpen, setwishListIsOpen] = useState(false)

    function toggleWishList(){
        setwishListIsOpen(
            prev => !prev
        )
    }
    function addToWishList(item){
        setwishListItems(
            [
                ...wishListItems,
                item
            ]
        )
    }

    function removeFromWishList(item){
        setwishListItems(
            wishListItems.filter(product => product._id !== item._id)
        )
    }

    const wishListContextValues = {
        items: wishListItems,
        wishListIsOpen,
        addToWishList,
        removeFromWishList,
        toggleWishList
    }
    return (
        <wishListContext.Provider value={wishListContextValues}>
            {children}
        </wishListContext.Provider>
    )
} 