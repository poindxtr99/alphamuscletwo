import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import TabSceneView from './TabSceneView';
import Animated, {
    runOnJS, 
    useAnimatedStyle, 
    useAnimatedReaction,
    useSharedValue, 
    withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import FavoriteWorkoutsScreen from '../screens/FavoriteWorkoutsScreen';
import WorkoutBuilderScreen from '../screens/WorkoutBuilderScreen';
import ProfileScreen from '../screens/ProfileScreen';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 50;
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + STATUS_BAR_HEIGHT;
const routes = [
    { key: 'workouts', component: WorkoutBuilderScreen },
    { key: 'favorites', component: FavoriteWorkoutsScreen },
    { key: 'profile', component: ProfileScreen},
];



const NavBarViews = forwardRef(({onHideViews}, ref) => {
    //
    useImperativeHandle(ref, ()=>({scrollTo, handleTabPress}), []);
    // Bottom Sheet Transition
    const translateY = useSharedValue(0);
    const activeIndex = useSharedValue(0);
    const [currentTab, setCurrentTab] = useState(0);
    const context = useSharedValue({ y:0 });
    const scrollTo = useCallback((destination) => {
        'worklet';
        translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    // 🔁 Sync Reanimated shared value -> React state.  This functon is what makes the views change.  I'd 
    useAnimatedReaction(
        () => activeIndex.value,
        (value, prev) => {
            if (value !== prev) {
                runOnJS(setCurrentTab)(value);
            }
        }
    );
    const handleTabPress = useCallback((key) => {
        const index = routes.findIndex((r) => r.key === key );
        
        if (index !== -1) {
            activeIndex.value = index;
        }
    }, []);

    
    const gesture = Gesture.Pan().onStart(() => {
        context.value = { y: translateY.value };
    }).onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    }).onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / .5) {
            scrollTo(50);
            // call to update the tabBar
            if (onHideViews){
                runOnJS(onHideViews)();
            }
        }
    })

    useEffect(() => {
        scrollTo(50);
    }, []);

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        }
    });
 
    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style = {[ styles.navbarViewsContainer, rBottomSheetStyle ]}>
                <View style = { styles.line } />
                <Text style = { styles.text }>Navbar Views</Text>
                <TabSceneView activeIndex={activeIndex.value} routes={routes}/>
            </Animated.View>
        </GestureDetector>
)});

const styles = StyleSheet.create({
    navbarViewsContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'black',
        top: SCREEN_HEIGHT,
        borderRadius: 25
    },
    line: {
        width: 75,
        height: 5,
        backgroundColor: 'grey',
        alignSelf: 'center',
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        color: 'white',
        alignSelf: 'center'
    },
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: StatusBar.currentHeight,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
});

export default NavBarViews;