import {Dimensions} from 'react-native';
import {Easing, Notifier, NotifierComponents} from 'react-native-notifier';
import _styles from '../utils/_styles';
import colors from '../utils/colors';

const {width} = Dimensions.get('window');

export function showToast({
  description,
  type,
  onPress,
}: {
  description?: string;
  type?: 'error' | 'success';
  onPress?: any;
}) {
  Notifier.showNotification({
    description,
    duration: 3000,
    showAnimationDuration: 500,
    showEasing: Easing.ease,
    translucentStatusBar: true,
    onPress,
    hideOnPress: true,
    Component: NotifierComponents.Notification,
    componentProps: {
      containerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: width - 40,
        alignSelf: 'center',
        borderWidth: 1.5,
        borderRadius: 10,
        zIndex: 50,
        paddingHorizontal: 15,
        gap: 10,
        backgroundColor: type == 'success' ? '#C1CFD8' : '#F0D4D4',
        borderColor: type == 'success' ? '#839FB2' : '#D37E7E',
      },
      descriptionStyle: {
        ..._styles.font16Medium,
        color: colors.black,
        fontWeight: '400',
      },
    },
  });
}
