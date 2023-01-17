import {React, useContext, useEffect} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import  * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext'



const CreatePost = () => {
    const {authState} =useContext(AuthContext);

    let navigate = useNavigate();

    const initialValues={
        title:"",
        postText:"",
 
    };
useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
        navigate('/login');
    }
},[]);

const validationSchema=Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  
});

    const onSubmit=(data)=>{

        axios.post('/api/posts', data,{
            headers: {accessToken: localStorage.getItem("accessToken") },
        }).then((response)=>{
            navigate('/')
        });
        console.log(data)
    };


  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <ErrorMessage name='title' component='span'/>
                <label>Title:</label>
                <Field id='inputCreatePost' name='title' placeholder='(Ex. title...)'/>
                <ErrorMessage name='postText' component='span'/>
                <label>Post:</label>
                <Field id='inputCreatePost' name='postText' placeholder='(Ex. Post...)'/>
                <ErrorMessage name='username' component='span'/>
                <button type='submit'>Create a Post</button>
            </Form>
            </Formik>
    </div>
  )
}

export default CreatePost