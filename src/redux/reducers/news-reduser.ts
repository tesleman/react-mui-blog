import {f1, get, getList, getNewsCurrentUserList, getNewses, liked, likes, updateNewses} from "../../api";


let GET_NEWS_CATEGORIES_LIST = "GET_NEWS_CATEGORIES_LIST"
let GET_NEWS = "GET_NEWS"
let SET_CURENT_ID = "SET_CURENT_ID"
let GET_SINGLE_NEWS = "GET_SINGLE_NEWS"
let GET_ALL_NEWS = "GET_ALL_NEWS"
let GET_LIKED_NEWS = "GET_LIKED_NEWS"


export type newsCategoryListType = {
    id: string
    Title: string

}

type newsType = {
    id: any
    title: string
    categoriesid: string
    prevue: string
    likes: Array<string>
}
let initialState = {
    newsCategoryList: [] as Array<newsCategoryListType>,
    news: [] as Array<newsType>,
    categoriesid: '' as string,
    singleNews: [] as Array<newsType>,
    newsAll: [] as Array<newsType>,
    likedNews: [] as Array<newsType>
}

const newsRedus = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_NEWS_CATEGORIES_LIST:
            return {
                ...state,
                newsCategoryList: action.newsCategoryList
            }
        case GET_NEWS:
            return {
                ...state,
                news: action.news
            }
        case GET_ALL_NEWS:
            return {
                ...state,
                newsAll: action.newsAll
            }
        case SET_CURENT_ID:
            return {
                ...state,
                categoriesid: action.categoriesid
            }
        case GET_SINGLE_NEWS:
            return {
                ...state,
                singleNews: action.singleNews
            }
        case GET_LIKED_NEWS:
            return {
                ...state,
                likedNews: action.likedNews
            }
        default:
            return state
    }
}

type newsCategoryListReduserType = {
    type: typeof GET_NEWS_CATEGORIES_LIST,
    newsCategoryList: newsCategoryListType

}

export let newsCategoryList = (newsCategoryList: newsCategoryListType): newsCategoryListReduserType => ({
    type: GET_NEWS_CATEGORIES_LIST,
    newsCategoryList
})


type getNewsType = {
    type: typeof GET_NEWS
    news: newsType
}

export let getNews = (news: newsType): getNewsType => ({type: GET_NEWS, news})

type getLikedNewstype = {
    type: typeof GET_LIKED_NEWS
    likedNews: Array<newsType>
}
export let getLikedNews = (likedNews: any): getLikedNewstype => ({type: GET_LIKED_NEWS, likedNews})

type getAllNewstype = {
    type: typeof GET_ALL_NEWS
    newsAll: Array<newsType>
}
export let getAllNews = (newsAll: Array<newsType>): getAllNewstype => ({type: GET_ALL_NEWS, newsAll})

type categoriesidType = {
    type: typeof SET_CURENT_ID
    categoriesid: string
}

export let categoriesid = (categoriesid: string): categoriesidType => ({type: SET_CURENT_ID, categoriesid})

type singleNewsType = {
    type: typeof GET_SINGLE_NEWS
    singleNews: newsType
}

export let singleNews = (singleNews: any): singleNewsType => ({type: GET_SINGLE_NEWS, singleNews})


export let getNewsCategoryListThunk = () => (dispatch: any) => {
    get("categories_list")
        .then((res) => {
            // console.log(res)
            dispatch(newsCategoryList(res))
        })
}

export let getListThunk = (categoryId: any) => (dispatch: any) => {
    getList("News", categoryId)
        .then(res => dispatch(getNews(res)))
}

export let getNewsThunk = (newsNameId: any) => (dispatch: any) => {
    getNewses("News", newsNameId)
        .then(res => (
            // console.log(res),
            dispatch(singleNews(res)))
        )
}
export let getNewsCurrentUserListThunk = (CurrentUserId: any) => (dispatch: any) => {
    getNewsCurrentUserList(CurrentUserId)
        .then(res => (
            // console.log(res),
            dispatch(getAllNews(res)))
        )
}
export let getNewsAllListThunk = () => (dispatch: any) => {
    get("News",)
        .then(res => (
            // console.log(res),
            dispatch(getAllNews(res))))
}

export let updateNewsThunk = (newsNameId: any, data: any, imgSrc: any) => () => {
    console.log("Thunk", data)
    console.log("Thunk", newsNameId)
    console.log("Thunk", imgSrc)
    updateNewses("News", newsNameId, data, imgSrc)
        .then((res) => {
                // console.log(res)
                console.log("ThunkSucces")
            }
        )
}

export let Likes = (doc: any, arrayUnion: any, add: any) => (dispatch: any) => {
    likes("News", doc, arrayUnion, add)
    getNewsThunk(doc)
}
export let AddNews = (d: any, imgSrc: any) => (dispatch: any) => {
    f1(d, imgSrc).then(r => console.log(r))

}

export let getLiked = (uid: any) => (dispatch: any) => {
    liked(uid).then((r: any) => {
            dispatch(getLikedNews(r))

        }
    )
}

export default newsRedus

