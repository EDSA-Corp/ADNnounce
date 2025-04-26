import { Text, View, TouchableOpacity, Image } from 'react-native';

export const CustomButton = ({
  title = 'Click Me!',
  onPress,
  borderRadius = 5,
  margin = 0,
  backgroundColor = 'green',
  width = '60%',
  height = 60,
  titleColor = '#FFFFFF',
  icon = null,
}) => {
  return (
    <View className="flex items-center justify-center">
      <TouchableOpacity
        style={{
          width: width,
          height: height,
          borderRadius: borderRadius,
          margin: margin,
          backgroundColor: backgroundColor,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: 'black',
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 5,
        }}
        onPress={onPress}>
        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
        <Text
          style={{
            color: titleColor,
          }}
          className="text-center">
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
