// screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper'; // Import RadioButton
import userData from '../../assets/data/users.json';
import UserItem from '../components/UserItem';

interface User {
  name: string;
  type: number;
}

const AllUsersScreen: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  // Fetch user data from local JSON file
  useEffect(() => {
    try {
      setUsers(userData.users);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  // Filter users based on selected type
  useEffect(() => {
    if (selectedType !== null) {
      const filtered = users.filter(user => user.type === selectedType);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [selectedType, users]);


  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredUsers}
          renderItem={({ item }) => (
            <UserItem user={item} onPress={() => navigateToUserDetails(item.name)} />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioText: {
    marginLeft: 8,
  },
});

export default AllUsersScreen;
