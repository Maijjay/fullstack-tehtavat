import { createSlice } from "@reduxjs/toolkit";
//import reducer from "./anecdoteReducer";

const initialState = {}

const notificationSlice = createSlice({
    name:'notifications',
    initialState,
    reducers: {
        newNotification (state, action) {
            
            const newNot = action.payload
            state.notification = newNot
            

        },
        deleteNotification () {
            return initialState
        }
    }
})


export const { newNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer

