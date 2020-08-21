import React, {useEffect} from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux";
import {Button, Grid} from "@material-ui/core";

import {InjectedFormProps, reduxForm, Field} from "redux-form";
import {renderField, renderFieldFullWidth} from "../forms/formField";
import {email, minValue, required} from "../validation/validators";
import {registrationThunk} from "../redux/reducers/user";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
import {useSnackbar} from "notistack";


type FormType = {
    Email: string
    Password: any
    Name: string
}

let minLenght = minValue(6)
let RegistrationFields: React.FC<InjectedFormProps<FormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit} style={{marginTop: 20}}>
            <Grid item xs={6}>
                <Field
                    label="email"
                    id="email"
                    name="email"
                    type="email"
                    component={renderFieldFullWidth}
                    validate={[required, email]}
                />
            </Grid>
            <Grid item xs={6}>
                <Field
                    validate={[required, minLenght]}
                    name="password"
                    label="Password"
                    type="password"
                    component={renderFieldFullWidth}

                />
            </Grid>

            <Grid item xs={6}>
                <Field
                    validate={[required]}
                    name="name"
                    label="name"
                    type="text"
                    component={renderField}

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
                    >
                        Sign Up
                    </Button>

                </Grid>
                <Grid item xs={2}>
                    <Link style={{color: "black", textDecoration: "none", marginLeft:15}} to={"/Login"}>
                        Login
                    </Link>
                </Grid>
            </Grid>
        </form>
    )

}


let EditForm = reduxForm<FormType>({form: 'edit',})(RegistrationFields)


let Registration: React.FC<any> = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    useEffect(()=>{
        if(props.error)
            enqueueSnackbar(props.error)
    }, [props.error])

    let sub = (formData: any) => {
        props.registrationThunk(formData.email, formData.password, formData.name)
    }

    return (props.user.id ? <Redirect to="/"/> : <div>
            <EditForm {...props} onSubmit={sub}/>

        </div>

    )

}


let mapStateToProps = (state: AppStateType) => {
    return {
        user: state.user.user,
        error: state.user.error
    }
}

export default connect(mapStateToProps, {registrationThunk})(Registration)