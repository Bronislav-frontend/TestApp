import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { getImages } from '../redux/gallery-slice';

export const Gallery = ({ navigation }) => {
  const dispatch = useDispatch();
  const images = useSelector(state => state.gallery.images);
  const isLoading = useSelector(state => state.gallery.loading);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getImages(page));
  }, [dispatch, page]);

  const Item = ({ smallImage, bigImage, imageName, author }) => (
    <View>
      <DropShadow style={styles.shadowProp}>
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
      </DropShadow>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.item,
        { flex: 1 },
        index % 2 === 0 ? { marginRight: 5 } : { marginLeft: 5 },
      ]}
    >
      <Item
        smallImage={item.urls.small}
        bigImage={item.urls.regular}
        imageName={item.description ? item.description : 'Unknown'}
        author={item.user.name ? item.user.name : 'Unknown'}
        navigation={navigation}
      />
    </View>
  );

  const listRef = useRef(null);

  const ItemDivider = () => {
    return <View style={styles.itemDivider} />;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <>
          <FlatList
            ItemSeparatorComponent={ItemDivider}
            ref={listRef}
            data={images}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
          />
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              disabled={isLoading}
              onPress={() => {
                setPage(page + 1);
                listRef.current.scrollToOffset({ offset: 0, animated: true });
              }}
            >
              <Text style={styles.btnText}>Next images</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  item: {
    overflow: 'hidden',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#5f9ea0',
  },
  itemDivider: {
    height: 10,
    width: '100%',
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
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#7fffd4',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#191970',
  },
});
