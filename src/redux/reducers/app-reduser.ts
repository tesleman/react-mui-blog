import {curentUser, initAuth} from "../../api";
import {currentUserThunk, getCurrentUserThunk} from "./user";


let SET_LOADING = "SET_LOADING"


let initialState = {
    isLoading: false
}

type initialStateType = typeof initialState

const appReducers = (state = initialState, action: any):initialStateType => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        default:
            return state
    }
}
type setLoadingType = {
    type: typeof SET_LOADING
}
export let setLoading = ():any => ({type: SET_LOADING})
// type thunkType = ThunkAction<void, AppStateType, unknown, setLoadingType>
// export let  initializeThunk =()=> (dispatch:any)=>{
//
//      let promise =  dispatch(getCurrentUserThunk())
//    // let  promuise2 = dispatch(currentUserThunk())
//
//     console.log(promise, "propmise")
//     // console.log(promuise2, "promuise2")
//     Promise.all([promise])
//
//         .then(() => {
// //             dispatch(setLoading())
//         })
// }
export default appReducers;