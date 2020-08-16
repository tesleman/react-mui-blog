import React, {useEffect} from 'react';


import {RouteComponentProps, withRouter} from "react-router";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {AppStateType} from "../redux/redux";
import {getListThunk} from "../redux/reducers/news-reduser";
import {Grid,} from "@material-ui/core";

import CastomCard from "./Card";


type PathParamsType = {
    listId: string
}
let FeaturedPos: React.FC<RouteComponentProps<PathParamsType> & any> = (props: any) => {

    useEffect(() => {
        props.getListThunk(props.match.params.listId)
        // console.log(props.params)
    }, [props.match.params])

    return (<Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {props.news ? props.news.map((n: any) => (
                   <CastomCard key={n.id} id={n.id}
                               title={n.title}
                               prevue={n.prevue}
                               likes={n.likes}
                               imageSrc={n.imageSrc}/>
                )) : ''}
            </Grid>

    );
}

let mapStateToProps = (state: AppStateType) => {
    return {
        news: state.news.news,
        categoriesidd: state.news.categoriesid,
    }
}
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {getListThunk}))(FeaturedPos);


