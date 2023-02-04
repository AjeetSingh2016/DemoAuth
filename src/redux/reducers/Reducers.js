import { SET_DATA, SET_LOADER, CLOSE_LOADER, SET_PROFILE, CLOSE_PROFILE } from "../ActionTypes"

const initState = {
    profileToggle: false,
    loading: false,
    newsData: [],
    
}


 export const FetchData = (state = initState, action) =>{
    if(action.type === SET_DATA){
        return{
            ...state,
            newsData: action.payload,
        };
    }
    else if(action.type === SET_LOADER){
        return{
            ...state,
            loading: true,
        };
    }
    else if(action.type === CLOSE_LOADER){
        return{
            ...state,
            loading: false,
        };

    }
    else if(action.type === SET_PROFILE){
        return{
            ...state,
            profileToggle: true,
        };

    }
    else if(action.type === CLOSE_PROFILE){
        return{
            ...state,
            profileToggle: false,
        };

    }
    else{
        return state
    }
}