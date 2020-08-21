import {
    addNews,
    get,
    getList,
    getNewsCurrentUserList,
    getNewses,
    liked,
    likes,
    updateNewses,
    comment,
    setComment, deleteComment
} from "../../api";
import {setAuthUserError, setLoadingAuth} from "./user";


let GET_NEWS_CATEGORIES_LIST = "GET_NEWS_CATEGORIES_LIST"
let GET_NEWS = "GET_NEWS"
let SET_CURENT_ID = "SET_CURENT_ID"
let GET_SINGLE_NEWS = "GET_SINGLE_NEWS"
let GET_ALL_NEWS = "GET_ALL_NEWS"
let GET_LIKED_NEWS = "GET_LIKED_NEWS"
let SUCCESS = "SUCCESS"
let COMMENT = "COMMENT"
let SET_COMMENT = "SET_COMMENT"
let LOADING = "LOADING"
let DELL_COMMENT = "DELL_COMMENT"
let DELL_LIKE = "DELL_LIKE"
let LIKE = "LIKE"


export type newsCategoryListType = {
    id: string
    Title: string

}

type comment = {
    body: string
    userId: string
    commentId: string
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
    singleNews: {} as newsType,
    newsAll: [] as Array<newsType>,
    likedNews: [] as Array<newsType>,
    success: false,
    comments: [] as Array<comment>,
    loading: false
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
        case SUCCESS:
            return {
                ...state,
                success: true
            }
        case COMMENT:
            return {
                ...state,
                comments: action.comments
            }

        case LOADING:
            return {
                ...state,
                loading: action.loading
            }

        case SET_COMMENT:
            return Object.assign({}, state, {
                comments: [
                    action.comments,
                    ...state.comments,
                ]
            })

        case DELL_COMMENT:
            return {
                ...state,
                comments: state.comments.filter((item: any) => item.id !== action.payloadId)
            }
        //
        case DELL_LIKE:
            let arr = state.singleNews.likes.filter((item:any )=> item !== action.payloadId)
         return {
                ...state,
            singleNews: {
                ...state.singleNews,
                likes: arr

                ,

            }
         }

        case LIKE:
            return {
                ...state,
                singleNews: {
                    ...state.singleNews,
                    likes: state.singleNews.likes.concat(action.like)

                }
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
    newsCategoryList: newsCategoryList
})


type getNewsType = {
    type: typeof GET_NEWS
    news: newsType
}

export let getNews = (news: newsType): getNewsType => ({type: GET_NEWS, news})

export let getComments = (comments: any) => ({type: COMMENT, comments})

export let setLoading = (loading: boolean) => ({type: LOADING, loading})

export let setComments = (comments: any) => ({type: SET_COMMENT, comments})

export let setLike = (like: any) => ({type: LIKE, like})

export let deleteComments = (payloadId: any) => ({type: DELL_COMMENT, payloadId})

export let deleteLike = (payloadId: any) => ({type: DELL_LIKE, payloadId})

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


export let setSuccess = () => ({type: SUCCESS})


export let getNewsCategoryListThunk = () => (dispatch: any) => {
    get("categories_list")
        .then((res) => {
            dispatch(newsCategoryList(res))
        })
}

export let getListThunk = (whereId: any, categoryId: any, limit: number) => (dispatch: any) => {
    getList(whereId, "News", categoryId, limit)
        .then(res => dispatch(getNews(res)))
}

export let getNewsThunk = (newsNameId: any) => (dispatch: any) => {
    getNewses("News", newsNameId)
        .then(res => (
            dispatch(singleNews(res)))
        )
}
export let getNewsCurrentUserListThunk = (CurrentUserId: any) => (dispatch: any) => {
    getNewsCurrentUserList(CurrentUserId)
        .then(res => (dispatch(getAllNews(res))))
}
export let getNewsAllListThunk = () => (dispatch: any) => {
    get("News",)
        .then(res => (
            dispatch(getAllNews(res))))
}

export let updateNewsThunk = (newsNameId: any, data: any, imgSrc: any, CurrentUserId: any) => async (dispatch: any) => {
    try {
        dispatch(setLoadingAuth(true))
        await updateNewses("News", newsNameId, data, imgSrc)
            .then(() => {
                    dispatch(setLoadingAuth(false))
                    getNewsCurrentUserList(CurrentUserId)
                        .then(res => (dispatch(getAllNews(res))))
                }
            )
    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }
}

export let Likes = (doc: any, arrayUnion: any, add: any) => async (dispatch: any) => {
    try {
        await likes("News", doc, arrayUnion, add)
        if(add == true) {
            dispatch(setLike(arrayUnion))
        }else{
            dispatch(deleteLike(arrayUnion))
        }
    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }
}
export let AddNews = (news: any, imgSrc: any) => async (dispatch: any) => {
    try {
        await addNews(news, imgSrc).then(() => {
            dispatch(setSuccess())
        })
    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }

}

export let getLiked = (uid: any) => async (dispatch: any) => {
    try {
        await liked(uid).then((r: any) => {
            dispatch(getLikedNews(r))
        })
    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }
}
export let getCommentThunk = (newsId: any, limit: number) => async (dispatch: any) => {
    try {
        await comment(newsId, limit).then(r =>
            dispatch(getComments(r)))
    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }
}

export let setCommentThunk = (newsId: any, data: any) => async (dispatch: any) => {
    try {
        await setComment(newsId, data)
            .then(() => {
                dispatch(setComments(data))
            })
    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }
}
export let deleteCommentThunk = (newsId: any, commentId: any) => async (dispatch: any) => {
    try {
        await deleteComment(newsId, commentId).then(() => {
            dispatch(deleteComments(commentId))
        })
    } catch (e) {
        dispatch(setAuthUserError(e.message))
        dispatch(setAuthUserError(""))
        dispatch(setLoadingAuth(false))
    }
}
export default newsRedus

