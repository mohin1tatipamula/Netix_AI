// components/UserItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface User {
  name: string;
  type: number;
}

interface UserItemProps {
  user: User;
  onPress: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userType}>{user.type === 0 ? 'Admin' : 'Manager'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userType: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserItem;
