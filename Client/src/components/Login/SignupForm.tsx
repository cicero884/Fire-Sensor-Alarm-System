import * as React from 'react'
import { Formik } from 'formik'
import Button from '../Shared/Button'
import Input from '../Shared/Input'
import { ContentWrapper, FormWrapper, FormRowWrapper } from '../../screens/Login/Login'

interface SignupFormProps {
    onSubmit: (args: { 
        username: string; 
        password: string;
        password_recheck: string; }) => void
}

const SignupForm = ({ onSubmit }: SignupFormProps) => (
    <Formik
        initialValues={{ username: '', password: '', password_recheck: '' }}
        validate={values => {
            const errors: any = {}
            if (!values.username) {
                errors.username = 'Username required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)) {
                errors.username = 'Invalid username'
            }
            if (!values.password) {
                errors.password = 'Password required'
            }
            if (!values.password_recheck) {
                errors.password_recheck = 'Password re-check required'
            } 
            return errors
        }}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
            try {
                await onSubmit({ ...values })
            } catch (e) {
                console.log('ERROR', e.message)
            }
            setSubmitting(false)
        }}
    >
        {({
            values,
            // errors,
            // touched,
            // handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
        }) => (
                <ContentWrapper>
                    <FormWrapper>
                        <Input
                            name="username"
                            label="username"
                            placeholder="Enter user name"
                            value={values.username}
                            onChangeText={text => setFieldValue('username', text)}
                            style={{ width: '60%' }}
                        />
                        <Input
                            name="password"
                            label="password"
                            placeholder="••••••••••"
                            value={values.password}
                            onChangeText={text => setFieldValue('password', text)}
                            onBlur={handleBlur}
                            textContentType="password"
                            style={{ width: '60%' }}
                            secure
                        />
                        <Input
                            name="password_recheck"
                            label="password recheck"
                            placeholder="re-enter password"
                            value={values.password_recheck}
                            onChangeText={text => setFieldValue('password_recheck', text)}
                            onBlur={handleBlur}
                            textContentType="password"
                            style={{ width: '60%' }}
                            secure
                        />
                    </FormWrapper>
                    <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
                        SIGNUP
                    </Button>
                </ContentWrapper>
            )}
    </Formik>
)

export default SignupForm
