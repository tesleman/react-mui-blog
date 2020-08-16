import React, {useEffect, useState} from "react";
import {
    Button,
    createStyles,
    FormControl,
    MenuItem,
    Select,
    TextareaAutosize,
    TextField,
    Theme, withStyles,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {Redirect, RouteComponentProps} from "react-router";
import {AppStateType} from "../redux/redux";
import {AddNews} from "../redux/reducers/news-reduser";
import {Simulate} from "react-dom/test-utils";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: "column",
            flexBasis: 200,
            width: 250,
            marginLeft: "auto",
            marginRight: "auto",
        },
        margin: {
            margin: 5,
        },
        float: {
            left: "auto"
        }
    }),
);

const ValidationTextField = withStyles({
    root: {
        '& input:valid + fieldset': {
            borderColor: 'green',
            borderWidth: 2,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
            borderLeftWidth: 6,
            padding: '4px !important', // override inline-style
        },
        margin: 0,
    },
})(TextField);

let Add: React.FC<RouteComponentProps<any>> = (props: any) => {
    let style = useStyles()
    let [select, setSelect] = useState('')
    let [title, setTitle] = useState('')
    let [textarea, setTextarea] = useState('')
    let [src, setSrc] = useState('')
    let [file, setFile] = useState(null)


    useEffect(() => {
        if (props.categories.length > 0)
            setSelect(props.categories[0].id)
    }, [props.categories.length])

    let handleSelectChangeCategory = (value: any) => {
        setSelect(value)
    }
    let handleFileChange = (event: any) => {
        const fileUploaded = event.target.files[0];
        setFile(fileUploaded)
        if (src !== null) {
            let reader = new FileReader();
            reader.readAsDataURL(fileUploaded)
            reader.onload = (e) => {
                // @ts-ignore
                setSrc(e.target.result)

            }
        }


    };

    let handleSubmit = () => {
        let formData = {
            categoriesid: select,
            title: title,
            prevue: textarea,
            likes: []
        }
        props.AddNews(formData, file)
    }
    let clearImg = () => {
        setSrc("")
        setFile(null)
    }
    let clear = () => {
        setSelect('')
        setTitle('')
        setTextarea('')
    }


    let classNames = require('classnames');
    let margin = classNames(style.float, style.margin);

    return (!props.user.id ? <Redirect to={"/Login"}/> : <form onSubmit={event => {
            event.preventDefault()
            handleSubmit()
            clear()
        }
        } className={style.root}>

            <FormControl>
                <Select
                    className={margin}
                    defaultValue={select}
                    value={select}
                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        handleSelectChangeCategory(event.target.value)
                    }}
                    name="categoriesid">
                    {props.categories.map((n: { id: string; Title: string; }) => <MenuItem key={n.id}
                                                                                           value={n.id}>{n.Title}</MenuItem>
                    )}
                </Select>

            </FormControl>
            <ValidationTextField
                required
                variant="outlined"
                id="validation-outlined-input"
                className={margin}
                label="Title"
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <TextareaAutosize
                className={margin}
                value={textarea}
                onChange={event => setTextarea(event.target.value)}
                ria-label="minimum height" rowsMin={2}
                placeholder="Annotation"/>
            {!src ? <Button
                variant="contained"
                component="label"
                className={margin}
            >
                Upload File
                <input
                    type="file"
                    style={{display: "none"}}
                    onChange={handleFileChange}
                />
            </Button> : <div><img src={src} alt='#'/> <Button onClick={clearImg}>Clear</Button></div>}

            <Button disabled={!title} type="submit" variant="contained"> submit</Button>

        </form>
    )
}

let mapStateTooProps = (state: AppStateType) => {
    return {
        categories: state.news.newsCategoryList,
        user: state.user.user
    }
}

export default connect(mapStateTooProps, {AddNews})(Add)