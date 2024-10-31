import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
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
import {MainContainer} from '../components/MainContainer';

export const GoogleSignUp = ({navigation}: any) => {
  const [isGoogleButtonDisabled, setIsGoogleButtonDisabled] = useState(false); // disables google button after sign in successful

  const {onGooglePress} = useGoogleSignIn();
  const dispatch = useDispatch();

  function proceed() {
    // update to crashlytics
    crashlytics().log('Google sign up button pressed.');
    // call google sign in hook
    onGooglePress()
      .then(async (res: any) => {
        setIsGoogleButtonDisabled(true);
        // display loader modal
        crashlytics().log('User signed up with google.');
        await crashlytics().setAttributes(res.userData?.user);
        //  update redux store and display home screen

        dispatch(setGoogleUser(true));
        auth().signInWithCredential(res.googleCredential); // for firebase update
      })
      .catch(err => {
        // update error to crashlytics
        crashlytics().recordError(err);
        console.log(err);
        setIsGoogleButtonDisabled(false);
      });
  }

  useEffect(() => {
    // screen update to analytics
    dispatch(navigateScreen('GoogleSignUp'));
  }, []);

  return (
    <>
      <MainContainer backgroundColor="#fff" barStyle="dark-content">
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
              disabled={isGoogleButtonDisabled}
            />
          </View>
        </View>
      </MainContainer>
    </>
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
