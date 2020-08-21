import React, {useEffect} from "react";
import {
    Avatar, Container,
    createStyles, Grid,
    MenuItem,
    MenuList,
    Paper,
    Theme,
    Typography
} from "@material-ui/core";
import {AppStateType} from "../redux/redux";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import {Redirect, Route, Switch, withRouter} from "react-router";
import Edit from "../Edit/Edit";
import {compose} from "redux";
import {getLiked, getNewsCurrentUserListThunk} from "../redux/reducers/news-reduser";
import {Link} from "react-router-dom";
import CastomCard from "../FeaturedPost/Card";
import Add from "../Add/AddNews";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        MenuItem: {
            textDecoration: 'none',
            color: 'black'
        },
        large: {
            width: 150,
            height: 150,

        },
        toolbarTitle: {
            flex: 1,
            textAlign: "center"
        },
        paper: {
            marginRight: theme.spacing(2),
            marginLeft: -15
        },
        margin:{
            marginLeft: "auto",
            marginRight: "auto",
            textAlign:"center"
        },



    }),
);



let Avatarka:React.FC<any> =(props) => {
    let s = useStyles()

    let classNames = require('classnames');

    let ava = classNames(s.margin, s.large)
    return (<div>

            <Typography
                component="h2"
                variant="h5"
                color="inherit"
                className={s.toolbarTitle}
            >
                {props.user.name  ? props.user.name: "Name"}
            </Typography>

            <Avatar className={ava} alt="Cindy Baker" src={props.user.photoURL}/>
        </div>


    )
}

export let SelfCard: React.FC<any> = (props) => {

    return (<Container>
            <Grid
                container
                justify="center"
                alignItems="center"
            >
                {props.news ? props.news.map((n: any) => (
                    <CastomCard key={n.id} id={n.id}
                                title={n.title}
                                prevue={n.prevue}
                                likes={n.likes}
                                imageSrc={n.imageSrc}
                                user={props.user}
                    />
                )) : ''}
            </Grid>
        </Container>

    )
}

let Profile: React.FC<any> = (props) => {
    let s = useStyles()
    useEffect(() => {
        props.getNewsCurrentUserListThunk(props.user.id)
        props.getLiked(props.user.id)
        getLiked(props.user.id)
    }, [props.user.id])


    return (!props.user.id ? <Redirect to={"/Login"}/> : <Container>

        <Grid
            container
            direction="row"
        >
            <Grid
                item
                md={1}
            >
                <div className={s.root}>
                    <Paper className={s.paper}>
                        <MenuList>
                            <Link to={"/Profile/MyProfile"} className={s.MenuItem}>
                                <MenuItem>My account</MenuItem>
                            </Link>
                            <Link className={s.MenuItem} to={"/Profile/Edit"}>
                                <MenuItem>Edit News</MenuItem>
                            </Link>
                            <Link className={s.MenuItem} to={"/Profile/MyCard"}>
                                <MenuItem>MyCard</MenuItem>
                            </Link>
                            <Link className={s.MenuItem} to={"/Profile/Add"}>
                                <MenuItem>Add</MenuItem>
                            </Link>   <Link className={s.MenuItem} to={"/Profile/LikeCard"}>
                                <MenuItem>Liked</MenuItem>
                            </Link>
                        </MenuList>
                    </Paper>
                </div>
            </Grid>
            <Grid
                item
                md={10}

            >
                <Switch>
                <Route path="/Profile/MyProfile"  render={() => <Avatarka user={props.user}/>}/>
                <Route path="/Profile/Edit" component={Edit}/>
                <Route path="/Profile/MyCard" render={() => <SelfCard user={props.user} news={props.news}/>}/>
                    <Route path="/Profile/LikeCard" render={() => <SelfCard user={props.user} news={props.liked}/>}/>
                <Route exact path="/Profile/Add" component={Add}/>
                </Switch>
            </Grid>

        </Grid>
    </Container>)


}
let mapStateToProps = (state: AppStateType) => {
    return {
        user: state.user.user,
        news: state.news.newsAll,
        liked: state.news.likedNews

    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {getNewsCurrentUserListThunk, getLiked}))(Profile)