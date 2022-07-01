import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import { getImages } from '../redux/gallery-slice';

export const Gallery = ({ navigation }) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.gallery.images);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getImages(page));
  }, [dispatch, page]);

  const Item = ({ smallImage, bigImage, imageName, author }) => (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate({
            name: 'Image',
            params: { image: bigImage },
            merge: true,
          });
        }}
      >
        <Image source={{ uri: smallImage }} style={styles.image} />
        <View style={styles.imageName}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {imageName}
          </Text>
        </View>
        <View style={styles.authorName}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            Author:
            {author}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Item
        style={styles.item}
        smallImage={item.urls.small}
        bigImage={item.urls.regular}
        imageName={item.description ? item.description : 'Unknown'}
        author={item.user.name ? item.user.name : 'Unknown'}
      />
    </View>
  );

  const listRef = useRef(null);

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      />
      <Button
        title="Next Page"
        onPress={() => {
          setPage(page + 1);
          listRef.current.scrollToOffset({ offset: 0, animated: true });
        }}
      />
    </View>
  );
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: window.width / 2,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 10,
    borderColor: '#5f9ea0',
  },
  image: {
    height: window.height / 3,
  },
  imageName: {
    alignSelf: 'center',
  },
  authorName: {
    alignSelf: 'center',
  },
});
