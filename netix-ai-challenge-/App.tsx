// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AllUsersScreen from './src/screens/AllUsersScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    <Stack.Screen name="UserDetails" component={UserDetailsScreen} options={{ title: 'User Details' }} />
  </Stack.Navigator>
);


const UsersStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AllUsersScreen" component={AllUsersScreen} options={{ headerShown: false }} />
   </Stack.Navigator>
);

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Users" component={UsersStack} />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
