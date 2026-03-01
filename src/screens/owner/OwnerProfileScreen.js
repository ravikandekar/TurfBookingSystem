import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { useAuth } from '../../navigation/AppNavigator';

const OwnerProfileScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Owner One',
    email: user?.email || 'owner1@example.com',
    mobile: user?.mobile || '+919876543212',
    address: '123 Business Ave, Mumbai, Maharashtra 400001',
    description: 'Premium sports turf operator with 5+ years of experience',
  });

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const renderProfileField = (label, value, key, editable = true) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          style={styles.fieldInput}
          value={value}
          onChangeText={(text) => setProfileData({ ...profileData, [key]: text })}
          multiline={key === 'description'}
          numberOfLines={key === 'description' ? 3 : 1}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  const renderMenuItems = () => {
    const menuItems = [
      {
        icon: 'lock',
        title: 'Change Password',
        onPress: () => Alert.alert('Change Password', 'Password change feature coming soon!'),
      },
      {
        icon: 'notifications',
        title: 'Notification Settings',
        onPress: () => Alert.alert('Notifications', 'Notification settings coming soon!'),
      },
      {
        icon: 'help',
        title: 'Help & Support',
        onPress: () => Alert.alert('Help & Support', 'Contact us at support@turfbooking.com'),
      },
      {
        icon: 'info',
        title: 'About',
        onPress: () => Alert.alert('About', 'Turf Booking App v1.0.0\n\nYour premium sports turf booking platform.'),
      },
    ];

    return menuItems.map((item, index) => (
      <TouchableOpacity
        key={index}
        style={styles.menuItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemLeft}>
          <View style={[styles.menuIcon, { backgroundColor: theme.colors.primary + '20' }]}>
            <Icon name={item.icon} size={24} color={theme.colors.primary} />
          </View>
          <Text style={styles.menuTitle}>{item.title}</Text>
        </View>
        <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    ));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    gradient: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    header: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    profileCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      alignItems: 'center',
      ...theme.shadows.md,
    },
    profileImageContainer: {
      position: 'relative',
      marginBottom: theme.spacing.md,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    editImageButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.round,
      width: 32,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.card,
    },
    profileName: {
      ...theme.typography.h3,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    profileEmail: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
    },
    profileRole: {
      backgroundColor: theme.colors.warning + '20',
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },
    profileRoleText: {
      ...theme.typography.caption,
      color: theme.colors.warning,
      fontWeight: '600',
    },
    editButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.md,
    },
    editButtonText: {
      ...theme.typography.body2,
      color: theme.colors.textLight,
      fontWeight: '600',
      marginLeft: theme.spacing.sm,
    },
    saveButton: {
      backgroundColor: theme.colors.success,
    },
    section: {
      backgroundColor: theme.colors.card,
      marginHorizontal: theme.spacing.lg,
      marginTop: theme.spacing.lg,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      ...theme.shadows.md,
    },
    sectionTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    fieldContainer: {
      marginBottom: theme.spacing.md,
    },
    fieldLabel: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
    },
    fieldInput: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      fontSize: 16,
      color: theme.colors.text,
    },
    fieldValue: {
      ...theme.typography.body1,
      color: theme.colors.text,
    },
    menuSection: {
      marginTop: theme.spacing.lg,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
      backgroundColor: theme.colors.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    menuItemLastChild: {
      borderBottomWidth: 0,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuIcon: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    menuTitle: {
      ...theme.typography.body1,
      color: theme.colors.text,
      fontWeight: '500',
    },
    logoutButton: {
      backgroundColor: theme.colors.error + '20',
      marginHorizontal: theme.spacing.lg,
      marginTop: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoutButtonText: {
      ...theme.typography.body1,
      color: theme.colors.error,
      fontWeight: '600',
      marginLeft: theme.spacing.sm,
    },
  });

  return (
    <LinearGradient
      colors={theme.colors.gradient}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: user?.profileImage || 'https://picsum.photos/seed/owner/200/200.jpg' }}
                style={styles.profileImage}
              />
              {isEditing && (
                <TouchableOpacity style={styles.editImageButton}>
                  <Icon name="camera-alt" size={16} color={theme.colors.textLight} />
                </TouchableOpacity>
              )}
            </View>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileEmail}>{profileData.email}</Text>
            <View style={styles.profileRole}>
              <Text style={styles.profileRoleText}>TURF OWNER</Text>
            </View>
            
            <TouchableOpacity
              style={[styles.editButton, isEditing && styles.saveButton]}
              onPress={isEditing ? handleSave : () => setIsEditing(true)}
            >
              <Icon name={isEditing ? 'save' : 'edit'} size={20} color={theme.colors.textLight} />
              <Text style={styles.editButtonText}>
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          {renderProfileField('Business Name', profileData.name, 'name')}
          {renderProfileField('Email Address', profileData.email, 'email')}
          {renderProfileField('Mobile Number', profileData.mobile, 'mobile')}
          {renderProfileField('Business Address', profileData.address, 'address')}
          {renderProfileField('Description', profileData.description, 'description')}
        </View>

        <View style={styles.menuSection}>
          {renderMenuItems()}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={24} color={theme.colors.error} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default OwnerProfileScreen;
