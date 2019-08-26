
import { Alert } from 'react-native';

export const getUser = async() => {
    // try {
    //     const response = await axios.get('http://140.116.104.202:8000/userapp/index/');
    //     if(response.status === 200) {
    //         user = response.data;   // Get [username, groups]    
    //     }
    //     else {
    //         Alert.alert('ERROR', 'Failed to get user data');
    //     }
    // } catch (error) {
    //     Alert.alert('ERROR', 'Failed to get user data');
    //     console.log(error);
    // } finally {
    //     setUserState({ user: user && { ...user }, loggedIn: true })
    // }
}

export const getCsrf = async (url) => {
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
export const logIn = async (username, password, isFireFighter) => {
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

}

/* For citizen signup only */
export const signUp = async (username, password1, password2) => {
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
        if(signup_response.data.status === 'success') {
            await logIn(username, password1, false);   
        }
        /* Alert and log response from signup */
        Alert.alert('' ,signup_response.data);
        console.log(signup_response.data);
    
    } catch(error) {
        Alert.alert('ERROR', error);
        console.log(error);
    }
}

export const logOut = async () => {
    try {
        const logout_response = await axios.get('http://140.116.104.202:8000/userapp/logout/');
        /* Alert and log response from logout */
        Alert.alert('' ,logout_response.data);
        console.log(logout_response.data);
        /* If logout succeed */
        if(logout_response.data.status === 'success') {
            return true;
        }
        else {
            return false;
        }
    } catch(error) {
        Alert.alert('ERROR', error);
        console.log('ERROR', error);
        return false;
    }
}