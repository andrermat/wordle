import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { configureStore, createSelector } from "@reduxjs/toolkit";

interface Theme {
    theme: string
    mode: string
}


const initialTheme: Theme = {
    theme: "Light",
    mode: "Default"
}


const themeSlice = createSlice({
    name: "Theme",
    initialState: initialTheme,
    reducers: {
        changeTheme: (state: Theme, action: PayloadAction<string>) => {
            state.theme = action.payload
            return state
        },
        changeMode: (state: Theme, action: PayloadAction<string>) => {
            state.mode = action.payload
            return state
        }
    }
});

const store = configureStore({
    reducer: themeSlice.reducer
})
const root = createSelector((state: RootReducer) => state, (state: RootReducer) => state)
type RootReducer = ReturnType<typeof store.getState>
export { store, root }
export const { changeTheme, changeMode } = themeSlice.actions