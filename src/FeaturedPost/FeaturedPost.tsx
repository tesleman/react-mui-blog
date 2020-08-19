import React, {useEffect, useState} from 'react';


import {RouteComponentProps, withRouter} from "react-router";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux";
import {getListThunk} from "../redux/reducers/news-reduser";
import {Button, Grid,} from "@material-ui/core";

import CastomCard from "./Card";


type PathParamsType = {
    listId: string
}
let FeaturedPos: React.FC<RouteComponentProps<PathParamsType> & any> = (props: any) => {

    let [number, setNumber] =useState(2)


    useEffect(() => {
        if(props.match.params.AuthorId){
            props.getListThunk("userId", props.match.params.AuthorId, number)
        }
        if (props.match.params.listId) {
            props.getListThunk("categoriesid" ,props.match.params.listId, number)
        }

    }, [props.match.params, number])

    return (
        <div>
        <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {props.news ? props.news.map((n: any) => (
                   <CastomCard key={n.id}
                               id={n.id}
                               title={n.title}
                               prevue={n.prevue}
                               likes={n.likes}
                               imageSrc={n.imageSrc}
                               user={props.user}
                   />
                )) : ''}


            </Grid>{ props.news.length > 0 ?
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Button disabled={number > props.news.length} onClick={() => setNumber(number + 2)}>More</Button>
            </Grid> : ''}
        </div>
    );
}

let mapStateToProps = (state: AppStateType) => {
    return {
        news: state.news.news,
        categoriesidd: state.news.categoriesid,
        user: state.user.user
    }
}
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {getListThunk}))(FeaturedPos);


