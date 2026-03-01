/**
 * Turf Booking App - A modern sports turf booking platform
 * with role-based access control for Users, Admins, and Turf Owners
 */

import React from 'react';
import { StatusBar, Platform } from 'react-native';
import AppNavigation from './src/navigation/AppNavigator';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#2E7D32"
        translucent={false}
      />
      <AppNavigation />
    </>
  );
};

export default App;
