import React from "react";
import {Avatar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux";
import {Redirect} from "react-router";

const useStyles = makeStyles(() => ({
  margin:{
      margin: "auto",
textAlign:"center"
  }

}))


let Start = (props:any) => {
    let classes = useStyles()
   if( !props.user.id) return <Redirect to={"/Login"}/>
    return (<div  >
        <Avatar  className={classes.margin} alt="Cindy Baker" src={props.user.photoURL}/>
            <Typography className={classes.margin} variant="h5" color="inherit" paragraph>
                {props.user.name}
            </Typography>
        </div>
    )

}
let mapStateToProps = (state:AppStateType)=> {
return {
    user: state.user.user
}
}

export default connect(mapStateToProps, {}) (Start)