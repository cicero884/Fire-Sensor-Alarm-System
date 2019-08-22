import * as React from 'react'
import { View, Text } from 'react-native'
import { Router, Route, Switch, Redirect, Link } from './Router'
// import MainLayout from '../MainLayout'
import Login from '../../screens/Login'
// import Home from '../../screens/Home'
import { useUserContext } from '../Login/UserContext'

export default () => {
    const { userState, getUser } = useUserContext()

    /* Get user data when accessing router */
    React.useEffect(() => {
        getUser()
        return () => { }
    }, [userState.user])

    /* If user not found or error occur in log in */
    if (!userState.user && !userState.loggedIn) {
        return null
    }

    return (
        <Router>
            {
                userState.user ? (
                /* if Logged in, go to home page */
                <View>
                    <Text>Build in progress</Text>
                </View>
                // <MainLayout>
                //     <Route
                //         path="/"
                //         render={() => (
                //             <Switch>
                //                 <Route path="/" exact component={Home} />
                //                 {/* <Route path="/policies" component={Policies} /> */}
                //                 <Route path="*" render={() => <Redirect to="/" />} />
                //             </Switch>
                //         )}
                //     />
                // </MainLayout>  
            ) : (
                /* Else go to log in & sign up page, default to ciziten's log in page */
                    <Switch>
                        <Route path="/citizen/login" component={Login} />
                        <Route path="/citizen/signup" component={Login} />
                        <Route path="/firefighter/login" component={Login} />
                        <Route path="/firefighter/signup" component={Login} />
                        <Route path="*" render={() => <Redirect to="/citizen/login" />} />
                    </Switch>
                )}
        </Router>
    )
}

export { Router, Route, Switch, Redirect, Link }
