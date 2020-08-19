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


export type newsCategoryListType = {
    id: string
    Title: string

}

type comment = {
    body: string
    userId: string
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
    likedNews: [] as Array<newsType>,
    success: false,
    comments: [] as Array<comment>,
    loading:false
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
            return  Object.assign({}, state, {
                comments: [
                    action.comments,
                    ...state.comments,


                ]
            })
        case DELL_COMMENT:
            return {
                ...state,
                ...state.comments.filter((item:any) => !action.commentId.includes(item.id))
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

export let getComments = (comments: any) => ({type: COMMENT, comments})

export let setLoading = (loading: boolean) => ({type: LOADING, loading})

export let setComments = (comments: any) => ({type: SET_COMMENT, comments})

export let deleteComments = (commentId: any) => ({type: SET_COMMENT, commentId})

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

export let  getNewsThunk = (newsNameId: any) =>  (dispatch: any) => {
   getNewses("News", newsNameId)
        .then(res => (
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
            dispatch(getAllNews(res))))
}

export let updateNewsThunk = (newsNameId: any, data: any, imgSrc: any) => () => {
    updateNewses("News", newsNameId, data, imgSrc)
        .then(() => {
                console.log("ThunkSucces")
            }
        )
}

export let Likes =  (doc: any, arrayUnion: any, add: any) => async  (dispatch: any) => {

   await likes("News", doc, arrayUnion, add)
        dispatch(getNewsThunk(doc)


)
}
export let AddNews = (news: any, imgSrc: any) => (dispatch: any) => {
    addNews(news, imgSrc).then(r => {
        dispatch(setSuccess())
        console.log(r)

    })

}

export let getLiked = (uid: any) => (dispatch: any) => {
    liked(uid).then((r: any) => {
            dispatch(getLikedNews(r))

        }
    )
}
export let getCommentThunk = (newsId: any , limit:number) => (dispatch: any) => {
    comment(newsId, limit).then(r =>
        dispatch(getComments(r)),
    )
}

export let setCommentThunk = (newsId: any, data: any) => (dispatch: any) => {
    setComment(newsId, data).then(() => {
            dispatch(setComments(data))
        }
    )
}
export let deleteCommentThunk = (newsId: any, commentId: any , limit: number) => (dispatch: any) => {

    deleteComment(newsId, commentId).then(r => {
            console.log(r, "respons")
        // dispatch(deleteComments(commentId))
        dispatch(getCommentThunk(newsId , limit))
        }
    )
}


export default newsRedus

