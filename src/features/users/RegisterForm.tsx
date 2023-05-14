import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import ValidationError from '../Errors/ValidationError';
export default observer(function RegisterForm(){

    const {userStore} = useStore();

    return (
        <Formik 
        initialValues={{username:"", email:"",password:"",error: null}}
        onSubmit={(values,{setErrors})=>userStore.register(values).catch(error =>setErrors({error}))}
        validationSchema= {
            Yup.object({
                username:Yup.string().required(),
                email:Yup.string().required(),
                password:Yup.string().required(),

            })
        }
        >
            {({handleSubmit,isSubmitting,errors,isValid,dirty})=>(
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as="h2" content="Sign up to Secure Land" color='teal' textAlign='center' />
                    <MyTextInput placeholder='Username' name='username' />
                    <MyTextInput placeholder='Email' name='email' />
                    <MyTextInput placeholder='Password' name='password' type='password' />
                    <ErrorMessage 
                        name='error'
                         render={()=><ValidationError errors={errors.error}/>}
                    />
                    <Button 
                        disabled = {!isValid || !dirty || isSubmitting}
                        positive
                        loading={isSubmitting} 
                        content='Register'
                        type='submit' fluid 
                    />
                </Form>
            )}

        </Formik>
    )
});