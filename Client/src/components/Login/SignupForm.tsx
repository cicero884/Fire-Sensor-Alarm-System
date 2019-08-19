import * as React from 'react'
import { Formik } from 'formik'
import Button from '../Shared/Button'
import Input from '../Shared/Input'
import { ContentWrapper, FormWrapper } from '../../screens/Login/Login'

interface SignupFormProps {
    onSubmit: (args: { 
        username: string;   // For citizen register
        password1: string;  // For password
        password2: string;  // For password recheck
    }) => void
}

const SignupForm = ({ onSubmit }: SignupFormProps) => (
    <Formik
        initialValues={{ username: '', password1: '', password2: '' }}
        validate={values => {
            const errors: any = {}
            if (!values.username) {
                errors.username = 'Username required'
            // Username only accepts letters, digits and @/./+/-/_, all in 150 words
            } else if (/[A-Z0-9@.+-_]{1,150}/i.test(values.username)) {
                errors.username = '150 characters or fewer. Letters, digits and @/./+/-/_ only.'
            }
            if (!values.password1) {
                errors.password1 = 'Password required'
            /*  Your password can't be too similar to your other personal information.
                Your password must contain at least 8 characters.
                Your password can't be a commonly used password.
                Your password can't be entirely numeric. */
            } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,150}$/i.test(values.password1)) {
                errors.password1 = 'At least 8 characters, can\'t be entirely numeric'
            }
            if (!values.password2) {
                errors.password2 = 'Password re-check required'
            } else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,150}$/i.test(values.password2)) {
                errors.password2 = 'At least 8 characters, can\'t be entirely numeric'
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
                            placeholder="Enter username"
                            value={values.username}
                            onChangeText={text => setFieldValue('username', text)}
                            style={{ width: '80%' }}
                        />
                        <Input
                            name="password1"
                            label="password1"
                            placeholder="••••••••••"
                            value={values.password1}
                            onChangeText={text => setFieldValue('password1', text)}
                            onBlur={handleBlur}
                            textContentType="password"
                            style={{ width: '80%' }}
                            secure
                        />
                        <Input
                            name="password2"
                            label="password1 recheck"
                            placeholder="re-enter password"
                            value={values.password2}
                            onChangeText={text => setFieldValue('password2', text)}
                            onBlur={handleBlur}
                            textContentType="password"
                            style={{ width: '80%' }}
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
