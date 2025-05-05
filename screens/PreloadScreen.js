import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const PreloadScreen = ({ navigation }) => {

    useEffect(()=>{
        const checkAuthToken = async () => {
            try {
                const token = await SecureStore.getItemAsync('authToken')
                // You could add logging, analytics, or context state here if needed
            } catch (e) {
                console.warn('Error accessing token:', e);
            } finally {
                navigation.replace('Construct')
            }
        };
        checkAuthToken();
    },[]);
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default PreloadScreen;