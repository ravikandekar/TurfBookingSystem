export const USER_ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  CANCELLED_BY_OWNER: 'CANCELLED_BY_OWNER',
  CANCELLED_BY_ADMIN: 'CANCELLED_BY_ADMIN',
};

export const PAYMENT_STATUS = {
  PENDING: 'PENDING',
  ADVANCE: 'ADVANCE',
  FULL: 'FULL',
  REFUNDED: 'REFUNDED',
};

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
};

export const PAYMENT_TYPES = {
  ADVANCE: 'ADVANCE',
  FULL: 'FULL',
};

export const CITIES = [
  { id: 1, name: 'Mumbai', state: 'Maharashtra' },
  { id: 2, name: 'Delhi', state: 'Delhi' },
  { id: 3, name: 'Bangalore', state: 'Karnataka' },
  { id: 4, name: 'Hyderabad', state: 'Telangana' },
  { id: 5, name: 'Chennai', state: 'Tamil Nadu' },
  { id: 6, name: 'Kolkata', state: 'West Bengal' },
  { id: 7, name: 'Pune', state: 'Maharashtra' },
  { id: 8, name: 'Ahmedabad', state: 'Gujarat' },
  { id: 9, name: 'Jaipur', state: 'Rajasthan' },
  { id: 10, name: 'Surat', state: 'Gujarat' },
];

export const FACILITIES = [
  { id: 1, name: 'Parking', icon: 'parking' },
  { id: 2, name: 'Washroom', icon: 'restroom' },
  { id: 3, name: 'Lights', icon: 'lightbulb' },
  { id: 4, name: 'Water', icon: 'water-drop' },
  { id: 5, name: 'Changing Room', icon: 'human-male-female' },
  { id: 6, name: 'First Aid', icon: 'medical-bag' },
  { id: 7, name: 'Cafeteria', icon: 'coffee' },
  { id: 8, name: 'Spectator Seating', icon: 'seat' },
];

export const SPORTS_TYPES = [
  { id: 1, name: 'Football', icon: 'soccer' },
  { id: 2, name: 'Cricket', icon: 'cricket' },
  { id: 3, name: 'Basketball', icon: 'basketball' },
  { id: 4, name: 'Tennis', icon: 'tennis' },
  { id: 5, name: 'Badminton', icon: 'badminton' },
  { id: 6, name: 'Volleyball', icon: 'volleyball' },
  { id: 7, name: 'Hockey', icon: 'hockey-puck' },
  { id: 8, name: 'Swimming', icon: 'swim' },
];

export const STATIC_TURFS = [
  {
    id: 1,
    name: 'Green Valley Sports Arena',
    description: 'Premium football turf with professional lighting and seating',
    cityId: 1,
    cityName: 'Mumbai',
    location: 'Andheri West, Mumbai',
    latitude: 19.1194,
    longitude: 72.8465,
    pricePerSlot: 1500,
    sportsType: [1],
    facilities: [1, 2, 3, 4, 5],
    images: [
      'https://picsum.photos/seed/turf1/400/300.jpg',
      'https://picsum.photos/seed/turf1-2/400/300.jpg',
    ],
    rating: 4.5,
    reviews: 128,
    ownerId: 1,
    subscriptionStatus: 'ACTIVE',
    workingHours: {
      opening: '06:00',
      closing: '23:00',
    },
    slotDuration: 60,
    weekendPrice: 2000,
  },
  {
    id: 2,
    name: 'Urban Cricket Ground',
    description: 'Professional cricket pitch with bowling machines available',
    cityId: 1,
    cityName: 'Mumbai',
    location: 'Bandra East, Mumbai',
    latitude: 19.0596,
    longitude: 72.8495,
    pricePerSlot: 1200,
    sportsType: [2],
    facilities: [1, 2, 3, 6],
    images: [
      'https://picsum.photos/seed/turf2/400/300.jpg',
      'https://picsum.photos/seed/turf2-2/400/300.jpg',
    ],
    rating: 4.3,
    reviews: 89,
    ownerId: 2,
    subscriptionStatus: 'ACTIVE',
    workingHours: {
      opening: '05:30',
      closing: '22:00',
    },
    slotDuration: 90,
    weekendPrice: 1500,
  },
  {
    id: 3,
    name: 'Elite Sports Complex',
    description: 'Multi-sport facility with basketball and tennis courts',
    cityId: 3,
    cityName: 'Bangalore',
    location: 'Indiranagar, Bangalore',
    latitude: 12.9719,
    longitude: 77.6412,
    pricePerSlot: 1000,
    sportsType: [3, 4],
    facilities: [1, 2, 3, 4, 5, 7],
    images: [
      'https://picsum.photos/seed/turf3/400/300.jpg',
      'https://picsum.photos/seed/turf3-2/400/300.jpg',
    ],
    rating: 4.7,
    reviews: 203,
    ownerId: 3,
    subscriptionStatus: 'ACTIVE',
    workingHours: {
      opening: '06:00',
      closing: '23:00',
    },
    slotDuration: 60,
    weekendPrice: 1400,
  },
  {
    id: 4,
    name: 'Lawn Tennis Club',
    description: 'Professional tennis courts with coaching available',
    cityId: 3,
    cityName: 'Bangalore',
    location: 'Koramangala, Bangalore',
    latitude: 12.9279,
    longitude: 77.6271,
    pricePerSlot: 800,
    sportsType: [4],
    facilities: [1, 2, 5, 6],
    images: [
      'https://picsum.photos/seed/turf4/400/300.jpg',
      'https://picsum.photos/seed/turf4-2/400/300.jpg',
    ],
    rating: 4.4,
    reviews: 156,
    ownerId: 4,
    subscriptionStatus: 'EXPIRED',
    workingHours: {
      opening: '05:00',
      closing: '21:00',
    },
    slotDuration: 60,
    weekendPrice: 1200,
  },
  {
    id: 5,
    name: 'Central Badminton Hall',
    description: 'Air-conditioned badminton courts with professional flooring',
    cityId: 2,
    cityName: 'Delhi',
    location: 'Connaught Place, Delhi',
    latitude: 28.6304,
    longitude: 77.2177,
    pricePerSlot: 600,
    sportsType: [5],
    facilities: [2, 4, 5, 6],
    images: [
      'https://picsum.photos/seed/turf5/400/300.jpg',
      'https://picsum.photos/seed/turf5-2/400/300.jpg',
    ],
    rating: 4.6,
    reviews: 178,
    ownerId: 5,
    subscriptionStatus: 'ACTIVE',
    workingHours: {
      opening: '06:00',
      closing: '23:00',
    },
    slotDuration: 45,
    weekendPrice: 900,
  },
];

export const STATIC_USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    mobile: '+919876543210',
    role: 'USER',
    isAdmin: false,
    profileImage: 'https://picsum.photos/seed/user1/200/200.jpg',
    cityId: 1,
  },
  {
    id: 2,
    name: 'Admin User',
    email: 'admin@example.com',
    mobile: '+919876543211',
    role: 'ADMIN',
    isAdmin: true,
    profileImage: 'https://picsum.photos/seed/admin1/200/200.jpg',
    cityId: 1,
  },
  {
    id: 3,
    name: 'Owner One',
    email: 'owner1@example.com',
    mobile: '+919876543212',
    role: 'USER',
    isAdmin: false,
    profileImage: 'https://picsum.photos/seed/owner1/200/200.jpg',
    turfIds: [1, 2],
  },
];

export const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00'
];

export const ANALYTICS_DATA = {
  totalRevenue: 1250000,
  monthlyRevenue: 186000,
  totalBookings: 3420,
  activeTurfs: 45,
  activeUsers: 2890,
  newUsersThisMonth: 145,
  occupancyRate: 78.5,
  averageRating: 4.4,
};

export const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: 'BOOKING_CONFIRMED',
  BOOKING_CANCELLED: 'BOOKING_CANCELLED',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  SUBSCRIPTION_EXPIRING: 'SUBSCRIPTION_EXPIRING',
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  NEW_BOOKING: 'NEW_BOOKING',
  BOOKING_REMINDER: 'BOOKING_REMINDER',
};
