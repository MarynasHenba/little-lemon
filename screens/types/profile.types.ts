import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Profile'
>;

export type Notifications = {
  orderStatuses: boolean;
  passwordChanges: boolean;
  specialOffers: boolean;
  newsletter: boolean;
};

export type Options = 'orderStatuses'
    | 'passwordChanges'
    | 'specialOffers'
    | 'newsletter';

export type NotificationItem = {
  title:
    | 'Order statuses'
    | 'Password changes'
    | 'Special offers'
    | 'Newsletter';
  propertyName: Options
};
