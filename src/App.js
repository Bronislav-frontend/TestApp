import React from 'react';
import { Gallery } from './components/Gallery';
import { ImageView } from './components/ImageView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gallery">
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{
            title: 'Gallery',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#5f9ea0' },
          }}
        />
        <Stack.Screen
          name="Image"
          component={ImageView}
          options={{
            title: 'Image',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#5f9ea0' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
