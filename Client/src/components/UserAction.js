
import { Alert } from 'react-native';
import qs from 'qs';
import NavigationService from './NavigationService';
const axios = require('axios');
const cheerio = require('react-native-cheerio');

export const getUser = async() => {
    try {
        const response = await axios.get('http://140.116.104.202:8000/userapp/index/');
        if(response.status === 200) {
            if(response.data.username !== "" && typeof response.data.groups !== 'undefined' && response.data.groups.length > 0) // If logged in, return user data
                return response.data;
            else    // Hasn't logged in yet, return null
                return null;
        }
        else {
            Alert.alert('ERROR', 'Failed to get user data');
            return null;
        }
    } catch (error) {
        Alert.alert('ERROR', 'Failed to get user data');
        console.log(error);
    } 
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
export const logIn = async (username, password, user_type) => {
    try {
        console.log(`I am ${user_type}`)
        /* Get csrf token */
        const csrf = await getCsrf('http://140.116.104.202:8000/userapp/login/');
        /* Try to login, and get response from login page */
        const login_response = await axios.post('http://140.116.104.202:8000/userapp/login/', qs.stringify({ 
                csrfmiddlewaretoken: csrf,  // csrf_token
                username: username,         
                password: password,         
                user_type: user_type
            }))
        console.log(login_response.data);
        /* If login succeed, redirect to specific user page */
        if(login_response.data.status === 'success') {
            console.log('sdfsdf')
            if(user_type === "citizens") {
                console.log('login as citizens');
                NavigationService.navigate('CitizenBottomTabNavigator');
            }
            else if (user_type === "firefighters") {
                console.log('login as firefighters');
                NavigationService.navigate('FirefighterBottomTabNavigator');
            }
            Alert.alert('', login_response.data.message);
        /* Else show login failed */
        } else {
            Alert.alert('ERROR', login_response.data.message);
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
        console.log(signup_response.data);  
        /* If create new account succeed, login using this account */
        if(signup_response.data.status === 'success') {
            Alert.alert('' ,signup_response.data.message); 
            await logIn(username, password1, 'citizens');    
        }
        /* Else show login failed */
        else {
            Alert.alert('ERROR' ,signup_response.data.message);  
        }
    } catch(error) {
        Alert.alert('ERROR', error);
        console.log(error);
    }
}

export const logOut = async () => {
    try {
        const logout_response = await axios.get('http://140.116.104.202:8000/userapp/logout/');
        console.log(logout_response.data);
        /* If logout succeed, navigate back to login */
        if(logout_response.data.status === 'success') {
            NavigationService.navigate('LoginPageStackNavigator');
            Alert.alert('' ,logout_response.data.message);
        }
        /* Else show logout failed */
        else {
            Alert.alert('ERROR' ,logout_response.data.message);
        }
    } catch(error) {
        Alert.alert('ERROR', error);
        console.log('ERROR', error);
    }
}