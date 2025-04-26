import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
  ViewToken,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from 'components/CustomButton';

const { width } = Dimensions.get('screen');

// ImageSlider Data
type ImageSliderType = {
  title: string;
  image: any;
  description: string;
};

const ImageSlider: ImageSliderType[] = [
  {
    title: '',
    image: require('../assets/ADNnouncelogo.png'),
    description: '',
  },
  {
    title: 'All in One Platform',
    image: require('../assets/AiOPCarousel.png'),
    description:
      'Stay connected and informed with all updates from student government and organizations in one centralized platform.',
  },
  {
    title: 'Raise your Concerns',
    image: require('../assets/RyCCarousel.png'),
    description:
      'Raise your queries or concerns to your student government and student organizations with our chat feature.',
  },
  {
    title: 'Manage Posts',
    image: require('../assets/MPCarousel.png'),
    description: 'Raise your queries or concerns with our chat feature.',
  },
];

// SliderItem
const SliderItem = ({
  item,
  index,
  scrollX,
}: {
  item: ImageSliderType;
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
    <Animated.View style={[sliderStyles.itemContainer, animatedStyle]}>
      <Image source={item.image} />
    </Animated.View>
  );
};

const sliderStyles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
});

// Pagination
const Pagination = ({
  items,
  paginationIndex,
}: {
  items: ImageSliderType[];
  paginationIndex: number;
}) => {
  return (
    <View style={paginationStyles.container}>
      {items.map((_, index) => (
        <View
          key={index}
          style={[
            paginationStyles.dot,
            {
              backgroundColor:
                paginationIndex === index ? '#003A6C' : '#FFFFFF',
            },
          ]}
        />
      ))}
    </View>
  );
};

const paginationStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 5,
    width: 24,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
});

// Slider Component
const Slider = ({ itemList }: { itemList: ImageSliderType[] }) => {
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

      <Pagination items={itemList} paginationIndex={paginationIndex} />
    </View>
  );
};

// OnBoardingScreen
export const OnBoarding= () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={onboardStyles.sliderContainer}>
        <Slider itemList={ImageSlider} />
      </View>
      <View style={onboardStyles.buttonContainer}>
        <CustomButton
          onPress={() => navigation.navigate('Login')}
          title="Sign In"
          backgroundColor="#E6EBF0"
          titleColor="#00294D"
          height={50}
          width="281"
          borderRadius={20}
          margin={20}
          titleStyle={{ fontWeight: 'bold' }}
        />
        <CustomButton
          onPress={() => navigation.navigate('Register')}
          title="Create New Account"
          backgroundColor="#E6EBF0"
          titleColor="#00294D"
          height={50}
          width="281"
          borderRadius={20}
          titleStyle={{ fontWeight: 'bold' }}
        />
      </View>
    </View>
  );
};

const onboardStyles = StyleSheet.create({
  sliderContainer: {
    flex: 7.5,
    backgroundColor: '#27408F',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 2.5,
    backgroundColor: '#27408F',
    alignItems: 'center',
  },
});
