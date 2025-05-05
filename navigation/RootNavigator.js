import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreloadScreen from "../screens/PreloadScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import Construct from '../components/Construct';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown:false }}>
            <Stack.Screen name="Preload" component={PreloadScreen} style={styles.page} />
            <Stack.Screen name="Construct" component={Construct} />
            <Stack.Screen name="Auth" component={AuthenticationScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;