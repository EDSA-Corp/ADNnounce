import { ImageSlider, ImageSliderType } from '../data/SliderData';
import React, { useRef, useState, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, ViewToken, Dimensions } from 'react-native';
import SliderItem from './SilderItem';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Pagination from './Pagination';

const { width } = Dimensions.get('screen');

type Props = { itemList: ImageSliderType[] };

export default function Slider({ itemList }: Props) {
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [data, setData] = useState(itemList);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });


  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setPaginationIndex(viewableItems[0].index % itemList.length);
      }
    },
    []
  );

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  return (
    <View>
      <Animated.FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}             
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onEndReached={() => setData((prev) => [...prev, ...itemList])}
        onEndReachedThreshold={0.5}
      />

      <Pagination
        items={itemList}
        paginationIndex={paginationIndex}
        scrollX={scrollX}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
