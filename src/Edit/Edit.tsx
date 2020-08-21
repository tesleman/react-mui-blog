import React, {useEffect, useState} from "react";
import {InjectedFormProps, reduxForm, Field} from "redux-form";
import {compose} from "redux";
import { withRouter} from "react-router";
import {connect} from "react-redux";
import {
    getNewsCategoryListThunk,
    newsCategoryListType, updateNewsThunk
} from "../redux/reducers/news-reduser";
import {AppStateType} from "../redux/redux";
import {Button, FormControl, MenuItem, Select} from "@material-ui/core";
import {renderField, renderFieldSelect} from "../forms/formField";


export type FieldValidatorType = (value: string) => string | undefined

export const reqaer: FieldValidatorType = (value) =>
    value ? undefined : "require"

type FormType = {
    title: string
    prevue: string
    categoriesid: string

}
let EditFormForm: React.FC<InjectedFormProps<FormType, mapStateToPropsType> & mapStateToPropsType> = ({
                                                                                                          handleSubmit,
                                                                                                          newsAll,
                                                                                                          categories,
                                                                                                          getNewsCategoryListThunk,
                                                                                                          selectedIdValue,
                                                                                                          src,
                                                                                                          handleFileChange,
                                                                                                          clearImg,
                                                                                                          initialize,
                                                                                                          setSrc,
                                                                                                          loading

                                                                                                      }) => {

    let [selectedId, setTtt]: any = useState('')
    let [selectedNewsState, setSelectedNews]: any = useState([])
    const handleChange = (event: any) => {
        setTtt(event.target.value);
        selectedIdValue(event.target.value)
    };
    let selectedNews = (ttt: any) => {
        let ss = newsAll.find((n: any) => n.id == ttt)
        setSelectedNews(ss)
    }
    useEffect(() => {
        selectedNews(selectedId)
        getNewsCategoryListThunk()
        if (selectedNewsState) {
            initialize({
                title: selectedNewsState.title,
                prevue: selectedNewsState.prevue,
                categoriesid: selectedNewsState.categoriesid
            })

            setSrc(selectedNewsState.imageSrc)

        }
    }, [selectedId, selectedNewsState])




    return (<form style={{marginLeft: 10}} onSubmit={handleSubmit}>
            <FormControl>
                <Select
                    value={selectedId}
                    onChange={handleChange} name="select">
                    {newsAll.map((n: { id: string; title: string; }) => <MenuItem key={n.id}
                                                                                  value={n.id}>{n.title}</MenuItem>
                    )}
                </Select>
            </FormControl>
            {selectedNewsState ? <div>
                    <Field
                        name="title"
                        label="title"
                        component={renderField}
                        type="text"
                    />
                    <Field

                        name="prevue"
                        label="prevue"
                        component={renderField}
                        type="text"
                    />
                </div>
                : ''}
            <div>
                {selectedId ?
                    <FormControl>
                        <Field
                            validate={[reqaer]}
                            component={renderFieldSelect}
                            name="categoriesid">
                            {categories.map((n: { id: string, Title: string }) => <MenuItem key={n.id}
                                                                                            value={n.id}>{n.Title}</MenuItem>
                            )}

                        </Field>
                        {!src ? <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                style={{display: "none"}}
                                onChange={handleFileChange}
                            />
                        </Button> : <div><img style={{maxHeight: 350}} src={src} alt='#'/> <Button
                            onClick={clearImg}>Clear</Button></div>}
                    </FormControl> : ''}
            </div>
            <Button type="submit" disabled={!selectedId ||  loading} variant="contained"> sss</Button>
        </form>

    )
}
let EditForm = reduxForm<FormType, mapStateToPropsType>({
    form: 'edit',
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(EditFormForm)
let Edit: React.FC<FormType & mapStateToPropsType> = (props) => {
    let [src, setSrc] = useState('')
    let [file, setFile] = useState(null)
    let handleFileChange = (event: any) => {
        const fileUploaded = event.target.files[0];
            setFile(fileUploaded)
        if (src !== null) {
            let reader: any = new FileReader();
            reader.readAsDataURL(fileUploaded)
            reader.onload = (e: any) => {
                setSrc(e.target.result)
            }
        }
    };
    let clearImg = () => {
        setSrc("")
        setFile(null)
    }

    let [selectedId, setTtt]: any = useState('')
    let selectedIdValue = (value: any) => {
        setTtt(value)
    }

    let submit = (formData: any) => {
        props.updateNewsThunk(selectedId, formData, file, props.user.id)
    }
    return (

        <EditForm src={src}
                  setSrc={setSrc}
                  news={props.news}
                  clearImg={clearImg}
                  handleFileChange={handleFileChange}
                  onSubmit={submit}
                  selectedIdValue={selectedIdValue}
                  {...props} />
    )
}
type mapStateToPropsType = {
    getNewsAllListThunk: () => void
    newsAll: any
    categories: Array<newsCategoryListType>
    getNewsCategoryListThunk: () => void
    selectedIdValue: (value: any) => void
    updateNewsThunk: (newsNameId: any, data: any, file: any , CurrentUserId:any) => void
    src: any
    handleFileChange: () => void
    clearImg: () => void
    user: any
    news: any
    setSrc: (val: any) => void
    loading: boolean
}

let mapStateToProps = (state: AppStateType) => {
    return {
        newsAll: state.news.newsAll,
        categories: state.news.newsCategoryList,
        user: state.user.user,
        loading: state.user.loadingAuth,
    }

}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {getNewsCategoryListThunk, updateNewsThunk}))(Edit);

