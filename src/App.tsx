import React, {useContext, useEffect, useRef, useState} from 'react';
import './App.css';
import Header from "./Header/Header";
import {CircularProgress, Container, Grid} from "@material-ui/core";
import {connect} from "react-redux";
import {categoriesid, getNewsCategoryListThunk, newsCategoryListType} from "./redux/reducers/news-reduser";
import {AppStateType} from "./redux/redux";
import {__RouterContext, Route, RouteComponentProps, Switch, withRouter} from "react-router";
import {compose} from "redux";
import FeaturedPos from "./FeaturedPost/FeaturedPost";
import News from "./News/News";
import Footer from "./Footer/Footer";
import Login from "./Auth/Login";
import {currentUserThunk, getCurrentUserThunk} from "./redux/reducers/user";
import {useTransition, animated} from "react-spring";
import Start from "./StartPage/Statrt";
import Profile from "./Profile/Profile";
import Registration from "./Auth/Registration";



type RouteProps = {
    listId: string
    id:string
}


function useRouter() {
    return useContext(__RouterContext)
}

const Main: React.FC<RouteComponentProps<RouteProps> & any> = (props) => {

    const {location}= useRouter()
    // @ts-ignore
    const transitions:any = useTransition(location, (location:{key:string}) => location.key, {
        from: {
            opacity: 0,
            position: 'absolute',
            width: '100%',
            transform: `translate3d(100%, 0, 0)`,
            transition:  400
        },
        enter: {

            position: 'relative',
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
            transition:  400
        },
        leave: {
            position: 'absolute',
            opacity: 0,
            transform: `translate3d(-50%, 0, 0)`,
            transition:  400
        }
    })

    if(props.loading) {
        return <CircularProgress disableShrink/>
    }
    // @ts-ignore
    return transitions.map(({item, props: transition, key}) => (
        <animated.div key={key} style={transition}>
            <Switch location={item}>
                <Route exact path="/" component={Start}/>
                <Route exact path="/Login" component={Login}/>
                <Route exact path="/Registration" component={Registration}/>
                <Route path="/news/:id/" component={News}/>
                <Route path="/:listId/" component={FeaturedPos}/>
            </Switch>
        </animated.div>
    ))
}


let App: React.FC<RouteComponentProps<RouteProps> & propsType> = (props) => {

    useEffect(() => {
        props.getNewsCategoryListThunk()
         props.getCurrentUserThunk()
    }, [])

    if(props.loading) {
        return <CircularProgress disableShrink/>
    }
        return (<Container>
            <Header
                {...props}
            />
            <Main {...props}/>

            <Route   path="/Profile" component={Profile}/>

            <Footer title={'Footer!'}
                    description={'Something here to give the footer a purpose'}
            />
        </Container>);

}

type propsType = mapStateToPropsType & mapDispatchToPropsType

type mapStateToPropsType = {
    newsCategoryList: Array<newsCategoryListType>
    categoriesidd: string
    loading: boolean
}
type mapDispatchToPropsType = {
    getNewsCategoryListThunk: () => void
    categoriesid: (categoriesid: any) => void
    getCurrentUserThunk: () => void
    initializeThunk: () => void
    currentUserThunk: () => void

}
let mapStateToProps = (state: AppStateType) => ({
    newsCategoryList: state.news.newsCategoryList,
    categoriesidd: state.news.categoriesid,
    loading: state.user.loading,

})
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {getNewsCategoryListThunk, categoriesid, currentUserThunk,getCurrentUserThunk}))(App);
