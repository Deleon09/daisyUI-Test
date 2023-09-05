import React, { createContext, useReducer } from "react";
import { imagesReducer } from "./ImagesReducer";

export const ImagesContext = createContext();

const initialState = {
    loading: true, //Loading
    images: [], //All images
}

export const ImagesProvider = ({ children }) => {

    const [imagesState, dispatch] = useReducer(imagesReducer, initialState);

    return (
        <ImagesContext.Provider value={{
            imagesState,
            dispatch
        }}>
            { children }
        </ImagesContext.Provider>
    )
}
