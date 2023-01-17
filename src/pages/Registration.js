import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import  * as Yup from 'yup'
import axios from 'axios'


const Registration = () => {
    const initialValues={
        username:"",
        password:"",
    };

const validationSchema=Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password:Yup.string().min(4).max(20).required(),
    
});
const onSubmit=(data)=>{
    
    window.location.reload();
    axios.post('https://litalcohenfullstack.herokuapp.com/auth', data).then(()=>{
        console.log(data)
        
});
}
  return (
    <div>
         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
            <ErrorMessage name='username' component='span'/>
                <label>Username:</label>
                <Field id='inputCreatePost' name='username' placeholder='username'/>
                <ErrorMessage name='title' component='span'/>
                <label>Password:</label>
                <Field id='#inputCreatePost1' name='password' placeholder='password' type='password'/>
                <button type='submit'>Register</button>

            </Form>
            </Formik>
    </div>
  )
}

export default Registration
