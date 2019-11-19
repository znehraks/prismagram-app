import React from 'react';
import {Platform} from 'react-native';
import {View} from "react-native";
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from "react-navigation-stack";
import Detail from "../screens/Detail"
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from '../components/MessagesLink';
import NavIcon from '../components/NavIcon';
import { stackStyles } from './config';
import styles from '../styles';
import UserDetails from '../screens/UserDetails';

const stackFactory = (initialRoute, customConfig) => 
    createStackNavigator({
        InitialRoute:{
            screen: initialRoute,
            navigationOptions: {...customConfig,
                headerStyle: { ...stackStyles }
            }   
        },
        Detail: {
            screen: Detail,
            navigationOptions: {
                title: "Photo"
            }
        },
        UserDetail: {
            screen: UserDetails,
            navigationOptions: ({navigation}) => ({
                title: navigation.getParam("userName")
            })
        }
    }, 
    {
        defaultNavigationOptions: {
            headerBackTitle: null,
            headerTintColor: styles.blackColor,
            headerStyle: {...stackStyles}
        } 
    }
    );

export default createBottomTabNavigator({
    Home:{
        screen: stackFactory(Home, {
        headerRight: <MessagesLink />,
        headerTitle: <NavIcon name="logo-instagram" size={40}/>
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                  focused={focused}
                  name={Platform.OS === "ios" ? "ios-home" : "md-home"}
                />
            )
        }

    }, 
    Search:{
        screen: stackFactory(Search, {
            headerBackTitle: null
          }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                  focused={focused}
                  name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                />
            )
        }
    },
    Add: {
        screen: View,
        navigationOptions:{
            tabBarOnPress: ({navigation}) => navigation.navigate("PhotoNavigation"),
            tabBarIcon: ({ focused }) => (
                <NavIcon
                  focused={focused}
                  size={28}
                  name={Platform.OS === "ios" ? "ios-add" : "md-add"}
                />
            )
        }
    }, 
    Notifications: {
        screen: stackFactory(Notifications, {
        title: "Notifications"
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                  focused={focused}
                  name={
                    Platform.OS === "ios"
                      ? focused
                        ? "ios-heart"
                        : "ios-heart-empty"
                      : focused
                      ? "md-heart"
                      : "md-heart-empty"
                  }
                />
            )
        }
    }, 
    Profile: {
        screen: stackFactory(Profile, {
        title: "Profile"
        }),
        navigationOptions: {
            tabBarIcon: ({ focused }) => (
                <NavIcon
                  focused={focused}
                  name={Platform.OS === "ios" ? "ios-person" : "md-person"}
                />
            )
        }
    }
}, {
    tabBarOptions:{
        showLabel: false,
        style:{
            backgroundColor: "#FAFAFA"
        }
    }
});