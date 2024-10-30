import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '../screens/Login';
import {SignUp} from '../screens/SignUp';
import {Home} from '../screens/Home';
import {NewsDetails} from '../screens/NewsDetails';
import {GoogleSignUp} from '../screens/GoogleSignUp';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectGoogleUser,
  setCheckingSignIn,
  setGoogleUser,
} from '../reduxUtils/services/googleUser';
import {
  GoogleSignin,
  isSuccessResponse,
  isNoSavedCredentialFoundResponse,
} from '@react-native-google-signin/google-signin';
import {setUser} from '../reduxUtils/services/user';
import crashlytics from '@react-native-firebase/crashlytics';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const googeleUser = useSelector(selectGoogleUser);
  const dispatch = useDispatch();

  // function to check if user has signed in before displaying the home screen

  const getCurrentUser = async () => {
    crashlytics().log('user sign in silently');
    try {
      const response = await GoogleSignin.signInSilently();
      if (isSuccessResponse(response)) {
        // if googleUser isn't null, home screen will display
        dispatch(setGoogleUser(true));
      } else if (isNoSavedCredentialFoundResponse(response)) {
        // redux store back to default if not signed in
        dispatch(setGoogleUser(null));
        dispatch(setUser(null));
      }
    } catch (err) {
      crashlytics().recordError(err);
    } finally {
      // update in redux store after task to hide splash screen and display the right screen
      dispatch(setCheckingSignIn(false));
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Stack.Navigator>
      {googeleUser == null ? (
        <Stack.Group
          screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
          <Stack.Screen component={Login} name="Login" />
          <Stack.Screen component={SignUp} name="SignUp" />
          <Stack.Screen component={GoogleSignUp} name="GoogleSignUp" />
        </Stack.Group>
      ) : (
        <Stack.Group
          screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
          <Stack.Screen component={Home} name="Home" />
          <Stack.Screen component={NewsDetails} name="Details" />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default Routes;
const styles = StyleSheet.create({});
