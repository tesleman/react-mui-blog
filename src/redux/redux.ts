import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import newsRedus from "./reducers/news-reduser";
import { reducer as formReducer } from 'redux-form'
import user from "./reducers/user";
import appReducers from "./reducers/app-reduser";
let reducers = combineReducers({
    news: newsRedus,
    form: formReducer,
    user: user,
    app: appReducers
})

type reducersRootType = typeof  reducers
export type AppStateType = ReturnType<reducersRootType>

let store = createStore(reducers, applyMiddleware(thunk));

export default store