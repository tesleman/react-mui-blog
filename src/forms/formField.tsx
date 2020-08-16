import React from "react";
import {WrappedFieldProps} from "redux-form";
import {Select, TextField} from "@material-ui/core";


export  type renderFieldType = {
    label: string
    type: string
    placeholder: string,
    defaultValue:any
}




export const renderField: React.FC<WrappedFieldProps & renderFieldType> = ({

                                                                               input,
                                                                               label,
                                                                               type,
                                                                               meta: {touched, error},
                                                                               ...props
                                                                           }) => (
    <div>
        <label>{label}</label>
        <div>

            <TextField style={{padding: 8.5}} variant="outlined" {...props}{...input} placeholder={label} type={type}/>
            {touched &&
            (error &&
                <span>{error}</span>)}
        </div>
    </div>

)
export const renderFieldFullWidth: React.FC<WrappedFieldProps & renderFieldType> = ({

                                                                               input,
                                                                               label,
                                                                               type,
                                                                               meta: {touched, error},
                                                                               ...props
                                                                           }) => (
    <div>
        <label>{label}</label>
        <div>
            <TextField fullWidth  variant="outlined" {...props}{...input} placeholder={label} type={type}/>
            {touched &&
            (error &&
                <span>{error}</span>)}
        </div>
    </div>

)

export const renderFieldSelect: React.FC<WrappedFieldProps & renderFieldType> = ({

                                                                                     input,
                                                                                     label,
                                                                                     type,
                                                                                     meta: {touched, error},
                                                                                     ...props
                                                                                 }) => (
    <div>
        <label>{label}</label>
        <div>
            <Select  {...props}{...input} placeholder={label} type={type}/>
            {
            error && <span>{error}</span>}
        </div>
    </div>

)

export type GetStringKeys<T> = Extract<keyof T, string>