import React from "react";
import {StyleSheet, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = ({icon, onPress}) => {
    console.log(`Tab - icon: ${icon}`);
    return (
        <Animated.View style={styles.tabButton}>
            <TouchableOpacity onPress={onPress}>
                <Ionicons name={icon} size={35} color="green"/>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    tabButton: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Tab;