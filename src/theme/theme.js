import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const lightTheme = {
  colors: {
    primary: '#00C896',
    primaryDark: '#00A574',
    primaryLight: '#2DD4A7',
    secondary: '#7C3AED',
    accent: '#FF6B6B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#64748B',
    textLight: '#FFFFFF',
    border: '#E2E8F0',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    shadow: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)',
    gradient: ['#00C896', '#2DD4A7', '#7C3AED'],
    gradientCard: ['#FFFFFF', '#F8FAFC'],
    gradientButton: ['#00C896', '#00A574'],
    gradientAccent: ['#FF6B6B', '#FF8E53'],
    disabled: '#CBD5E1',
    placeholder: '#94A3B8',
    glass: 'rgba(255, 255, 255, 0.8)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
  },
  fonts: {
    regular: {
      fontFamily: 'System',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: 'bold',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
    },
    body1: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 16,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 20,
      },
      shadowOpacity: 0.25,
      shadowRadius: 40,
      elevation: 12,
    },
    colored: {
      shadowColor: '#00C896',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6,
    },
  },
};

const darkTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#2DD4A7',
    primaryDark: '#00C896',
    primaryLight: '#4ADE80',
    background: '#0F172A',
    surface: '#1E293B',
    card: '#334155',
    text: '#F1F5F9',
    textSecondary: '#CBD5E1',
    border: '#475569',
    overlay: 'rgba(0, 0, 0, 0.7)',
    gradient: ['#2DD4A7', '#00C896', '#7C3AED'],
    gradientCard: ['#334155', '#1E293B'],
    gradientButton: ['#2DD4A7', '#00C896'],
    gradientAccent: ['#FF6B6B', '#FF8E53'],
    glass: 'rgba(51, 65, 85, 0.8)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  },
};

export const useTheme = () => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme === 'dark' ? darkTheme : lightTheme);
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      // const savedTheme = await AsyncStorage.getItem('theme');
      // if (savedTheme) {
      //   const isDarkMode = savedTheme === 'dark';
      //   setIsDark(isDarkMode);
      //   setTheme(isDarkMode ? darkTheme : lightTheme);
      // } else {
      //   setIsDark(systemColorScheme === 'dark');
      //   setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
      // }
      setIsDark(systemColorScheme === 'dark');
      setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
    } catch (error) {
      console.log('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setTheme(newIsDark ? darkTheme : lightTheme);
    try {
      // await AsyncStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  return {
    theme,
    isDark,
    toggleTheme,
  };
};

export { lightTheme, darkTheme };
