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
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { useAuth } from '../../navigation/AppNavigator';
import { STATIC_TURFS, SPORTS_TYPES, FACILITIES } from '../../constants/constants';

const { width } = Dimensions.get('window');

const UserHomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { selectedCity } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTurfs, setFilteredTurfs] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTurfs();
  }, [selectedCity, selectedSport]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = filteredTurfs.filter(
        turf =>
          turf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          turf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          turf.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTurfs(filtered);
    } else {
      loadTurfs();
    }
  }, [searchQuery]);

  const loadTurfs = () => {
    setIsLoading(true);
    setTimeout(() => {
      let turfs = STATIC_TURFS.filter(
        turf => turf.cityId === selectedCity?.id && turf.subscriptionStatus === 'ACTIVE'
      );

      if (selectedSport) {
        turfs = turfs.filter(turf => turf.sportsType.includes(selectedSport));
      }

      setFilteredTurfs(turfs);
      setIsLoading(false);
    }, 500);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadTurfs();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderTurfCard = ({ item, index }) => {
    const fadeAnim = new Animated.Value(0);
    
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    const getSportName = (sportId) => {
      const sport = SPORTS_TYPES.find(s => s.id === sportId);
      return sport ? sport.name : '';
    };

    const getFacilityIcons = (facilityIds) => {
      return facilityIds.slice(0, 4).map(id => {
        const facility = FACILITIES.find(f => f.id === id);
        return facility ? facility.icon : '';
      });
    };

    return (
      <Animated.View
        style={[
          styles.turfCardContainer,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableOpacity
          style={styles.turfCard}
          onPress={() => navigation.navigate('TurfDetail', { turf: item })}
          activeOpacity={0.8}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.images[0] }}
              style={styles.turfImage}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={styles.imageGradient}
            />
            <View style={styles.priceBadge}>
              <Text style={styles.priceText}>₹{item.pricePerSlot}</Text>
              <Text style={styles.priceUnit}>/slot</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color={theme.colors.accent} />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          <View style={styles.turfInfo}>
            <Text style={styles.turfName}>{item.name}</Text>
            <Text style={styles.turfLocation} numberOfLines={1}>
              <Icon name="location-on" size={14} color={theme.colors.textSecondary} />
              {' '}{item.location}
            </Text>
            
            <View style={styles.sportsContainer}>
              {item.sportsType.map(sportId => (
                <View key={sportId} style={styles.sportChip}>
                  <Text style={styles.sportText}>{getSportName(sportId)}</Text>
                </View>
              ))}
            </View>

            <View style={styles.facilitiesContainer}>
              {getFacilityIcons(item.facilities).map((icon, index) => (
                <Icon
                  key={index}
                  name={icon}
                  size={20}
                  color={theme.colors.textSecondary}
                  style={styles.facilityIcon}
                />
              ))}
              {item.facilities.length > 4 && (
                <Text style={styles.moreFacilities}>+{item.facilities.length - 4}</Text>
              )}
            </View>

            <View style={styles.footer}>
              <Text style={styles.reviewsText}>{item.reviews} reviews</Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderSportFilter = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.sportFilter,
        selectedSport === item.id && styles.selectedSportFilter
      ]}
      onPress={() => setSelectedSport(selectedSport === item.id ? null : item.id)}
    >
      <Icon
        name={item.icon}
        size={20}
        color={selectedSport === item.id ? theme.colors.textLight : theme.colors.primary}
      />
      <Text style={[
        styles.sportFilterText,
        selectedSport === item.id && styles.selectedSportFilterText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingTop: 60,
      paddingHorizontal: theme.spacing.lg,
      paddingBottom: theme.spacing.lg,
    },
    headerGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 200,
      zIndex: -1,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    greeting: {
      ...theme.typography.h2,
      color: theme.colors.text,
      fontWeight: 'bold',
    },
    locationText: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: theme.spacing.xs,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.glass,
      borderWidth: 1,
      borderColor: theme.colors.glassBorder,
      borderRadius: theme.borderRadius.xl,
      paddingHorizontal: theme.spacing.md,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.md,
    },
    searchIcon: {
      marginRight: theme.spacing.sm,
      color: theme.colors.textSecondary,
    },
    searchInput: {
      flex: 1,
      ...theme.typography.body1,
      color: theme.colors.text,
      paddingVertical: theme.spacing.md,
    },
    filterButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.md,
      marginLeft: theme.spacing.sm,
      ...theme.shadows.colored,
    },
    sportFilters: {
      marginBottom: theme.spacing.md,
    },
    sportFiltersList: {
      paddingHorizontal: theme.spacing.lg,
    },
    sportFilter: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.xl,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginRight: theme.spacing.sm,
    },
    selectedSportFilter: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    sportFilterText: {
      ...theme.typography.body2,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    selectedSportFilterText: {
      color: theme.colors.textLight,
    },
    turfList: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
    },
    turfCardContainer: {
      marginBottom: theme.spacing.lg,
    },
    turfCard: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
      ...theme.shadows.lg,
      transform: [{ scale: 1 }],
    },
    imageContainer: {
      height: 220,
      position: 'relative',
    },
    turfImage: {
      width: '100%',
      height: '100%',
    },
    imageGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '60%',
    },
    priceBadge: {
      position: 'absolute',
      top: theme.spacing.md,
      left: theme.spacing.md,
      backgroundColor: theme.colors.glass,
      borderWidth: 1,
      borderColor: theme.colors.glassBorder,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
    },
    priceText: {
      ...theme.typography.h3,
      color: theme.colors.text,
      fontWeight: 'bold',
    },
    priceUnit: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginLeft: 2,
    },
    ratingContainer: {
      position: 'absolute',
      top: theme.spacing.md,
      right: theme.spacing.md,
      backgroundColor: theme.colors.glass,
      borderWidth: 1,
      borderColor: theme.colors.glassBorder,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
    },
    ratingText: {
      ...theme.typography.body2,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    turfInfo: {
      padding: theme.spacing.md,
    },
    turfName: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    turfLocation: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.md,
    },
    sportsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: theme.spacing.md,
    },
    sportChip: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      marginRight: theme.spacing.sm,
      marginBottom: theme.spacing.xs,
    },
    sportText: {
      ...theme.typography.caption,
      color: theme.colors.text,
    },
    facilitiesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    facilityIcon: {
      marginRight: theme.spacing.sm,
    },
    moreFacilities: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    reviewsText: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    bookButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      ...theme.shadows.colored,
    },
    bookButtonText: {
      ...theme.typography.body1,
      color: theme.colors.textLight,
      fontWeight: 'bold',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.xxl,
    },
    emptyStateIcon: {
      marginBottom: theme.spacing.md,
    },
    emptyStateText: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

  if (!selectedCity) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Icon name="location-off" size={64} color={theme.colors.textSecondary} style={styles.emptyStateIcon} />
          <Text style={styles.emptyStateText}>Please select a city to view available turfs</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={theme.colors.gradient}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Discover Turfs</Text>
            <Text style={styles.locationText}>
              <Icon name="location-on" size={16} color={theme.colors.primary} />
              {' '}{selectedCity.name}
            </Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter-list" size={24} color={theme.colors.textLight} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search turfs, locations..."
            placeholderTextColor={theme.colors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.sportFilters}>
        <FlatList
          data={SPORTS_TYPES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderSportFilter}
          contentContainerStyle={styles.sportFiltersList}
        />
      </View>

      <FlatList
        style={styles.turfList}
        data={filteredTurfs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTurfCard}
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
          <View style={styles.emptyState}>
            <Icon name="grass" size={64} color={theme.colors.textSecondary} style={styles.emptyStateIcon} />
            <Text style={styles.emptyStateText}>No turfs found in your area</Text>
          </View>
        }
      />
    </View>
  );
};

export default UserHomeScreen;
