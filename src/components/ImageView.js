import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const ImageView = ({ route }) => {
  return (
    <View>
      <Image source={{ uri: route.params.image }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: window.width,
    height: window.height,
  },
});
