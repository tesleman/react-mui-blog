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
let setLoadingAuth = (loadingAuth: boolean) => ({
    type: SET_LOADING_AUTH,
    loadingAuth
})

export let currentUserThunk = () => async (dispatch: any) => {
    let user = await curentUser()
    if (user != null) {
        dispatch(setLoading(true))
        dispatch(setCurrentUser({id: user.uid, name: user.displayName, photoURL: user.photoURL}))
        dispatch(setLoading(false))
    } else {
        dispatch(setCurrentUser({id: '', name: '', photoURL: ''}))
        dispatch(setLoading(false))
    }
}

export let getCurrentUserThunk = () => (dispatch: any) => {
    return initAuth(() => {
        dispatch(currentUserThunk())
    })
}
export let getAuthor = (id: any) => async (dispatch: any) => {
    author(id)
        .then(response => {
            response.docs.forEach(m => {
                dispatch(setAuthor(m.data()))
            });
        })
}
export let getAuthorsThunk = () => async (dispatch: any) => {
    authors()
        .then(response =>
            dispatch(setAuthors(response))
        )
}

export let loginThunk = (login: any, password: any) => async (dispatch: any) => {
    try {
        dispatch(setLoadingAuth(true))
        let t = await auth(login, password)
        dispatch(setLoadingAuth(false))
        dispatch(setCurrentUser({id: t.user.uid, name: t.user.displayName, photoURL: t.user.photoURL}))
    } catch (e) {
        console.log(e)
    }


}
export let logoutThunk = () => async (dispatch: any) => {
    await signOut()
    dispatch(setCurrentUser({id: "", name: "", photoURL: ""}))
}


export let registrationThunk = (login: any, password: any, name: string) => async () => {

    let ss = await reg(login, password, name).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        return error
        // An error happened.
    })
    console.log(ss + "ss")


}


export default user