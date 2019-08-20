import * as React from 'react'
import { Alert } from 'react-native'
import { Formik } from 'formik'
import Button from '../Shared/Button'
import Input from '../Shared/Input'
import { ContentWrapper, FormWrapper } from '../../screens/Login/Login'

interface LoginFormProps {
    onSubmit: (args: {
        username: string
        password: string
    }) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => (
    <Formik
        initialValues={{ username: '', password: '' }}
        validate={values => {
            const errors: any = {}
            if (!values.username) {
                errors.username = 'Required'
            } else if (/[A-Z0-9@.+-_]{1,150}/i.test(values.username)) {
                errors.username = 'Invalid username'
            }
            if (!values.password) {
                errors.password = 'Password required'
            }
            return errors
        }}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={async (values, { setSubmitting }) => {
            try {
                await onSubmit({ ...values })
            } catch (e) {
                Alert.alert('ERROR', e.message)
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
                            label="Username"
                            placeholder="John Wick"
                            value={values.username}
                            onChangeText={text => setFieldValue('username', text)}
                            onBlur={handleBlur}
                            style={{ width: '80%', marginBottom: 30 }}
                        />
                        <Input
                            name="password"
                            label="Password"
                            placeholder="••••••••••"
                            value={values.password}
                            onChangeText={text => setFieldValue('password', text)}
                            onBlur={handleBlur}
                            textContentType="password"
                            style={{ width: '80%' }}
                            secure
                        />
                    </FormWrapper>
                    <Button onPress={() => handleSubmit()} disabled={isSubmitting}>
                        LOGIN
        </Button>
                </ContentWrapper>
            )}
    </Formik>
)

export default LoginForm
