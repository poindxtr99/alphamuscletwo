import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import NavBarViews from './NavbarViews';
import Animated, {withTiming, useSharedValue, useAnimatedStyle, Easing, ReduceMotion} from "react-native-reanimated";
import Tab from './Tab';


const { height, width } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 50;
const MAX_TRANSLATE_Y = -height + STATUS_BAR_HEIGHT + 50;
const EXPANDED_WIDTH = width - 30;
const tabRoutes = [
    { key: 'workouts', iconName: 'add-circle-outline', },
    { key: 'favorites', iconName: 'star-outline', },
    { key: 'profile', iconName: 'person-circle-outline', },
];



const NavBar = () => {
    // props to add: maxHeight, maxWidth
    const initTabBarWidth = 150;
    const initX = -(width * 0.15 - initTabBarWidth)/2;
    const tabBarWidth = useSharedValue(initTabBarWidth);
    const translateX = useSharedValue(initX);
    const [expanded, setExpanded] = useState(false);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: tabBarWidth.value,
            transform: [{ translateX: translateX.value}],
        }
    });


    // when the buttons are pressed then the backsheet should open
    const ref = useRef(null);
    const onPress = useCallback(() => {
        ref?.current?.scrollTo(MAX_TRANSLATE_Y);
    }, []);

    const handleViewChange = useCallback((key) => {
        ref?.current?.handleTabPress(key);
    }, []);
    
    //
    const updateTabBar = () => {
        if (!expanded) {
            tabBarWidth.value = withTiming(EXPANDED_WIDTH, {
                duration: 1000,
                easing: Easing.elastic(1),
                reduceMotion: ReduceMotion.System
            });
            translateX.value = withTiming(0, {duration: 500});
           setExpanded(true); 
           //show the Navbar Views
           onPress();
        }
    }

    //
    const collapseTabBar = () => {
        tabBarWidth.value = withTiming(initTabBarWidth, { duration: 500 });
        translateX.value = withTiming(initX, {duration: 500});
        setExpanded(false);
    }

    // initialize the tabBar
    useEffect(() => {
        collapseTabBar();
    }, []);

    //
    const RenderTabBar = ({}) => (
        <Animated.View style={[styles.navbar, animatedStyle]}>
            {tabRoutes.map((route, index) => {
                return (
                    <Tab
                        key = {route.iconName}
                        icon={route.iconName}
                        onPress={() => {
                            updateTabBar(); 
                            handleViewChange(route.key);
                        }}
                    />
                )
            })}
        </Animated.View>
    );

    return (
        <Animated.View style = { styles.navbarContainer } pointerEvents="box-none">
            <NavBarViews ref={ref} onHideViews={collapseTabBar}/>
            <RenderTabBar/>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    navbarContainer: {
        height: height,
        width: width,
        backgroundColor: 'red',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },

    navbarView: {

    },

    addButton: {
        height: 100,
        borderRadius: 50,
        aspectRatio: 1,
        backgroundColor: 'white',
        bottom: 50,
        top: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },

    button: {
        height: 50,
        borderRadius: 25,
        aspectRatio: 1,
        flex: 1,
        backgroundColor: 'white',
        bottom: 50,
        top: 100,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },

    navbar: {
        padding: 8,
        bottom: 160,
        height: 50,
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {
            width: 2.5,
            height: 2.5
        },
        shadowOpacity: 0.5,
        shadowRadius: 1
    }
});
export default NavBar;