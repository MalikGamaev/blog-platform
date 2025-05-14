import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchGetArticles = createAsyncThunk('articles/fetchGetArticles', async (offset = 0) => {
  try {
    const response = await axios.get(`https://blog-platform.kata.academy/api/articles?offset=${offset}&limit=10`)
    return response.data
  } catch (error) {
    console.error(error)
  }
})

export const fetchGetArticle = createAsyncThunk('articles/fetchGetArticle', async (slug) => {
  try {
    const response = await axios.get(`https://blog-platform.kata.academy/api/articles/${slug}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
})

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async ({ title, description, body, tags }, { rejectWithValue, getState }) => {
    try {
      const response = await axios.post(
        'https://blog-platform.kata.academy/api/articles',
        {
          article: {
            title: title,
            description: description,
            body: body,
            tagList: tags,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getState().token || JSON.parse(localStorage.getItem('user')).token}`,
          },
        }
      )
      return response.data.article
    } catch (error) {
      return rejectWithValue({ message: error.response.data.errors })
    }
  }
)

export const fetchEditArticle = createAsyncThunk(
  'fetchEditArticle',
  async ({ title, description, body, tags, slug }, { getState }) => {
    try {
      const response = await axios.put(
        `https://blog-platform.kata.academy/api/articles/${slug}`,
        {
          article: {
            title: title,
            description: description,
            body: body,
            tagList: tags,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${getState().token || JSON.parse(localStorage.getItem('user')).token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
)

export const fetchDeleteArticle = createAsyncThunk('fetchDeleteArticle', async (slug, { getState }) => {
  try {
    const response = await axios.delete(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${getState().token || JSON.parse(localStorage.getItem('user')).token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
})

export const fetchAddFavorited = createAsyncThunk('fetchAddFavorited', async (slug, { getState }) => {
  try {
    const response = await axios.post(
      `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getState().token || JSON.parse(localStorage.getItem('user')).token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
})

export const fetchDeleteFavorited = createAsyncThunk('fetchDeleteFavorited', async (slug, { getState }) => {
  try {
    const response = await axios.delete(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
      headers: {
        Authorization: `Bearer ${getState().token || JSON.parse(localStorage.getItem('user')).token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
})

const initialState = {
  articles: [],
  totalCount: 0,
  loading: true,
  currentPage: 1,
  currentArticle: null,
  slug: '',
  tagList: JSON.parse(localStorage.getItem('currentArticle'))?.tagList || [],
  createTags: [],
  currentTag: '',
  successArticle: false,
}

const articleReducer = createSlice({
  name: 'article',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload
    },
    changeSlug: (state, action) => {
      state.slug = action.payload
    },
    addCreateTag: (state, action) => {
      state.createTags = [...state.createTags, action.payload]
      state.currentTag = ''
    },
    addTag: (state, action) => {
      state.tagList = [...state.tagList, action.payload]
      state.currentTag = ''
    },
    deleteTag: (state, action) => {
      state.tagList = state.tagList.filter((tag) => tag !== action.payload)
    },
    deleteCreateTag: (state, action) => {
      state.createTags = state.createTags.filter((tag) => tag !== action.payload)
    },
    clearTag: (state) => {
      state.currentTag = ''
    },
    changeTag: (state, action) => {
      state.currentTag = action.payload
    },
    changeFlagCreate: (state) => {
      state.successArticle = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetArticles.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchGetArticles.fulfilled, (state, action) => {
      state.articles = [...action.payload.articles]
      state.totalCount = action.payload.articlesCount
      state.loading = false
    })
    builder.addCase(fetchGetArticle.fulfilled, (state, action) => {
      state.currentArticle = action.payload.article
      localStorage.setItem('currentArticle', JSON.stringify(action.payload.article))
      state.tagList = [...state.tagList, ...JSON.parse(localStorage.getItem('currentArticle')).tagList]
    })
    builder.addCase(fetchCreateArticle.fulfilled, (state) => {
      state.successArticle = true
      state.createTags = []
    })
    builder.addCase(fetchEditArticle.fulfilled, (state) => {
      state.successArticle = true
      state.tagList = []
    })
    builder.addCase(fetchDeleteArticle.fulfilled, (state) => {
      state.currentArticle = null
      state.successArticle = true
    })
    builder.addCase(fetchAddFavorited.fulfilled, (state, action) => {
      state.articles = state.articles.map((article) =>
        article.slug === action.payload.article.slug ? action.payload.article : article
      )
      state.currentArticle = action.payload.article
      localStorage.setItem('currentArticle', action.payload.article)
    })
    builder.addCase(fetchDeleteFavorited.fulfilled, (state, action) => {
      state.articles = state.articles.map((article) =>
        article.slug === action.payload.article.slug ? action.payload.article : article
      )
      state.currentArticle = action.payload.article
      localStorage.setItem('currentArticle', action.payload.article)
    })
  },
})

export const {
  changePage,
  changeSlug,
  addTag,
  addCreateTag,
  deleteTag,
  deleteCreateTag,
  clearTag,
  changeTag,
  changeFlagCreate,
} = articleReducer.actions
export default articleReducer.reducer
