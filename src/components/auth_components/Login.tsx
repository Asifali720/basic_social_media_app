import React from "react";
import {Formik, Field, Form, ErrorMessage} from 'formik'
import { ZodError, z } from "zod";

const ValidationSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "Email is required...!",
      })
      .email({
        message: "please put valid email",
      }),
    password: z.string().min(6, {
        message: 'password at least eight character'
    }) 
  });

type FormValues = z.infer<typeof ValidationSchema>  

const Login = () => {
   
    const validateForm = (values: FormValues) => {
        try {
            ValidationSchema.parse(values);
        } catch (error) {
            if (error instanceof ZodError) {
                return error.formErrors.fieldErrors;
            }
        }
      };

  return (
    <div className="">
      <h3 className="font-roboto font-bold text-2xl">Login now..!</h3>
      <Formik<FormValues> 
        initialValues={{
            email: '',
            password: ''
        }}
        validate={validateForm}
        onSubmit={(values) => {
            // Handle form submission
            console.log(values);
          }}
        >
        <Form>
        <div>
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="name" component="div" />
        </div>
        <button type="submit">submitt</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
