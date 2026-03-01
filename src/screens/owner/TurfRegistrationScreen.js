import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { CITIES, FACILITIES, SPORTS_TYPES, TIME_SLOTS } from '../../constants/constants';

const TurfRegistrationScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cityId: null,
    location: '',
    latitude: '',
    longitude: '',
    pricePerSlot: '',
    weekendPrice: '',
    sportsType: [],
    facilities: [],
    workingHours: {
      opening: '06:00',
      closing: '23:00',
    },
    slotDuration: '60',
    images: [],
  });

  const handleCitySelect = () => {
    Alert.alert(
      'Select City',
      'Choose your city',
      CITIES.map(city => ({
        text: `${city.name}, ${city.state}`,
        onPress: () => setFormData({ ...formData, cityId: city.id }),
      }))
    );
  };

  const handleSportToggle = (sportId) => {
    const newSportsType = formData.sportsType.includes(sportId)
      ? formData.sportsType.filter(id => id !== sportId)
      : [...formData.sportsType, sportId];
    setFormData({ ...formData, sportsType: newSportsType });
  };

  const handleFacilityToggle = (facilityId) => {
    const newFacilities = formData.facilities.includes(facilityId)
      ? formData.facilities.filter(id => id !== facilityId)
      : [...formData.facilities, facilityId];
    setFormData({ ...formData, facilities: newFacilities });
  };

  const handleImageUpload = () => {
    Alert.alert('Upload Images', 'Image upload feature coming soon!');
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.description || !formData.cityId || !formData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!formData.pricePerSlot || formData.sportsType.length === 0) {
      Alert.alert('Error', 'Please set price and select at least one sport type');
      return;
    }

    Alert.alert(
      'Success',
      'Turf registration submitted successfully! It will be reviewed by admin.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const renderSportChip = (sport) => {
    const isSelected = formData.sportsType.includes(sport.id);
    return (
      <TouchableOpacity
        key={sport.id}
        style={[
          styles.chip,
          isSelected && styles.selectedChip,
        ]}
        onPress={() => handleSportToggle(sport.id)}
      >
        <Icon
          name={sport.icon}
          size={16}
          color={isSelected ? theme.colors.textLight : theme.colors.primary}
        />
        <Text style={[
          styles.chipText,
          isSelected && styles.selectedChipText,
        ]}>
          {sport.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFacilityChip = (facility) => {
    const isSelected = formData.facilities.includes(facility.id);
    return (
      <TouchableOpacity
        key={facility.id}
        style={[
          styles.chip,
          isSelected && styles.selectedChip,
        ]}
        onPress={() => handleFacilityToggle(facility.id)}
      >
        <Icon
          name={facility.icon}
          size={16}
          color={isSelected ? theme.colors.textLight : theme.colors.primary}
        />
        <Text style={[
          styles.chipText,
          isSelected && styles.selectedChipText,
        ]}>
          {facility.name}
        </Text>
      </TouchableOpacity>
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
    content: {
      flex: 1,
      padding: theme.spacing.lg,
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
      marginBottom: theme.spacing.lg,
    },
    section: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.lg,
      ...theme.shadows.md,
    },
    sectionTitle: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    inputContainer: {
      marginBottom: theme.spacing.md,
    },
    label: {
      ...theme.typography.body2,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    required: {
      color: theme.colors.error,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      fontSize: 16,
      color: theme.colors.text,
    },
    textArea: {
      height: 80,
      textAlignVertical: 'top',
    },
    selector: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectorText: {
      ...theme.typography.body1,
      color: theme.colors.text,
      flex: 1,
    },
    selectorPlaceholder: {
      ...theme.typography.body1,
      color: theme.colors.placeholder,
    },
    timeSlotRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timeSlotInput: {
      flex: 1,
      marginRight: theme.spacing.sm,
    },
    timeSlotInputLastChild: {
      marginRight: 0,
    },
    chipsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      marginRight: theme.spacing.sm,
      marginBottom: theme.spacing.sm,
    },
    selectedChip: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    chipText: {
      ...theme.typography.caption,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
    },
    selectedChipText: {
      color: theme.colors.textLight,
    },
    imageUploadContainer: {
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.xl,
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
    },
    uploadIcon: {
      marginBottom: theme.spacing.sm,
    },
    uploadText: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
      ...theme.shadows.lg,
    },
    submitButtonText: {
      ...theme.typography.h4,
      color: theme.colors.textLight,
      fontWeight: 'bold',
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
        <Text style={styles.title}>Register New Turf</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Turf Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter turf name"
              placeholderTextColor={theme.colors.placeholder}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your turf..."
              placeholderTextColor={theme.colors.placeholder}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>City <Text style={styles.required}>*</Text></Text>
            <TouchableOpacity style={styles.selector} onPress={handleCitySelect}>
              <Text style={formData.cityId ? styles.selectorText : styles.selectorPlaceholder}>
                {formData.cityId 
                  ? CITIES.find(c => c.id === formData.cityId)?.name 
                  : 'Select city'
                }
              </Text>
              <Icon name="chevron-right" size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter complete address"
              placeholderTextColor={theme.colors.placeholder}
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing & Timing</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price per Slot (₹) <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter price per slot"
              placeholderTextColor={theme.colors.placeholder}
              value={formData.pricePerSlot}
              onChangeText={(text) => setFormData({ ...formData, pricePerSlot: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weekend Price (₹) (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Weekend price (if different)"
              placeholderTextColor={theme.colors.placeholder}
              value={formData.weekendPrice}
              onChangeText={(text) => setFormData({ ...formData, weekendPrice: text })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Working Hours</Text>
            <View style={styles.timeSlotRow}>
              <TextInput
                style={[styles.input, styles.timeSlotInput]}
                placeholder="Opening time"
                placeholderTextColor={theme.colors.placeholder}
                value={formData.workingHours.opening}
                onChangeText={(text) => setFormData({ 
                  ...formData, 
                  workingHours: { ...formData.workingHours, opening: text }
                })}
              />
              <TextInput
                style={[styles.input, styles.timeSlotInput]}
                placeholder="Closing time"
                placeholderTextColor={theme.colors.placeholder}
                value={formData.workingHours.closing}
                onChangeText={(text) => setFormData({ 
                  ...formData, 
                  workingHours: { ...formData.workingHours, closing: text }
                })}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Slot Duration (minutes)</Text>
            <TextInput
              style={styles.input}
              placeholder="Duration per slot"
              placeholderTextColor={theme.colors.placeholder}
              value={formData.slotDuration}
              onChangeText={(text) => setFormData({ ...formData, slotDuration: text })}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sports Types <Text style={styles.required}>*</Text></Text>
          <View style={styles.chipsContainer}>
            {SPORTS_TYPES.map(renderSportChip)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.chipsContainer}>
            {FACILITIES.map(renderFacilityChip)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Turf Images</Text>
          <TouchableOpacity style={styles.imageUploadContainer} onPress={handleImageUpload}>
            <Icon name="add-photo-alternate" size={48} color={theme.colors.textSecondary} style={styles.uploadIcon} />
            <Text style={styles.uploadText}>
              Tap to upload images\n(JPG, PNG - Max 5MB each)
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit for Approval</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

export default TurfRegistrationScreen;
