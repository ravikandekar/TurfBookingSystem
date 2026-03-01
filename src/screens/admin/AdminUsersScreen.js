import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { STATIC_USERS } from '../../constants/constants';

const AdminUsersScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, selectedRole]);

  const loadUsers = () => {
    setUsers(STATIC_USERS);
  };

  const filterUsers = () => {
    let filtered = users;

    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.mobile.includes(searchQuery)
      );
    }

    setFilteredUsers(filtered);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadUsers();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'ADMIN':
        return theme.colors.error;
      case 'OWNER':
        return theme.colors.warning;
      case 'USER':
        return theme.colors.success;
      default:
        return theme.colors.textSecondary;
    }
  };

  const renderUserCard = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
          <Text style={styles.userMobile}>
            <Icon name="phone" size={14} color={theme.colors.textSecondary} />
            {' '}{item.mobile}
          </Text>
        </View>
        <View style={[styles.roleBadge, { backgroundColor: getRoleColor(item.role) + '20' }]}>
          <Text style={[styles.roleText, { color: getRoleColor(item.role) }]}>
            {item.role}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => Alert.alert('Edit User', 'Edit user feature coming soon!')}
        >
          <Icon name="edit" size={16} color={theme.colors.primary} />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => {
            Alert.alert(
              'Delete User',
              'Are you sure you want to delete this user?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => {} },
              ]
            );
          }}
        >
          <Icon name="delete" size={16} color={theme.colors.error} />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRoleFilter = (role) => {
    const isSelected = selectedRole === role.value;
    const count = users.filter(u => role.value === 'all' ? true : u.role === role.value).length;

    return (
      <TouchableOpacity
        key={role.value}
        style={[
          styles.filterChip,
          isSelected && styles.selectedFilterChip,
        ]}
        onPress={() => setSelectedRole(role.value)}
      >
        <Text style={[
          styles.filterChipText,
          isSelected && styles.selectedFilterChipText,
        ]}>
          {role.label} ({count})
        </Text>
      </TouchableOpacity>
    );
  };

  const roleFilters = [
    { label: 'All', value: 'all' },
    { label: 'Users', value: 'USER' },
    { label: 'Owners', value: 'OWNER' },
    { label: 'Admins', value: 'ADMIN' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.card,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
    searchIcon: {
      marginRight: theme.spacing.sm,
    },
    searchInput: {
      flex: 1,
      ...theme.typography.body1,
      color: theme.colors.text,
      paddingVertical: theme.spacing.sm,
    },
    filterContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    filterChip: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.xl,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginRight: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
    },
    selectedFilterChip: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    filterChipText: {
      ...theme.typography.body2,
      color: theme.colors.text,
    },
    selectedFilterChipText: {
      color: theme.colors.textLight,
    },
    userList: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    userCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      ...theme.shadows.md,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.md,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    userEmail: {
      ...theme.typography.body1,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    userMobile: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
    },
    roleBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
    },
    roleText: {
      ...theme.typography.caption,
      fontWeight: '600',
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: theme.spacing.xs,
    },
    editButton: {
      backgroundColor: theme.colors.primary + '10',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    editButtonText: {
      ...theme.typography.caption,
      color: theme.colors.primary,
      fontWeight: '600',
      marginLeft: theme.spacing.xs,
    },
    deleteButton: {
      backgroundColor: theme.colors.error + '10',
      borderWidth: 1,
      borderColor: theme.colors.error,
    },
    deleteButtonText: {
      ...theme.typography.caption,
      color: theme.colors.error,
      fontWeight: '600',
      marginLeft: theme.spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Users</Text>
        
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            placeholderTextColor={theme.colors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          {roleFilters.map(renderRoleFilter)}
        </View>
      </View>

      <FlatList
        style={styles.userList}
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUserCard}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: theme.spacing.xxl }}>
            <Icon name="people" size={64} color={theme.colors.textSecondary} />
            <Text style={{ ...theme.typography.body1, color: theme.colors.textSecondary, marginTop: theme.spacing.md }}>
              No users found
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default AdminUsersScreen;
