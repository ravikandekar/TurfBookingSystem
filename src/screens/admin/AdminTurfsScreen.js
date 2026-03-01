import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/theme';
import { STATIC_TURFS, SUBSCRIPTION_STATUS } from '../../constants/constants';

const AdminTurfsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [turfs, setTurfs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTurfs();
  }, []);

  const loadTurfs = () => {
    setTurfs(STATIC_TURFS);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadTurfs();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getSubscriptionColor = (status) => {
    switch (status) {
      case SUBSCRIPTION_STATUS.ACTIVE:
        return theme.colors.success;
      case SUBSCRIPTION_STATUS.EXPIRED:
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const renderTurfCard = ({ item }) => (
    <View style={styles.turfCard}>
      <View style={styles.cardHeader}>
        <View style={styles.turfInfo}>
          <Text style={styles.turfName}>{item.name}</Text>
          <Text style={styles.turfLocation}>
            <Icon name="location-on" size={14} color={theme.colors.textSecondary} />
            {' '}{item.location}
          </Text>
        </View>
        <View style={[styles.subscriptionBadge, { backgroundColor: getSubscriptionColor(item.subscriptionStatus) + '20' }]}>
          <Text style={[styles.subscriptionText, { color: getSubscriptionColor(item.subscriptionStatus) }]}>
            {item.subscriptionStatus}
          </Text>
        </View>
      </View>

      <View style={styles.turfDetails}>
        <View style={styles.detailRow}>
          <Icon name="attach-money" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.detailText}>₹{item.pricePerSlot}/slot</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Icon name="star" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.detailText}>{item.rating} ({item.reviews} reviews)</Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="person" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.detailText}>Owner ID: {item.ownerId}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => Alert.alert('Edit Turf', 'Edit turf feature coming soon!')}
        >
          <Icon name="edit" size={16} color={theme.colors.primary} />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.manageButton]}
          onPress={() => Alert.alert('Manage Subscription', 'Subscription management coming soon!')}
        >
          <Icon name="card-membership" size={16} color={theme.colors.success} />
          <Text style={styles.manageButtonText}>Subscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      ...theme.typography.h2,
      color: theme.colors.text,
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addButtonText: {
      ...theme.typography.body2,
      color: theme.colors.textLight,
      marginLeft: theme.spacing.xs,
    },
    turfList: {
      flex: 1,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    },
    turfCard: {
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
    turfInfo: {
      flex: 1,
    },
    turfName: {
      ...theme.typography.h4,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    turfLocation: {
      ...theme.typography.body2,
      color: theme.colors.textSecondary,
    },
    subscriptionBadge: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.borderRadius.sm,
    },
    subscriptionText: {
      ...theme.typography.caption,
      fontWeight: '600',
    },
    turfDetails: {
      marginBottom: theme.spacing.md,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
    },
    detailText: {
      ...theme.typography.body2,
      color: theme.colors.text,
      marginLeft: theme.spacing.sm,
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
    manageButton: {
      backgroundColor: theme.colors.success + '10',
      borderWidth: 1,
      borderColor: theme.colors.success,
    },
    manageButtonText: {
      ...theme.typography.caption,
      color: theme.colors.success,
      fontWeight: '600',
      marginLeft: theme.spacing.xs,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Manage Turfs</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert('Add Turf', 'Add new turf feature coming soon!')}
        >
          <Icon name="add" size={20} color={theme.colors.textLight} />
          <Text style={styles.addButtonText}>Add Turf</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.turfList}
        data={turfs}
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: theme.spacing.xxl }}>
            <Icon name="grass" size={64} color={theme.colors.textSecondary} />
            <Text style={{ ...theme.typography.body1, color: theme.colors.textSecondary, marginTop: theme.spacing.md }}>
              No turfs found
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default AdminTurfsScreen;
