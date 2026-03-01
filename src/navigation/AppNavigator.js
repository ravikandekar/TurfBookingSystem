import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from '../theme/theme';
import { USER_ROLES } from '../constants/constants';

// Import Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CitySelectionScreen from '../screens/common/CitySelectionScreen';
import UserHomeScreen from '../screens/user/UserHomeScreen';
import TurfDetailScreen from '../screens/user/TurfDetailScreen';
import BookingScreen from '../screens/user/BookingScreen';
import PaymentScreen from '../screens/user/PaymentScreen';
import BookingHistoryScreen from '../screens/user/BookingHistoryScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

import OwnerDashboardScreen from '../screens/owner/OwnerDashboardScreen';
import OwnerTurfsScreen from '../screens/owner/OwnerTurfsScreen';
import OwnerBookingsScreen from '../screens/owner/OwnerBookingsScreen';
import OwnerReportsScreen from '../screens/owner/OwnerReportsScreen';
import OwnerProfileScreen from '../screens/owner/OwnerProfileScreen';
import TurfRegistrationScreen from '../screens/owner/TurfRegistrationScreen';

// Admin Screens
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminBookingsScreen from '../screens/admin/AdminBookingsScreen';
import { useContext } from 'react';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // const userData = await AsyncStorage.getItem('user');
      // const cityData = await AsyncStorage.getItem('selectedCity');
      
      // if (userData) {
      //   setUser(JSON.parse(userData));
      // }
      // if (cityData) {
      //   setSelectedCity(JSON.parse(cityData));
      // }
    } catch (error) {
      console.log('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData) => {
    try {
      // await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  const logout = async () => {
    try {
      // await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.log('Error removing user data:', error);
    }
  };

  const selectCity = async (city) => {
    try {
      // await AsyncStorage.setItem('selectedCity', JSON.stringify(city));
      setSelectedCity(city);
    } catch (error) {
      console.log('Error saving city data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading,
      selectedCity,
      selectCity,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const MainTabs = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Explore':
              iconName = 'search';
              break;
            case 'Bookings':
              iconName = 'history';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            case 'Admin':
              iconName = 'settings';
              break;
            default:
              iconName = 'help';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          ...theme.shadows.lg,
        },
        headerStyle: {
          backgroundColor: theme.colors.card,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: theme.colors.text,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        // Remove font-related options that might cause the error
        tabBarAllowFontScaling: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={UserHomeScreen} 
        options={{ 
          title: 'Home',
          headerShown: false,
          tabBarLabel: 'Home'
        }} 
      />
      <Tab.Screen 
        name="Explore" 
        component={OwnerDashboardScreen} 
        options={{ 
          title: 'My Turfs',
          headerShown: false,
          tabBarLabel: 'Turfs'
        }} 
      />
      <Tab.Screen 
        name="Bookings" 
        component={BookingHistoryScreen} 
        options={{ 
          title: 'Bookings',
          headerShown: false,
          tabBarLabel: 'Bookings'
        }} 
      />
      {user?.isAdmin && (
        <Tab.Screen 
          name="Admin" 
          component={AdminDashboardScreen} 
          options={{ 
            title: 'Admin',
            headerShown: false,
            tabBarLabel: 'Admin'
          }} 
        />
      )}
      <Tab.Screen 
        name="Profile" 
        component={OwnerProfileScreen} 
        options={{ 
          title: 'Profile',
          headerShown: false,
          tabBarLabel: 'Profile'
        }} 
      />
    </Tab.Navigator>
  );
};


const AppNavigator = () => {
  const { user, isLoading } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: theme.colors.text,
        headerShadowVisible: false,
        cardStyle: { backgroundColor: theme.colors.background },
      }}
    >
      {!user ? (
        // Auth Stack
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="CitySelection" 
            component={CitySelectionScreen} 
            options={{ headerShown: false }}
          />
        </>
      ) : (
        // Main App Stack - Unified for all users
        <>
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="TurfDetail" 
            component={TurfDetailScreen} 
            options={{ 
              title: 'Turf Details',
              presentation: 'modal'
            }}
          />
          <Stack.Screen 
            name="Booking" 
            component={BookingScreen} 
            options={{ 
              title: 'Book Slot',
              presentation: 'modal'
            }}
          />
          <Stack.Screen 
            name="Payment" 
            component={PaymentScreen} 
            options={{ 
              title: 'Payment',
              presentation: 'modal'
            }}
          />
          <Stack.Screen 
            name="TurfRegistration" 
            component={TurfRegistrationScreen} 
            options={{ 
              title: 'Register Turf',
              presentation: 'modal'
            }}
          />
          <Stack.Screen 
            name="OwnerTurfs" 
            component={OwnerTurfsScreen} 
            options={{ 
              title: 'My Turfs',
              presentation: 'modal'
            }}
          />
          <Stack.Screen 
            name="OwnerBookings" 
            component={OwnerBookingsScreen} 
            options={{ 
              title: 'Manage Bookings',
              presentation: 'modal'
            }}
          />
          <Stack.Screen 
            name="OwnerReports" 
            component={OwnerReportsScreen} 
            options={{ 
              title: 'Reports',
              presentation: 'modal'
            }}
          />
          {user?.isAdmin && (
            <Stack.Screen 
              name="AdminBookings" 
              component={AdminBookingsScreen} 
              options={{ 
                title: 'Admin Bookings',
                presentation: 'modal'
              }}
            />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default AppNavigation;
