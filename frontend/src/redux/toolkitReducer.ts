import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "."

export const toolKitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        user: {
            name: null,
            avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUuqj4Wm1BlDTS_zP4EvGRCgZd1mqNthtT-Q&usqp=CAU',
            telNumber: null,
            password: null,
            lastName: null,
            selectedDate: null,
        }
    },
    reducers: {
        setNameRedux(state, action) {
            state.user = action.payload

        }
    }
})
export default toolKitSlice.reducer
export const { setNameRedux } = toolKitSlice.actions
export const userAuthRedux = (state: RootState) => state.toolkit.user;