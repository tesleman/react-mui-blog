import {auth, curentUser, f, initAuth, reg, signOut} from "../../api";
import firebase from "firebase";


let SET_USER = "SET_USER"
let SET_LOADING = "SET_LOADING"

let initialState = {
    user: {
        id: "",
        name: "",
        photoURL: ""
    },
    loading: true
}

const user = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.loading
            }

        default:
            return state
    }
}

let setCurrentUser = (user: any) => ({
    type: SET_USER,
    user
})
let setLoading = (loading: boolean) => ({
    type: SET_LOADING,
    loading
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
    return initAuth((user: any) => {
        dispatch(currentUserThunk())
    })
}

export let loginThunk = (login: any, password: any) => async (dispatch: any) => {
    let t = await auth(login, password)

    dispatch(setCurrentUser({id: t.user.uid, name: t.user.displayName, photoURL: t.user.photoURL}))
}
export let logoutThunk = () => async (dispatch: any) => {
    await signOut()
    dispatch(setCurrentUser({id: "", name: "", photoURL: ""}))
}



export let registrationThunk =  (login: any, password: any, name:string) => async (dispatch:any)=>{

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