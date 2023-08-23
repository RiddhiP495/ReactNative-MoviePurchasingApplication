import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MoviesListScreen from "./MoviesListScreen";
import MovieDetailsScreen from "./MovieDetailsScreen";
import LoginScreen from "./LoginScreen";
import BuyTicketScreen from "./BuyTicketScreen";

const Stack = createNativeStackNavigator();

const NowPlayingStackScreen = () => {

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen component={MoviesListScreen} name="NowPlayingScreen"/>
            <Stack.Screen component={MovieDetailsScreen} name="MovieDetailsScreen"/>
            <Stack.Screen component={LoginScreen} name="LoginScreen"/>
            <Stack.Screen component={BuyTicketScreen} name="BuyTicket"/>
        </Stack.Navigator>
    );
}

export default NowPlayingStackScreen;