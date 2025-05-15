import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

const ForAllRadialBackground = () => {
  return (
    <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <RadialGradient
          id="grad"
          cx="50%"
          cy="0%"
          rx="3580%" 
          ry="500%"  
          fx="50%"
          fy="0%"
        >
          <Stop offset="0%" stopColor="#003A6C" stopOpacity="1" />
          <Stop offset="20%" stopColor="#e0e0e0" stopOpacity="1" />
          <Stop offset="100%" stopColor="white" stopOpacity="1" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
};

export default ForAllRadialBackground;
