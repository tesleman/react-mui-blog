import {auth, author, authors, curentUser, initAuth, reg, signOut} from "../../api";


let SET_USER = "SET_USER"
let SET_LOADING = "SET_LOADING"
let SET_AUTHOR = "SET_AUTHOR"
let SET_AUTHORS = "SET_AUTHORS"
let SET_LOADING_AUTH = "SET_LOADING_AUTH"
let SET_AUTH_ERROR = "SET_AUTH_ERROR"


let initialState = {
    user: {
        id: "",
        name: "",
        photoURL: ""
    },
    loading: true,
    loadingAuth: false,
    author: {
        name: "",
        photoURL: "",
        userId: ""
    },
    authorsstate: [] as Array<any>,
    error: ""
}

const user = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case SET_AUTHOR:
            return {
                ...state,
                author: action.author
            }
        case SET_AUTHORS:
            return Object.assign({}, state, {
                authorsstate: [
                    ...state.authorsstate,
                    ...action.authorsstate
                ]
            })
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_LOADING_AUTH:
            return {
                ...state,
                loadingAuth: action.loadingAuth
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}

let setCurrentUser = (user: any) => ({
    type: SET_USER,
    user
})
export let setAuthUserError = (error: any) => ({
    type: SET_AUTH_ERROR,
    error
})
let setAuthor = (author: any) => ({
    type: SET_AUTHOR,
    author
})
let setAuthors = (authorsstate: any) => ({
    type: SET_AUTHORS,
    authorsstate
})
let setLoading = (loading: boolean) => ({
    type: SET_LOADING,
    loading
})
export let setLoadingAuth = (loadingAuth: boolean) => ({
    type: SET_LOADING_AUTH,
    loadingAuth
})

export let currentUserThunk = () => async (dispatch: any) => {
  try {
      let user = await curentUser()
      if (user != null) {
          dispatch(setLoading(true))
          dispatch(setCurrentUser({id: user.uid, name: user.displayName, photoURL: user.photoURL}))
          dispatch(setLoading(false))
      } else {
          dispatch(setCurrentUser({id: '', name: '', photoURL: ''}))
          dispatch(setLoading(false))
      }}catch (e) {
          dispatch(setAuthUserError(e.message))
          dispatch(setAuthUserError(""))
      }

}

export let getCurrentUserThunk = () => (dispatch: any) => {
    return initAuth(() => {
        dispatch(currentUserThunk())
    })
}
export let getAuthor = (id: any) => async (dispatch: any) => {
    try {
        let response = await author(id)
        response.docs.forEach(m => {
            dispatch(setAuthor(m.data()))
        })
    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
    }
}
export let getAuthorsThunk = () => async (dispatch: any) => {
    try {
        await authors()
            .then(response => dispatch(setAuthors(response)))
    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
    }
}

export let loginThunk = (login: any, password: any) => async (dispatch: any) => {
    try {
        dispatch(setLoadingAuth(true))
        let t = await auth(login, password)
        dispatch(setLoadingAuth(false))
        dispatch(setCurrentUser({id: t.user.uid, name: t.user.displayName, photoURL: t.user.photoURL}))
    } catch (e) {
        dispatch(setLoadingAuth(true))
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }


}
export let logoutThunk = () => async (dispatch: any) => {
    await signOut()
    dispatch(setCurrentUser({id: "", name: "", photoURL: ""}))
}


export let registrationThunk = (login: any, password: any, name: string) => async (dispatch: any) => {
    try {
        dispatch(setLoadingAuth(true))
        await reg(login, password, name)
        dispatch(setLoadingAuth(false))
    } catch (e) {
        dispatch(setLoadingAuth(true))
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }
}


export default user