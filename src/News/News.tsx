import React, {useEffect, useState} from "react";
import {RouteComponentProps, withRouter} from "react-router";
import {AppStateType} from "../redux/redux";
import {compose} from "redux";
import {connect} from "react-redux";
import {getListThunk, getNewsThunk, Likes} from "../redux/reducers/news-reduser";
import {makeStyles} from "@material-ui/core/styles";
import {Badge, Grid, Link, Paper, Typography} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {CSSTransition, SwitchTransition} from "react-transition-group";

type PathParamsType = {
    id: string
}
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

let News: React.FC<RouteComponentProps<PathParamsType> & any> = (props) => {
    let classes = useStyles()
    const [inProp, setInProp] = useState(false);
    const [likeUpd, setLikeUpd] = useState('');
    useEffect(() => {
        props.getNewsThunk(props.match.params.id)
        // console.log(props)
        setInProp(true)
    }, [likeUpd])
 // console.log(props)
    let likes = (add: any) => {
        props.Likes(props.singleNews.id, props.user.id, add)
        setLikeUpd(props.singleNews.likes)
    }
    // console.log(props.singleNews)
    // console.log(props.user)
    //  console.log(props.match)
    return (

        // <CSSTransition mode={"in-out"} in={inProp} timeout={200} classNames="my-node">
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
                                {props.singleNews.likes ? (props.singleNews.likes.find((i: string) => i == props.user.id) ?
                                    <Badge style={{cursor: "pointer"}} onClick={() => {
                                        likes(false)
                                    }} badgeContent={props.singleNews.likes.length} color="primary">
                                        <FavoriteIcon/>
                                    </Badge> : <Badge style={{cursor: "pointer"}} onClick={() => likes(true)}
                                                      badgeContent={props.singleNews.likes.length}
                                                      color="primary"><FavoriteBorderIcon/> </Badge>) : ''}
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

            </div>
        // </CSSTransition>


    )

}


let mapStateToProps = (state: AppStateType) => {
    return {
        singleNews: state.news.singleNews,
        user: state.user.user
    }
}
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {getListThunk, getNewsThunk, Likes}))(News);
