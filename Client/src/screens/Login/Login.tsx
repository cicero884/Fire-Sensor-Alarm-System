import * as React from 'react'
import { View, Image } from 'react-native'
import styled from 'styled-components'
import TabBox, { Tabs } from '../../components/Login/UserTabBox'
import { useUserContext } from '../../components/Login/UserContext'
import LoginForm from '../../components/Login/LoginForm'
import SignupForm from '../../components/Login/SignupForm'
import LinkToOtherLogin from '../../components/Login/LinkToOtherLogin'
import { useIsLandlord } from '../../utils/hooks'

const Wrapper = styled(View)`
    min-height: 100vh;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-image: radial-gradient(50% 100%, var(--dark-blue) 0%, var(--very-dark-blue) 100%);
`

const LogoWrapper = styled(View)`
    position: absolute;
    top: 86px;
`

const Logo = styled(Image)`
    width: 180px;
    height: 46px;
`

export const ContentWrapper = styled(View)`
    flex: 1;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
`

export const FormWrapper = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const FormRowWrapper = styled(View)`
    width: 90%;
    flex-direction: row;
    justify-content: space-around;
`

const Login = (props: any) => {
    const isLandlord = useIsLandlord(props.location)
    const path = isLandlord
        ? props.location.pathname.substring('/landlord'.length)
        : props.location.pathname
    const { logIn, signUp } = useUserContext()
    return (
        <Wrapper>
            <LogoWrapper>{<Logo source={{ uri: "http://i.imgur.com/jieL5q9.jpg" }} />}</LogoWrapper>
            <View style={{ width: 600, height: 500 }}>
                <TabBox activeTab={path} isLandlord={isLandlord}>
                    {path === Tabs.login ? (
                        <LoginForm
                            onSubmit={async (email, password) => {
                                await logIn(email, password, isLandlord)
                                props.history.push('/')
                            }}
                        />
                    ) : (
                            <SignupForm
                                onSubmit={async args => {
                                    await signUp({ ...args, isLandlord })
                                    props.history.push('/')
                                }}
                            />
                        )}
                </TabBox>
            </View>
            <LinkToOtherLogin isLandlord={isLandlord} />
        </Wrapper>
    )
}

export default Login
