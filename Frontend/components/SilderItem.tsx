import {Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageSliderType } from '../data/SliderData'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
    item: ImageSliderType;
    index: number;
    scrollX: SharedValue<number>
};

const{width} = Dimensions.get("screen");

const SliderItem = ({item, index, scrollX}: Props) => {
    const rnAnimatedStyle = useAnimatedStyle(() => {
        return{
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index-1) * width, index * width, (index+1) * width],
                        [-width *0.30, 0, width * 0.30],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index-1) * width, index * width, (index+1) * width],
                        [0.10, 1, 0.10],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    return (
        <Animated.View style={[styles.itemContainer,rnAnimatedStyle]}>
            <Image source={item.image} />
        </Animated.View>
    )
}

export default SliderItem

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        width: width
    }
})