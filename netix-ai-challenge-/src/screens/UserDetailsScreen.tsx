// screens/UserDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import userData from '../../assets/data/users.json'; // Import local JSON file

interface UserDetailsScreenProps {
  route: RouteProp<{ params: { userName: string } }, 'params'>;
  navigation: StackNavigationProp<any>;
}

interface User {
  name: string;
  type: number;
}

const UserDetailsScreen: React.FC<UserDetailsScreenProps> = ({ route }) => {
  const { userName } = route.params;
  const [user, setUser] = useState<User | null>(null);

  // Fetch user details based on userName
  useEffect(() => {
    const userDetails = userData.users.find((u: User) => u.name === userName);
    if (userDetails) {
      setUser(userDetails);
    }
  }, [userName]);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User not found!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Details</Text>
      <Text>Name: {user.name}</Text>
      <Text>Type: {user.type === 0 ? 'Admin' : 'Manager'}</Text>
    </View>
  );
};

export default UserDetailsScreen;
