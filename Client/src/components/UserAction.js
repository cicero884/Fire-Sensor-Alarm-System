
import { Alert, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import qs from 'qs';
import NavigationService from './NavigationService';
import * as Links from './Links';
const axios = require('axios');
const cheerio = require('react-native-cheerio');

/* For get username & group */
export const getUser = async() => {
    try {
        const response = await axios.get(Links.getUserLink);
        if(response.status === 200) {
            if(response.data.username !== null && typeof response.data.groups !== 'undefined' && response.data.groups.length > 0) // If logged in, return user data
                return response.data;
            else    // Hasn't logged in yet, return null
                return null;
        }
        else {
            console.log(response);
            return null;
        }
    } catch (error) {
        console.log(error);
    } 
}

/* For get csrf of post page */
export const getCsrf = async (url) => {
    try {
        const response = await axios.get(url);  // get html from url
        if(response.status === 200) {
            const html = response.data; // Get raw html from server response
            const $ = cheerio.load(html);   // Using cheerio to parse raw html
            return $('input[name="csrfmiddlewaretoken"]').val();    // Get csrf_token from html 
        }
        else {
            console.log(response);
            return null;
        }
    } catch(error) {
        console.log(error);
    }
}

/* For both citizen and firefighter login */
export const logIn = async (username, password, user_type) => {
    try {
        /* For if user open app without network, then login with input, go back to the origin place to prevent error */
        const userdata = await getUser();
        if(userdata !== null) {
            if(userdata.groups[0] === "citizens") {
                console.log('login as citizens');
                NavigationService.navigate('CitizenBottomTabNavigator');
            }
            else if (userdata.groups[0] === "firefighters") {
                console.log('login as firefighters');
                NavigationService.navigate('FirefighterBottomTabNavigator');
            }
            return;
        }
        /* Get csrf token */
        const csrf = await getCsrf(Links.logInLink);
        const fcm_token = await getToken();
        console.log("login:" + fcm_token);
        /* Try to login, and get response from login page */
        const response = await axios.post(Links.logInLink, qs.stringify({ 
            csrfmiddlewaretoken: csrf,  // csrf_token
            username: username,         
            password: password,         
            user_type: user_type,
            fcm_token: fcm_token
        }))
        console.log(response.data);
        /* If login succeed, redirect to specific user page */
        if(response.data.status === 'success') {
            if(user_type === "citizens") {
                console.log('login as citizens');
                NavigationService.navigate('CitizenBottomTabNavigator');
            }
            else if (user_type === "firefighters") {
                console.log('login as firefighters');
                NavigationService.navigate('FirefighterBottomTabNavigator');
            }
            Alert.alert('', response.data.message);
        /* Else show login failed */
        } else {
            Alert.alert('ERROR', response.data.message);
        }
    } catch(error) {
        Alert.alert('ERROR', error);
        console.log(error);
    }
}

/* Get device FCM token */
export const getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
    return fcmToken;
}

/* For citizen signup only */
export const signUp = async (username, password1, password2) => {
    try {
        /* Get csrf token */
        const csrf = await getCsrf(Links.signUpLink);    
        /* Try to signup, and get response from signup page */
        const response= await axios.post(Links.signUpLink, qs.stringify({
            csrfmiddlewaretoken: csrf,  // csrf_token
            username: username,
            password1: password1,
            password2: password2,
        }))   
        console.log(response.data);  
        /* If create new account succeed, login using this account */
        if(response.data.status === 'success') {
            Alert.alert('' ,response.data.message); 
            await logIn(username, password1, 'citizens');    
        }
        /* Else show login failed */
        else {
            Alert.alert('ERROR' ,response.data.message);  
        }
    } catch(error) {
        Alert.alert('ERROR', error);
        console.log(error);
    }
}

/* For both citizen and firefighter logout */
export const logOut = async () => {
    try {
        const response = await axios.get(Links.logOutLink);
        console.log(response.data);
        /* If logout succeed, navigate back to login */
        if(response.data.status === 'success') {
            NavigationService.navigate('LoginPageStackNavigator');
            Alert.alert('' ,response.data.message);
        }
        /* Else show logout failed */
        else {
            Alert.alert('ERROR' ,response.data.message);
        }
    } catch(error) {
        Alert.alert('ERROR', error);
        console.log('ERROR', error);
    }
}

/* For citizen regiter building */
export const registerBuilding = async (building_name, floor_name) => {
    try {
        /* Get csrf token */
        const csrf = await getCsrf(Links.registerBuildingLink); 
        /* Try to regiter building, and get response from regiter building page */
        const response = await axios.post(Links.registerBuildingLink, qs.stringify({
            csrfmiddlewaretoken: csrf,  // csrf_token
            building_name: building_name,
            floor_name: floor_name,
        }))   
        console.log(response.data);  
        /* If create new account succeed, show success */
        if(response.data.status === 'success') {
            Alert.alert('' ,response.data.message); 
            NavigationService.navigate('CitizenBuildingPageStackNavigator');
        }
        /* Else show login failed */
        else {
            Alert.alert('ERROR' ,response.data.message);  
        }
    } catch(error) {
        Alert.alert('ERROR', error);
        console.log(error);
    }
}

/* For citizen get newest registered building name & floor name */
export const getNowBuilding = async () => {
    try {
        const response = await axios.get(Links.getNowBuildingLink);
        if(response.status === 200) {
            if(response.data.building_name !== "DEF" && response.data.floor_name !== "DEF") // If logged in, return user data
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

/* Get all Building that user can access */
export const getAllBuilding = async () => {
    try {
        const response = await axios.get(Links.getAllBuildingLink);
        if(response.status === 200) {
            return response.data.buildings;
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