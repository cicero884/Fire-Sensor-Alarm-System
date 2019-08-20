import * as React from 'react'
import { User } from '../../generated/graphql'
import { accountsGraphQL, accountsPassword } from '../../utils/apollo'

interface UserState {
    user?: User
    loggingIn: boolean
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

const initialState = { user: undefined, loggingIn: true }

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

    const getUser = async () => {
        let user: any = null

        try {
            user = await accountsGraphQL.getUser()
            console.log('!!!user', user)
        } catch (error) {
            console.error('There was an error logging in.', error)
        } finally {
            setUserState({ user: user && { ...user, _id: user.id }, loggingIn: false })
        }
    }

    const logIn = async (args: {
        username: string
        password: string
        isFireFighter: boolean
    }) => {
        const { username, password, isFireFighter } = args
        // TODO: login
        
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
        await accountsGraphQL.logout()
        setUserState({ user: undefined, loggingIn: false })
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
