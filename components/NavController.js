import React from 'react';
import {View} from "react-native";
import { useIsLoggedIn } from '../AuthContext';
import AuthNavigation from '../navigation/AuthNavigation';
import MainNavigation from '../navigation/MainNavigation';

export default () => {
    const isLoggedIn = useIsLoggedIn();
    return (
        <View style={{flex: "1"}}>
                <MainNavigation />
        </View>
    );
};

        // <View style={{flex: "1"}}>
        //     {isLoggedIn ? (
        //         <MainNavigation />
        //     ) : ( 
        //         <AuthNavigation />
        //     )}
        // </View>