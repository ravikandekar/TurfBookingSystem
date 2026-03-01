import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Share,
  Alert,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { FACILITIES, SPORTS_TYPES } from '../../constants/constants';

const { width, height } = Dimensions.get('window');

const TurfDetailScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { turf } = route.params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${turf.name} - ${turf.description}. Located at ${turf.location}. Book now!`,
        title: turf.name,
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleBookNow = () => {
    navigation.navigate('Booking', { turf });
  };

  const getSportName = (sportId) => {
    const sport = SPORTS_TYPES.find(s => s.id === sportId);
    return sport ? sport.name : '';
  };

  const getFacilityName = (facilityId) => {
    const facility = FACILITIES.find(f => f.id === facilityId);
    return facility ? facility.name : '';
  };

  const getFacilityIcon = (facilityId) => {
    const facility = FACILITIES.find(f => f.id === facilityId);
    return facility ? facility.icon : '';
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    imageContainer: {
      height: height * 0.35,
      position: 'relative',
    },
    turfImage: {
      width: '100%',
      height: '100%',
    },
    imageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    headerActions: {
      position: 'absolute',
      top: 60,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.lg,
    },
    backButton: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.round,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionButtons: {
      flexDirection: 'row',
    },
    actionButton: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.round,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: theme.spacing.sm,
    },
    imagePagination: {
      position: 'absolute',
      bottom: theme.spacing.md,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.background,
      marginHorizontal: 4,
      opacity: 0.5,
    },
    paginationDotActive: {
      opacity: 1,
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: theme.borderRadius.xl,
      borderTopRightRadius: theme.borderRadius.xl,
      marginTop: -theme.spacing.xl,
      paddingTop: theme.spacing.xl,
    },
    headerInfo: {
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    titleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.md,
    },
    turfName: {
      ...theme.typography.h2,
      color: theme.colors.text,
      flex: 1,
      marginRight: theme.spacing.md,
    },
    priceContainer: {
      alignItems: 'flex-end',
    },
    price: {
      ...theme.typography.h3,
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
    priceUnit: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    locationText: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.sm,
      flex: 1,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
    },
    ratingText: {
      ...theme.typography.body2,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    reviewsText: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.md,
    },
    section: {
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    description: {
      ...theme.typography.body1,
      color: theme.colors.textSecondary,
      lineHeight: 24,
    },
    sportsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    sportChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginRight: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
    },
    sportIcon: {
      marginRight: theme.spacing.sm,
    },
    sportText: {
      ...theme.typography.body2,
      color: theme.colors.text,
    },
    facilitiesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    facilityItem: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
    },
    facilityIcon: {
      marginRight: theme.spacing.sm,
    },
    facilityText: {
      ...theme.typography.body2,
      color: theme.colors.text,
    },
    workingHours: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    workingHoursText: {
      ...theme.typography.body2,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
    },
    bookingBar: {
      backgroundColor: theme.colors.card,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    priceInfo: {
      flex: 1,
    },
    bookButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    bookButtonText: {
      ...theme.typography.h4,
      color: theme.colors.textLight,
      marginRight: theme.spacing.sm,
    },
    thumbnailList: {
      paddingHorizontal: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    thumbnailContainer: {
      flexDirection: 'row',
    },
    thumbnail: {
      width: 60,
      height: 60,
      borderRadius: theme.borderRadius.md,
      marginRight: theme.spacing.sm,
      opacity: 0.6,
    },
    thumbnailActive: {
      opacity: 1,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: turf.images[selectedImage] }}
            style={styles.turfImage}
          />
          <View style={styles.imageOverlay} />
          
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Icon
                  name={isFavorite ? 'favorite' : 'favorite-border'}
                  size={24}
                  color={isFavorite ? theme.colors.error : theme.colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleShare}
              >
                <Icon name="share" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.imagePagination}>
            {turf.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === selectedImage && styles.paginationDotActive
                ]}
              />
            ))}
          </View>
        </View>

        {turf.images.length > 1 && (
          <View style={styles.thumbnailList}>
            <View style={styles.thumbnailContainer}>
              {turf.images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedImage(index)}
                >
                  <Image
                    source={{ uri: image }}
                    style={[
                      styles.thumbnail,
                      index === selectedImage && styles.thumbnailActive
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.headerInfo}>
            <View style={styles.titleRow}>
              <Text style={styles.turfName}>{turf.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>₹{turf.pricePerSlot}</Text>
                <Text style={styles.priceUnit}>/slot</Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <Icon name="location-on" size={20} color={theme.colors.primary} />
              <Text style={styles.locationText}>{turf.location}</Text>
            </View>

            <View style={styles.ratingRow}>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color={theme.colors.accent} />
                <Text style={styles.ratingText}>{turf.rating}</Text>
              </View>
              <Text style={styles.reviewsText}>{turf.reviews} reviews</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{turf.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sports Available</Text>
            <View style={styles.sportsContainer}>
              {turf.sportsType.map(sportId => (
                <View key={sportId} style={styles.sportChip}>
                  <Icon
                    name={SPORTS_TYPES.find(s => s.id === sportId)?.icon || 'sports'}
                    size={20}
                    color={theme.colors.primary}
                    style={styles.sportIcon}
                  />
                  <Text style={styles.sportText}>{getSportName(sportId)}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            <View style={styles.facilitiesGrid}>
              {turf.facilities.map(facilityId => (
                <View key={facilityId} style={styles.facilityItem}>
                  <Icon
                    name={getFacilityIcon(facilityId)}
                    size={20}
                    color={theme.colors.primary}
                    style={styles.facilityIcon}
                  />
                  <Text style={styles.facilityText}>{getFacilityName(facilityId)}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Working Hours</Text>
            <View style={styles.workingHours}>
              <Icon name="schedule" size={20} color={theme.colors.primary} />
              <Text style={styles.workingHoursText}>
                {turf.workingHours.opening} - {turf.workingHours.closing}
              </Text>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <View style={styles.bookingBar}>
        <View style={styles.priceInfo}>
          <Text style={styles.price}>₹{turf.pricePerSlot}</Text>
          <Text style={styles.priceUnit}>per slot</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Book Now</Text>
          <Icon name="arrow-forward" size={20} color={theme.colors.textLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TurfDetailScreen;
