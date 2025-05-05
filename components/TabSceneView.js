import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    runOnJS
} from 'react-native-reanimated';

const TabSceneView = ({activeIndex, routes}) => {

    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(activeIndex);

    // Animate on activeIndex change
    useEffect(()=>{
        if (activeIndex === currentSceneIndex) return;

        // zoom out the current view
        scale.value = withTiming(0.8, { duration: 150 });
        opacity.value = withTiming(0, { duration: 150 }, ()=>{
            // switch view after fade out
            runOnJS(setCurrentSceneIndex)(activeIndex);
            // zoom in new view
            scale.value = withTiming(1, { duration: 200 });
            opacity.value = withTiming(1, { duration: 200 });
        });
    }, [activeIndex]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value
    }));

    const SceneComponent = routes[currentSceneIndex].component;

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.scene, animatedStyle]} >
                <SceneComponent/>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scene: {
        flex: 1
    },
});  

export default TabSceneView;


