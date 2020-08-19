import React from 'react';
import {Typography, IconButton, Button, Toolbar, Divider, Avatar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux";
import {logoutThunk} from "../redux/reducers/user";


const useStyles = makeStyles((theme: any) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
        textDecoration: "none"
    },
    isActive:{
        backgroundColor: "purple"
    }
}));
type RouteProps = {
    listId: string
}



const Header: React.FC<RouteComponentProps<RouteProps>& any> = (props) => {
    const classes = useStyles();
 // console.log(props.user)
// let some = () =>{
//     props.history.push("/")
// }
    return (
        <React.Fragment>
            <Toolbar>
                {props.user.id ? <Link to={"/Profile/MyProfile"}>
                    <IconButton>
                        <Avatar alt="Cindy Baker" src={props.user.photoURL}/>
                    </IconButton>
                </Link> : ""}
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    {props.user.name}
                </Typography>


                    {props.user.id ? <div> <Link style={{textDecoration: "none"}} to={"/Login"}>
                  <div>  <Button onClick={props.logoutThunk} variant="outlined" size="small">
                        Sign out
                    </Button></div>
                </Link></div>   : <Link style={{textDecoration: "none"}} to={"/Login"}>
                    <Button variant="outlined" size="small">
                        Sign up
                    </Button>
                </Link>}
            </Toolbar>
            <Divider />
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                {props.newsCategoryList.map((m: any) => (
                    <Link
                        key={m.id}
                        to={"/" + m.id}
                        className={classes.toolbarLink}
                    >
                    <Button  >   {m.Title}</Button>
                    </Link>))
                }
            </Toolbar>
        </React.Fragment>
    );
}


let mapStateToProps = (state:AppStateType) =>{
  return   {
      user: state.user.user
  }
}

export default connect(mapStateToProps, {logoutThunk})(Header)