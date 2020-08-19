import React from "react";
import {Avatar, Grid, Paper} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux";
import {deleteCommentThunk} from "../redux/reducers/news-reduser";

let Comment: React.FC<any> = (props) => {


    let deleted = () => {
        props.deleteCommentThunk(props.newsId, props.id, props.limit)
    }
    return (<div
        style={{
            margin: 5,
            textAlign: "center"
        }}
    >
        <Grid item md={5}>
            <Paper elevation={5}>
                {props.author.userId == props.user.id ? <div style={{
                    float: "right",
                    cursor: "pointer"
                }}>
                    <DeleteIcon onClick={deleted}/>
                </div> : ''}
                <Grid


                    item md={12}>
                    {props.author ? <Avatar style={{
                        marginLeft: "auto",
                        marginRight: "46%"
                    }} alt="Cindy Baker" src={props.author.photo}/> : ""}
                    <div style={{
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>
                        {props.author ? props.author.name : ""}

                        <br/>
                        {props.body}
                        <br/>
                        {props.data}
                    </div>

                </Grid>

            </Paper>

        </Grid>

    </div>)
}


let mapStateToProps = (state: AppStateType) => {
    return {

        user: state.user.user
    }
}
export default connect(mapStateToProps, {deleteCommentThunk})(Comment)