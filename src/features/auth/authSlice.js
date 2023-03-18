import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import auth from '../../firebase/firebase.config';

const initialState = {
    email: '',
    role: '',
    isLoading: true,
    isError: false,
    error: ''
};

export const createUser = createAsyncThunk("auth/createUser",
    async ({ email, password }, thunkApi) => {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        return data.user.email;
    })

export const loginUser = createAsyncThunk("auth/loginUser",
    async ({ email, password }, thunkApi) => {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.email;
    })

export const googleLogin = createAsyncThunk("auth/googleLogin",
    async () => {
        const googleProvider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, googleProvider);
        return data.user.email;
    })

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.email = "";
        },
        setUser: (state, { payload }) => {
            state.email = payload;
            state.isLoading = false
        },
        toggleLoading: state => {
            state.isLoading = false;
        }
    },
    extraReducers: builder => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })
        builder.addCase(createUser.fulfilled, (state, { payload }) => {
            state.email = payload;
            state.isLoading = false;
            state.isError = false;
            state.error = '';
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.email = "";
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state.email = payload;
            state.isLoading = false;
            state.isError = false;
            state.error = '';
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.email = "";
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
        builder.addCase(googleLogin.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = '';
        })
        builder.addCase(googleLogin.fulfilled, (state, { payload }) => {
            state.email = payload;
            state.isLoading = false;
            state.isError = false;
            state.error = '';
        })
        builder.addCase(googleLogin.rejected, (state, action) => {
            state.email = "";
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
})

export const { logout, setUser, toggleLoading } = authSlice.actions;
export default authSlice.reducer;