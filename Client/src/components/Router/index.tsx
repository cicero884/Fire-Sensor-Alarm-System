import * as React from 'react'
import { Router, Route, Switch, Redirect, Link } from './Router'
import MainLayout from '../MainLayout'
import Login from '../../screens/Login'
import Home from '../../screens/Home'
import { useUserContext } from '../Login/UserContext'

export default () => {
    const { userState, getUser } = useUserContext()

    React.useEffect(() => {
        getUser()
        return () => { }
    }, [userState.user && userState.user.id])

    if (!userState.user && userState.loggingIn) {
        return null
    }

    return (
        <Router>
            {userState.user ? (
                <MainLayout>
                    <Route
                        path="/"
                        render={() => (
                            <Switch>
                                <Route path="/" exact component={Home} />
                                {/* <Route path="/policies" component={Policies} /> */}
                                <Route path="*" render={() => <Redirect to="/" />} />
                            </Switch>
                        )}
                    />
                </MainLayout>
            ) : (
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
