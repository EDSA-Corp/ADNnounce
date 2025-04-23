import { ImageSourcePropType } from 'react-native';

export type ImageSliderType = {
  title: string;
  image: ImageSourcePropType;
  description: string;
};

export const ImageSlider = [
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
