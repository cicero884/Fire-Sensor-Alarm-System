import * as React from 'react'
import { Alert } from 'react-native';
import qs from 'qs';

const cheerio = require('react-native-cheerio');
const axios = require('axios');
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true

interface User {
    username: string
    user_type: string
}

interface UserState {
    user?: User
    loggedIn: boolean
}

interface UserContext {
    userState: UserState
    setUserState: (userState: UserState) => void
    getUser: () => void
    getCsrf: (url: string) => string
    signUp: (args: {
        username: string
        password1: string
        password2: string
    }) => void
    logIn: (args: {
        username: string
        password: string
        isFireFighter: boolean
    }) => void
    logOut: () => void
}

const initialState = { 
    user: undefined, 
    loggedIn: false     // Default set to unlogged in before 
}

export const UserContext = React.createContext<UserContext>({
    userState: initialState,
    setUserState: () => { },
    getUser: () => { },
    getCsrf: (): string => ,
    signUp: () => { },
    logIn: () => { },
    logOut: () => { },
})

export const UserProvider: React.FunctionComponent<{}> = props => {
    const [userState, setUserState] = React.useState<UserState>(initialState)

    /* Get now user from server */
    const getUser = async () => {
        let user: any = null

        try {
            const response = await axios.get('http://140.116.104.202:8000/userapp/index/');
            if(response.status === 200) {
                user = response.data;   // Get [username, groups]    
            }
            else {
                Alert.alert('ERROR', 'Failed to get user data');
            }
        } catch (error) {
            Alert.alert('ERROR', 'Failed to get user data');
            console.log(error);
        } finally {
            setUserState({ user: user && { ...user }, loggedIn: true })
        }
    }

    /* Get csrf token from specific url */
    const getCsrf = async (url: string) => {
        try {
            const response = await axios.get(url);  // get html from url
            if(response.status === 200) {
                const html = response.data; // Get raw html from server response
                const $ = cheerio.load(html);   // Using cheerio to parse raw html
                return $('input[name="csrfmiddlewaretoken"]').val();    // Get csrf_token from html 
            }
            else {
                Alert.alert('ERROR', 'Failed to get csrf token');
            }
        } catch(error) {
            Alert.alert('ERROR', error);
            console.log(error);
        }
    }

    /* For both citizen and firefighter login */
    const logIn = async (args: {
        username: string
        password: string
        isFireFighter: boolean
    }) => {
        const { username, password, isFireFighter } = args
        // TODO: login
        try {
            /* Get csrf token */
            const csrf = await getCsrf('http://140.116.104.202:8000/userapp/login/');
            /* Try to login, and get response from login page */
            const login_response = await axios.post('http://140.116.104.202:8000/userapp/login/', qs.stringify({ 
                    csrfmiddlewaretoken: csrf,  // csrf_token
                    username: username,         
                    password: password,         
                    user_type: (isFireFighter) ? 'firefighters': 'citizens', // For different user login
                }))
            console.log(login_response.data);
            /* If login succeed, means that length of groups array isn't 0 */
            if(login_response.data['groups'].length > 0) {
                await getUser();    // Get user data
                Alert.alert('', login_response.data);
            /* If login failed */
            } else {
                Alert.alert('ERROR', login_response.data);
            }
        } catch(error) {
            Alert.alert('ERROR', error);
            console.log(error);
        }
        //await accountsPassword.login({ password, user: { username } })
        //await getUser()
    }

    /* For citizen signup only */
    const signUp = async (args: {
        username: string
        password1: string
        password2: string
    }) => {
        const { username, password1, password2 } = args
        // TODO: signUp
        try {
            /* Get csrf token */
            const csrf = await getCsrf('http://140.116.104.202:8000/userapp/registration/');    
            /* Try to signup, and get response from signup page */
            const signup_response = await axios.post('http://140.116.104.202:8000/userapp/registration/', qs.stringify({
                csrfmiddlewaretoken: csrf,  // csrf_token
                username: username,
                password1: password1,
                password2: password2,
            }))     
            /* If create new account succeed, login using this account */
            if(signup_response.data.includes('successfully')) {
                await logIn({
                    username: username, 
                    password: password1, 
                    isFireFighter: false });   
            }
            /* Alert and log response from signup */
            Alert.alert('' ,signup_response.data);
            console.log(signup_response.data);
        
        } catch(error) {
            Alert.alert('ERROR', error);
            console.log(error);
        }
       
        // await accountsPassword.createUser({
        //     password,
        //     email,
        //     profile: { username, lastName },
        // })
        // await logIn(email, password)
    }

    const logOut = async () => {
        // TODO: logout
        try {
            const logout_response = await axios.get('http://140.116.104.202:8000/userapp/logout/')
        } catch(error) {
            Alert.alert()
            console.log('ERROR', error);
        }
        // cosnt status = await axios.get('http://140.116.104.202:8000/userapp/logout/')
        //     credentials: 'include' // use cookies
        // })
        //     .then((response) => {
        //         // Get response from server
        //         console.log(response['url']);
        //         return true;
        //     })
        //     .catch((err) => {
        //         Alert.alert('ERROR', err.message)
        //     })
        //     .then((loggedOut) => {
        //         if(loggedOut) {
        //             setUserState({ 
        //                 user: undefined, 
        //                 loggedIn: false })
        //         }
        //     })
        //await accountsGraphQL.logout()
        //setUserState({ user: undefined, loggedIn: false })
    }

    return (
        <UserContext.Provider
            value={{
                userState,
                setUserState,
                getUser,
                signUp,
                logIn,
                logOut,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => React.useContext(UserContext)
