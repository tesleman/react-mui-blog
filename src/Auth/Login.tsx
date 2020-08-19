import React, {useState} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux";
import {loginThunk} from "../redux/reducers/user";
import {Button, Grid, TextField} from "@material-ui/core";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";







let Login = (props: any) => {
 let  [login, setLogin] = useState('')
 let  [password, setPassword] = useState('')
    let sub = (login: any, password:any) => {
        props.loginThunk(login, password)
    }



        return (
            props.user.id ? <Redirect to="/"/> : <form onSubmit={(event => {
                event.preventDefault()
                sub(login, password)
            })} style={{marginTop: 20}}>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(event) => {
                            setLogin(event.target.value)
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                </Grid>
                <Grid
                container
                direction="row"
                >
                <Grid item xs={2}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={props.loading}
                    >
                        Sign Up
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Link style={{color: "black", textDecoration: "none",  marginLeft:15}} to={"/Registration"}>
                        Registration
                    </Link>
                </Grid>
                    </Grid>
            </form>
        )

}

let mapStateToProps = (state: AppStateType) => {
    return {
        user: state.user.user,
        loading: state.user.loadingAuth
    }
}

export default connect(mapStateToProps, {loginThunk})(Login)