import {createSlice} from "@reduxjs/toolkit";
export interface UserState {
    isAuth:boolean,

}

const initialState:UserState = {
    isAuth:false,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setLogin: (state,{payload}) => {
            state.isAuth = payload
        },
    }
})

export const {actions,reducer} = userSlice