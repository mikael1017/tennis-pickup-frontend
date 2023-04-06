import { createSlice } from "@reduxjs/toolkit";

const currentUser = {
    "name": "",
    "userName": "",
    "profileImage": "",
};


const userSlice = createSlice({
    name: 'user',
    initialState: currentUser,
    reducers: {
        setUser(state, action) {
            state.name = action.payload.name;
            state.userName = action.payload.userName;
            state.profileImage = action.payload.profileImage;
        },
        clearUser(state) {
            state.name = "";
            state.userName = "";
            state.profileImage = "";
        },
    },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;