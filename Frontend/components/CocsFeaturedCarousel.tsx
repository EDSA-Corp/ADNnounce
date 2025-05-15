import React, { useCallback, useRef, useState, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet, ViewToken, FlatList } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');
const featuredItems = [
  { id: '1', image: require('../assets/CocsPage.jpg') },
  { id: '2', image: require('../assets/MerchTrack.jpg') },
  { id: '3', image: require('../assets/OfficalTS.jpg') },
];

const CARD_WIDTH = width;
const CARD_HEIGHT = 300;

// Animated Item
const SliderItem = ({
  item,
  index,
  scrollX,
}: {
  item: { image: any };
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.3, 0, width * 0.3],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle]}>
      <Image source={item.image} style={styles.image} />
    </Animated.View>
  );
};

// Pagination
const Pagination = ({ items, index }: { items: any[]; index: number }) => (
  <View style={styles.paginationContainer}>
    {items.map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          { backgroundColor: i === index ? '#000000' : '#D9D9D9' },
        ]}
      />
    ))}
  </View>
);

const FeaturedCarousel = () => {
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setPaginationIndex(viewableItems[0].index);
        currentIndex.current = viewableItems[0].index;
      }
    },
    []
  );

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex.current + 1) % featuredItems.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={featuredItems}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination items={featuredItems} index={paginationIndex} />
    </View>
  );
};

export default FeaturedCarousel;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  image: {
    width: '90%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 5,
    width: 24,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
