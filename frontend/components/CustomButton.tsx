import { Text, View, TouchableOpacity } from 'react-native';

export const CustomButton = ({title='Click Me!', onPress, borderRadius = 5, margin=0, backgroundColor='green', width="60%", height = 60, titleColor = '#FFFFF'}) => {
  return (
    <View className='flex justify-center items-center'>
        <TouchableOpacity style={{
            width: width,
            height: height,
            borderRadius: borderRadius,
            margin: margin,
            backgroundColor:backgroundColor,
            display:'flex',
            justifyContent:'center',
            shadowColor: "black",
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0.5,
            shadowRadius: 5,
            elevation: 5, 
        }} onPress={onPress}>
                <Text style={{
                  color: titleColor
                }} className='text-center color-white'>{title}</Text>
         </TouchableOpacity>
    </View>

  );
};
