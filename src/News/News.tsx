import React, {useCallback, useEffect, useState} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {AppStateType} from "../redux/redux";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    getCommentThunk,
    getListThunk,
    getNewsThunk,
    Likes,
    setCommentThunk
} from "../redux/reducers/news-reduser";
import {makeStyles} from "@material-ui/core/styles";
import {
    Avatar,
    Badge,
    Button,
    Grid,
    IconButton,
    Paper,
    TextareaAutosize,
    Typography
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {getAuthor, getAuthorsThunk} from "../redux/reducers/user";
import {NavLink} from "react-router-dom";

import Comment from "./CommentItem";


const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        marginTop: 20
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
}));

let News: React.FC<RouteComponentProps<any> & any> = (props) => {
    let classes = useStyles()
    const [limit, setLikeUpd] = useState(2);
    const [commentState, setCommentState] = useState('');

    let memo = useCallback(() => props.getAuthorsThunk(), [props.authorsstate.length])

    useEffect(() => {
        memo()
    }, [])



    useEffect(() => {
        props.getCommentThunk(props.match.params.id, limit)
    }, [props.singleNews.id, limit, props.comment.length])

    useEffect(() => {
        props.getNewsThunk(props.match.params.id)
        console.log(props.singleNews)
    }, [props.match.params.id])

    useEffect(() => {
        if (props.singleNews.userId)
            props.getAuthor(props.singleNews.userId)
    }, [props.singleNews.userId])

    let onHandleSubmit = () => {
        let date = new Date()
        let data = {
            body: commentState,
            userId: props.user.id,
            data: date.toLocaleString(),
        }
        props.setCommentThunk(props.singleNews.id, data)
        setCommentState('')
    }
    let likes = (add: any) => {
        if(props.user.id) {
            props.Likes(props.singleNews.id, props.user.id, add)
        }
    }


    return (
        <div>
            <Paper className={classes.mainFeaturedPost}>
                <div className={classes.overlay}/>
                <Grid container>
                    <Grid item md={6}>
                        <div className={classes.mainFeaturedPostContent}>
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                {props.singleNews.title}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                {props.singleNews.prevue}
                            </Typography>

                            {props.singleNews.likes ? (props.singleNews.likes.some((i: string) => i === props.user.id) ?
                                <Badge style={{cursor: "pointer"}} onClick={() => likes(false)}
                                       badgeContent={props.singleNews.likes.length} color="primary">
                                    <FavoriteIcon/>
                                </Badge> : <Badge style={{cursor: "pointer"}} onClick={() => likes(true)}
                                                  badgeContent={props.singleNews.likes.length}
                                                  color="primary"><FavoriteBorderIcon/>
                                </Badge>) : ""}

                        </div>
                    </Grid>

                    <Grid
                        item md={1}
                        style={{
                            marginLeft: "auto",
                            marginTop: "auto"
                        }}>

                        <NavLink to={"/AuthorNews/" + props.author.userId}>
                            <IconButton>
                                <Avatar alt="Cindy Baker" src={props.author.photo}/>
                            </IconButton>
                        </NavLink>
                        <Typography  variant="subtitle2" color="inherit" paragraph>
                            {props.author.name}
                        </Typography>

                    </Grid>

                </Grid>


            </Paper>
            {props.user.id ? <form onSubmit={
                (event) => {
                    event.preventDefault()
                    onHandleSubmit()
                }
            }>
                <Grid item md={5}>
                    <Grid item md={5}>
                        <TextareaAutosize value={commentState} onChange={((event) => setCommentState(event.target.value))}
                                          aria-label="empty textarea" rowsMin={3} placeholder="Empty"/>
                    </Grid>
                    <Grid item md={5}>
                        <Button disabled={!commentState} type={"submit"}> Submit</Button>


                    </Grid>
                </Grid>
            </form> : ""}
            {props.comment && props.authorsstate ? props.comment.map((r: any) => (
                <Comment
                    newsId={props.match.params.id}
                    limit={limit}
                    authorId={r.userId}
                    body={r.body}
                    data={r.data}
                    id={r.id}
                    key={r.data}
                    author={props.authorsstate.find((i: any) => i.userId == r.userId)}
                />
            )) : ""}

            <Button disabled={limit > props.comment.length} onClick={() => setLikeUpd(limit + 1)}>More</Button>
        </div>


    )

}


let mapStateToProps = (state: AppStateType) => {
    return {
        singleNews: state.news.singleNews,
        user: state.user.user,
        author: state.user.author,
        comment: state.news.comments,
        authorsstate: state.user.authorsstate,
        loading: state.news.loading
    }
}
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {
        getListThunk,
        getNewsThunk,
        Likes,
        getAuthor,
        getCommentThunk,
        setCommentThunk,
        getAuthorsThunk,

    }))(News);
