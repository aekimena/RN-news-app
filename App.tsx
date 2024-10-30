import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/reduxUtils/store';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  selectCheckingSignIn,
  setGoogleUser,
} from './src/reduxUtils/services/googleUser';
import {setUser} from './src/reduxUtils/services/user';
import BootSplash from 'react-native-bootsplash';
import CodePush from 'react-native-code-push';
import {NotifierWrapper} from 'react-native-notifier';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KEYS} from './secretKeys.config';

GoogleSignin.configure({
  webClientId: KEYS.webClientID,

  offlineAccess: true,
});

// some codes need to be executed in App.tsx, inside the provider. so a SubApp component is created.

const SubApp = () => {
  const dispatch = useDispatch();
  const isCheckingUser = useSelector(selectCheckingSignIn);
  function onAuthStatusChanged(user: FirebaseAuthTypes.User | null) {
    if (user) {
      dispatch(setGoogleUser(true));
      return;
    }
    dispatch(setGoogleUser(null));
    dispatch(setUser(null));
  }

  function onCodePushChange(status: any) {
    switch (status) {
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading update...');
        break;

      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update...');
        break;

      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed');
        break;
    }
  }
  function onCodePushProgress(progress: any) {
    console.log('progress: ', progress);
  }

  useEffect(() => {
    // register google auth changes
    const subscriber = auth().onAuthStateChanged(onAuthStatusChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    // if checking if user is sihned in is done, hide splashscreen
    if (!isCheckingUser) {
      setTimeout(() => {
        (async () => {
          await BootSplash.hide({fade: true});
          console.log('splash screen hidden');
        })();
      }, 2000);
    }
  }, [isCheckingUser]);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <GestureHandlerRootView style={{flex: 1}}>
            <NotifierWrapper>
              <SubApp />
            </NotifierWrapper>
          </GestureHandlerRootView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};
export default CodePush(App);

const styles = StyleSheet.create({});
