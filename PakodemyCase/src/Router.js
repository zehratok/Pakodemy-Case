import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from "./navigations/appStack";

const Router = () => {
    return (
        <NavigationContainer>
            <AppStack/>
        </NavigationContainer>
    );
};

export default Router
