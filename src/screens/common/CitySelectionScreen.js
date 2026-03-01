import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { useAuth } from '../../navigation/AppNavigator';
import { CITIES } from '../../constants/constants';

const { width, height } = Dimensions.get('window');

const CitySelectionScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { selectCity, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState(CITIES);
  const [selectedCity, setSelectedCity] = useState(null);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = CITIES.filter(
        city =>
          city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          city.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities(CITIES);
    }
  }, [searchQuery]);

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    await selectCity(city);
    navigation.replace('UserTabs');
  };

  const renderCityCard = ({ item, index }) => {
    const cardScale = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });

    return (
      <Animated.View
        style={[
          styles.cityCardContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: cardScale },
              { translateY: slideAnim },
            ],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.cityCard,
            selectedCity?.id === item.id && styles.selectedCityCard,
          ]}
          onPress={() => handleCitySelect(item)}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: `https://picsum.photos/seed/${item.name}/400/200.jpg` }}
            style={styles.cityImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradientOverlay}
          />
          <View style={styles.cityInfo}>
            <Text style={styles.cityName}>{item.name}</Text>
            <Text style={styles.cityState}>{item.state}</Text>
            <View style={styles.cityFeatures}>
              <View style={styles.feature}>
                <Icon name="grass" size={16} color={theme.colors.textLight} />
                <Text style={styles.featureText}>Sports Turfs</Text>
              </View>
              <View style={styles.feature}>
                <Icon name="location-on" size={16} color={theme.colors.textLight} />
                <Text style={styles.featureText}>Premium Locations</Text>
              </View>
            </View>
          </View>
          {selectedCity?.id === item.id && (
            <View style={styles.checkmark}>
              <Icon name="check-circle" size={30} color={theme.colors.primaryLight} />
            </View>
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
      paddingTop: 60,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    subtitle: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.lg,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.lg,
    },
    searchIcon: {
      marginRight: theme.spacing.sm,
    },
    searchInput: {
      flex: 1,
      ...theme.typography.body1,
      color: theme.colors.text,
      paddingVertical: theme.spacing.md,
    },
    cityList: {
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    cityCardContainer: {
      marginBottom: theme.spacing.md,
    },
    cityCard: {
      height: 180,
      borderRadius: theme.borderRadius.lg,
      overflow: 'hidden',
      position: 'relative',
      ...theme.shadows.lg,
    },
    selectedCityCard: {
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    cityImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    gradientOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '70%',
    },
    cityInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: theme.spacing.md,
    },
    cityName: {
      ...theme.typography.h3,
      color: theme.colors.textLight,
      marginBottom: theme.spacing.xs,
    },
    cityState: {
      ...theme.typography.body2,
      color: theme.colors.textLight,
      opacity: 0.9,
      marginBottom: theme.spacing.sm,
    },
    cityFeatures: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    feature: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    featureText: {
      ...theme.typography.caption,
      color: theme.colors.textLight,
      marginLeft: theme.spacing.xs,
    },
    checkmark: {
      position: 'absolute',
      top: theme.spacing.md,
      right: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderRadius: 20,
    },
    popularCities: {
      marginBottom: theme.spacing.lg,
    },
    popularTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
    },
    popularCitiesList: {
      paddingHorizontal: theme.spacing.lg,
    },
    popularCityChip: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.xl,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginRight: theme.spacing.sm,
    },
    popularCityChipText: {
      ...theme.typography.body2,
      color: theme.colors.text,
    },
  });

  return (
    <LinearGradient
      colors={theme.colors.gradient}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Your City</Text>
          <Text style={styles.subtitle}>Choose your city to find the best sports turfs near you</Text>
          
          <View style={styles.searchContainer}>
            <Icon name="search" size={24} color={theme.colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search city or state..."
              placeholderTextColor={theme.colors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <View style={styles.popularCities}>
          <Text style={styles.popularTitle}>Popular Cities</Text>
          <FlatList
            data={['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai']}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const city = CITIES.find(c => c.name === item);
              return (
                <TouchableOpacity
                  style={styles.popularCityChip}
                  onPress={() => handleCitySelect(city)}
                >
                  <Text style={styles.popularCityChipText}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <FlatList
          style={styles.cityList}
          data={filteredCities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCityCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </LinearGradient>
  );
};

export default CitySelectionScreen;
