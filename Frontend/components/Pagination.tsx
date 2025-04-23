import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ImageSliderType } from 'data/SliderData';
import { SharedValue } from 'react-native-reanimated';

type Props = {
    items: ImageSliderType[];
    paginationIndex: number;
    scrollX: SharedValue<number>
}

const Pagination = ({items, paginationIndex, scrollX}: Props) => {
    return (
        <View style={styles.container}>
            {items.map((_,index) => {
                console.log('paginationIndex: ', paginationIndex);
                return (
                    <View key={index} style={[styles.dot, {backgroundColor: paginationIndex === index ? '#003A6C' : '#FFFFFF' }]} />
                );
            })}
        </View>
    )
}

export default Pagination

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        backgroundColor: '#FFFFFF',
        height: 5,
        width: 24,
        marginHorizontal: 5,
        borderRadius: 8,
    }
})

