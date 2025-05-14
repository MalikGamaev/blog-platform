import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchNewUser = createAsyncThunk(
  'user/fetchNewUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://blog-platform.kata.academy/api/users', {
        user: {
          username: username,
          email: email,
          password: password,
        },
      })

      return response.data
    } catch (err) {
      return rejectWithValue({ message: err.response.data.errors })
    }
  }
)

export const fetchUserLogin = createAsyncThunk(
  'user/fetchUserLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://blog-platform.kata.academy/api/users/login', {
        user: {
          email: email,
          password: password,
        },
      })

      return response.data.user
    } catch (err) {
      return rejectWithValue({ message: err.response.data.errors })
    }
  }
)

export const fetchEditProfile = createAsyncThunk(
  'user/fetchEditProfile',
  async ({ email, image, bio, username, password }, { rejectWithValue, getState }) => {
    try {
      const response = await axios.put(
        'https://blog-platform.kata.academy/api/user',
        {
          user: {
            email: email,
            username: username,
            bio: bio,
            image: image,
            password: password,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getState().token || JSON.parse(localStorage.getItem('user')).token}`,
          },
        }
      )
      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response.data.errors)
    }
  }
)

const initialState = {
  isLogin: false,
  token: '',
  signUpErr: false,
  signInErr: false,
  username: '',
  image: '',
  currentUser: null,
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('user')
      state.currentUser = null
      state.isLogin = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewUser.pending, (state) => {
      state.signUpErr = false
    })
    builder.addCase(fetchNewUser.fulfilled, (state, action) => {
      state.token = action.payload.token
    })
    builder.addCase(fetchNewUser.rejected, (state, action) => {
      state.signUpErr = action.payload.message
    })
    builder.addCase(fetchUserLogin.pending, (state) => {
      state.signInErr = false
    })
    builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
      state.username = action.payload.username
      state.image = action.payload.image
      state.isLogin = true
      state.currentUser = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    })
    builder.addCase(fetchUserLogin.rejected, (state, action) => {
      state.signInErr = action.payload.message
    })
    builder.addCase(fetchEditProfile.fulfilled, (state) => {
      state.currentUser = null
      state.isLogin = false
      localStorage.removeItem('user')
    })
  },
})

export const { logout } = userReducer.actions
export default userReducer.reducer
