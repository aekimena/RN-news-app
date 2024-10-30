import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useSafeTops = (top: number) => {
  const insets = useSafeAreaInsets();

  return Math.max(insets.top, top);
};
