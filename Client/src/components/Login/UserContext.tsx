import * as React from 'react'
import { Alert } from 'react-native';

interface User {
    typename: string
    username: string
}

interface UserState {
    user?: User
    loggedIn: boolean
}

interface UserContext {
    userState: UserState
    setUserState: (userState: UserState) => void
    getUser: () => void
    signUp: (args: {
        username: string
        password1: string
        password2: string
        isFireFighter: boolean
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
            user = await accountsGraphQL.getUser()
            console.log('!!!user', user)
        } catch (error) {
            console.error('There was an error logging in.', error)
        } finally {
            setUserState({ user: user && { ...user }, loggedIn: true })
        }
    }

    const logIn = async (args: {
        username: string
        password: string
        isFireFighter: boolean
    }) => {
        const { username, password, isFireFighter } = args
        // TODO: login
        fetch('http://140.116.104.202:8000/userapp/login_citizen/', { // Get csrf token
            credentials: 'include', // Use cookies
            connection: 'keep-alive'
        })
            .then((response) => {
                return response.text(); //取得網頁的原始碼
            })
            .catch((err) => {
                Alert.alert("", err.message);
            })
            .then((text) => {
                return htmlparser2.parseDOM(text); //轉換成html
            })
            .then((dom) => {
                let $ = cheerio.load(dom); //constructor
                return $('input[name="csrfmiddlewaretoken"]').val(); //用jQuery語法取得csrf_token
            })
            .then((csrf) => {
                fetch('http://luffy.ee.ncku.edu.tw:13728/accounts/register/', { //發送HTTP post request提交表單
                    method: 'post', //與先前fetch同樣的網址，但是多定義了method，即是發送Http post request提交表單
                    credentials: 'same-origin', //same-origin cookie
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' //設定資料類型，如同html
                    },
                    body: qs.stringify({ //用qs轉換成application/x-www-form-urlencoded格式，
                        csrfmiddlewaretoken: csrf, //csrf_token
                        username: this.state.userPhoneNum,
                        name: this.state.userName,
                        password: this.state.userPassword,
                    })
                })
                    .then((response) => {
                        return response.text(); //取得網頁的原始碼
                    })
                    .then((text) => {
                        return htmlparser2.parseDOM(text); //轉換成html
                    })
                    .then((dom) => {
                        let $ = cheerio.load(dom); //constructor
                        let status = $('p').attr("class"); // Get class is success or error
                        let status_msg = $('p').attr("id"); // Get id of error type
                        if(status === 'success') {
                            alert('', '註冊成功！');
                        }
                        else if(status === 'error') {
                            switch(status_msg) {
                                case "serverError":
                                    Alert.alert('', '註冊失敗，請重新輸入');
                                    break;
                                case "userExists":
                                    Alert.alert('', '該用戶已存在');
                                    break;
                            }
                        }  
                        return status;
                    })
            })
        //await accountsPassword.login({ password, user: { username } })
        //await getUser()
    }

    const signUp = async (args: {
        username: string
        password1: string
        password2: string
        isFireFighter: boolean
    }) => {
        const { username, password1, password2, isFireFighter } = args
        // TODO: signUp

        // await accountsPassword.createUser({
        //     password,
        //     email,
        //     profile: { username, lastName },
        // })
        // await logIn(email, password)
    }

    const logOut = async () => {
        // TODO: logout
        await fetch('http://140.116.104.202:8000/userapp/logout/', {
            credentials: 'include' // use cookies
        })
            .then((response) => {
                // Get response from server
                console.log(response['url']);
                return true;
            })
            .catch((err) => {
                Alert.alert('ERROR', err.message)
            })
            .then((loggedOut) => {
                if(loggedOut) {
                    setUserState({ 
                        user: undefined, 
                        loggedIn: false })
                }
            })
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
