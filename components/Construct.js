import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import MainDashboardScreen from '../screens/MainDashboardScreen';
import ActiveWorkoutScreen from '../screens/ActiveWorkoutScreen';


const Construct = () => {
    return (
        <View style={styles.container}>
            <PagerView style={styles.container} initialPage={0}>
                <View style={styles.page} key="1">
                    <MainDashboardScreen/>
                </View>
                <View key="2">
                    <ActiveWorkoutScreen/>
                </View>  
            </PagerView>
        </View>
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

export default Construct;