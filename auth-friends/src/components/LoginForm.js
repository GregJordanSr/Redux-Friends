import React from 'react'
import {withFormik, Form, Field} from 'formik'
import * as Yup from 'yup';
import axiosWithAuth from "./authConfig"


 const LoginForm = ({ touched, errors, isSubmitting, values }) => {
    return (
        <Form>
        <div className="input-group">
            <div className="login-group" >
               {touched.name && errors.name && <p>{errors.username}</p>}
               <label htmlFor="username">Username: </label>
                <Field 
                    type="text"
                    name="username"
                    placeholder="Username" 
                    
                />
            </div>
            <div className="login-group">
            {touched.password && errors.password && <p>{errors.password}</p>}
                <label htmlFor="password">Password: </label>
                <Field 
                    autoComplete="off"
                    type="password"
                    name="password"
                    placeholder="Password"
                
                />
            </div>
            <button type="submit">Register</button>
        </div>
        <div>
                {isSubmitting && <p>Loading...</p>}
            <button
                disabled={isSubmitting}
                className="submit-button"
                type="submit"
            >
                Submit &rarr;
            </button>
        </div>
        </Form>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues() {
       return{
        username: "Lambda School",
        password: "i<3Lambd4"
       }; 
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password Required')
    }),

    handleSubmit(values,formikBag){
        const url = "/login"
        return axiosWithAuth().post(url,values).then(res => {
            localStorage.setItem("token", res.data.payload);
            formikBag.props.history.push("/friends-list")
            formikBag.resetForm()
        })

    },

})(LoginForm);
export default FormikLoginForm;