import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
import {useSafeTops} from '../hooks/useSafeTops';
import _styles from '../utils/_styles';
import {CustomButton} from '../components/CustomButton';
import images from '../utils/images';
import {AuthImages} from '../components/AuthImages';
import {useGoogleSignIn} from '../hooks/useGoogleSignIn';
import {useDispatch} from 'react-redux';
import {setGoogleUser} from '../reduxUtils/services/googleUser';
import auth from '@react-native-firebase/auth';
import {navigateScreen} from '../reduxUtils/services/analyticsActions';
import crashlytics from '@react-native-firebase/crashlytics';
import {GoogleSginInLoader} from '../components/GoogleSginInLoader';
import {MainContainer} from '../components/MainContainer';

export const GoogleSignUp = ({navigation}) => {
  const [loaderVisible, setLoaderVisible] = useState(false);

  const {onGooglePress} = useGoogleSignIn();
  const dispatch = useDispatch();

  function proceed() {
    // display loader modal
    setLoaderVisible(true);
    // update to crashlytics
    crashlytics().log('Google sign up button pressed.');
    // call google sign in hook
    onGooglePress()
      .then(async res => {
        await crashlytics().setAttributes(res.userData?.user);
        // hide loader, update redux store and display home screen
        setLoaderVisible(false);
        dispatch(setGoogleUser(true));
        auth().signInWithCredential(res.googleCredential); // for firebase update
      })
      .catch(err => {
        // update error to crashlytics
        crashlytics().recordError(err);
        console.log(err);
        setLoaderVisible(false);
      });
  }

  useEffect(() => {
    // screen update to analytics
    dispatch(navigateScreen('GoogleSignUp'));
  }, []);

  return (
    <MainContainer backgroundColor="#fff" barStyle="dark-content">
      <>
        <View style={styles.container}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              left: 20,
              marginTop: 40,
            }}>
            <Image source={images.backIcon} style={{height: 20, width: 20}} />
          </Pressable>
          <AuthImages source={images.googleSignIn} />
          <View style={{marginTop: 20}}>
            <Text
              style={[
                _styles.font24Regular,
                {color: colors.black, textAlign: 'center', fontSize: 30},
              ]}>
              Almost there!
            </Text>
          </View>
          <View style={{marginTop: 30}}>
            <CustomButton
              title="Sign Up with Google"
              backgroundColor={colors.primary}
              color="#fff"
              leftView={
                <View>
                  <Image
                    source={images.googleIcon}
                    style={{height: 30, width: 30, resizeMode: 'contain'}}
                  />
                </View>
              }
              onPress={proceed}
            />
          </View>
        </View>
        <GoogleSginInLoader visible={loaderVisible} />
      </>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});
