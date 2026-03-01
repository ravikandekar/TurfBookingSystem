import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { useAuth } from '../../navigation/AppNavigator';

const ProfileScreen = ({ navigation }) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

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
            // Navigation will be handled automatically by AuthProvider
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'person',
      title: 'Personal Information',
      subtitle: 'Update your personal details',
      onPress: () => Alert.alert('Coming Soon', 'Personal information feature coming soon!'),
    },
    {
      icon: 'location-on',
      title: 'City Selection',
      subtitle: 'Change your preferred city',
      onPress: () => navigation.navigate('CitySelection'),
    },
    {
      icon: 'credit-card',
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
      onPress: () => Alert.alert('Coming Soon', 'Payment methods feature coming soon!'),
    },
    {
      icon: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      onPress: () => {},
      toggle: true,
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      icon: 'location-searching',
      title: 'Location Services',
      subtitle: 'Allow app to access your location',
      onPress: () => {},
      toggle: true,
      value: locationEnabled,
      onToggle: setLocationEnabled,
    },
    {
      icon: 'security',
      title: 'Privacy & Security',
      subtitle: 'Manage your privacy settings',
      onPress: () => Alert.alert('Coming Soon', 'Privacy settings feature coming soon!'),
    },
    {
      icon: 'help',
      title: 'Help & Support',
      subtitle: 'Get help with the app',
      onPress: () => Alert.alert('Help & Support', 'Contact us at support@turfbooking.com'),
    },
    {
      icon: 'info',
      title: 'About',
      subtitle: 'App version and information',
      onPress: () => Alert.alert('About', 'Turf Booking App v1.0.0\n\nYour premium sports turf booking platform.'),
    },
  ];

  const renderMenuItem = (item, index) => {
    const fadeAnim = new React.useRef(new Animated.Value(0)).current;
    
    React.useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.menuItem,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity
          style={styles.menuItemContent}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <View style={styles.menuItemLeft}>
            <View style={[styles.menuIcon, { backgroundColor: theme.colors.primary + '20' }]}>
              <Icon name={item.icon} size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
          {item.toggle ? (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary + '50' }}
              thumbColor={item.value ? theme.colors.primary : theme.colors.textSecondary}
              ios_backgroundColor={theme.colors.border}
            />
          ) : (
            <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    gradient: {
      flex: 1,
    },
    header: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xxl,
    },
    profileCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      alignItems: 'center',
      ...theme.shadows.md,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: theme.spacing.md,
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
      backgroundColor: theme.colors.primary + '20',
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },
    profileRoleText: {
      ...theme.typography.caption,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
    },
    section: {
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
    },
    menuItem: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
      marginBottom: theme.spacing.sm,
      overflow: 'hidden',
    },
    menuItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing.md,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    menuIcon: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    },
    menuText: {
      flex: 1,
    },
    menuTitle: {
      ...theme.typography.body1,
      color: theme.colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    menuSubtitle: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    themeToggle: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      marginBottom: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    themeToggleLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    themeIcon: {
      width: 48,
      height: 48,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? theme.colors.primary + '20' : theme.colors.primary + '10',
      marginRight: theme.spacing.md,
    },
    themeText: {
      flex: 1,
    },
    themeTitle: {
      ...theme.typography.body1,
      color: theme.colors.text,
      fontWeight: '600',
      marginBottom: 2,
    },
    themeSubtitle: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    logoutButton: {
      backgroundColor: theme.colors.error + '20',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: theme.spacing.lg,
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileCard}>
            <Image
              source={{ uri: user?.profileImage || 'https://picsum.photos/seed/profile/200/200.jpg' }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{user?.name || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
            <View style={styles.profileRole}>
              <Text style={styles.profileRoleText}>{user?.role || 'USER'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <View style={styles.themeToggle}>
              <View style={styles.themeToggleLeft}>
                <View style={styles.themeIcon}>
                  <Icon name={isDark ? 'dark-mode' : 'light-mode'} size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.themeText}>
                  <Text style={styles.themeTitle}>Dark Mode</Text>
                  <Text style={styles.themeSubtitle}>
                    {isDark ? 'Dark theme is enabled' : 'Light theme is enabled'}
                  </Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary + '50' }}
                thumbColor={isDark ? theme.colors.primary : theme.colors.textSecondary}
                ios_backgroundColor={theme.colors.border}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            {menuItems.slice(0, 6).map((item, index) => renderMenuItem(item, index))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            {menuItems.slice(6).map((item, index) => renderMenuItem(item, index + 6))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={24} color={theme.colors.error} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;
