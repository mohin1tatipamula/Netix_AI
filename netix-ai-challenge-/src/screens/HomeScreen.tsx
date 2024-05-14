// screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper'; // Import RadioButton
import userData from '../../assets/data/users.json';
import UserItem from '../components/UserItem';

interface User {
  name: string;
  type: number;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedSubType, setSubSelectedType] = useState<String>("All");

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

  const navigateToUserDetails = (userName: string) => {
    navigation.navigate('UserDetails', { userName });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>User Type</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, selectedType === 0 && styles.selectedButton]}
          onPress={() => {setSelectedType(0); setSubSelectedType("Admin")}}
        >
          <Text style={[styles.buttonText, selectedType === 0 && styles.selectedText]}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, selectedType === 1 && styles.selectedButton]}
          onPress={() => {setSelectedType(1);  setSubSelectedType("Manager")}}
        >
          <Text style={[styles.buttonText, selectedType === 1 && styles.selectedText]}>Manager</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
      <Text style={styles.title}>${selectedSubType} Type</Text>
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
    textAlign: 'left',
    margin: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  radioButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007aff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#007aff',
  },
  buttonText: {
    color: '#007aff',
    textAlign: 'center',
  },
  selectedText: {
    color: '#fff',
  },
});

export default HomeScreen;
