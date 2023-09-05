import { types } from "../../types/Types";

export const imagesReducer = (state, action) => {
    
    switch(action.type) {
        case types.loadImages:
            return{
                ...state,
                images: [ ...action.payload ],
                loading: false,
            }

        case types.uploadImage:
            return {
                ...state,
                images: [ ...state.images, action.payload ],
                loading: false,
            }
        
        case types.startLoading:
            return {
                ...state,
                loading: true,
            }

        default:
            return state;
    }

}