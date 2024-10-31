import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
import _styles from '../utils/_styles';
import {CustomButton} from '../components/CustomButton';
import images from '../utils/images';
import {AuthImages} from '../components/AuthImages';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setGoogleUser} from '../reduxUtils/services/googleUser';
import {useGoogleSignIn} from '../hooks/useGoogleSignIn';
import {navigateScreen} from '../reduxUtils/services/analyticsActions';
import crashlytics from '@react-native-firebase/crashlytics';
import {MainContainer} from '../components/MainContainer';

const {height} = Dimensions.get('window');

export const Login = ({navigation}: any) => {
  const [isGoogleButtonDisabled, setIsGoogleButtonDisabled] = useState(false); // disables google button after sign in successful

  const {onGooglePress} = useGoogleSignIn();
  const dispatch = useDispatch();

  function proceed() {
    // update to crashlytics
    crashlytics().log('Google sign in button pressed.');
    // call google sign in hook
    onGooglePress()
      .then(async (res: any) => {
        setIsGoogleButtonDisabled(true);
        crashlytics().log('User signed in.');
        await crashlytics().setAttributes(res.userData?.user);
        // update redux store and display home screen
        dispatch(setGoogleUser(true));
        auth().signInWithCredential(res.googleCredential); // for firebase authentication update
      })
      .catch(err => {
        crashlytics().recordError(err);
        console.log(err);
        setIsGoogleButtonDisabled(false);
      });
  }

  useEffect(() => {
    // screen update to analytics
    dispatch(navigateScreen('Login'));
  }, []);

  return (
    <>
      <MainContainer backgroundColor="#fff" barStyle="dark-content">
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{paddingBottom: 0}}
            showsVerticalScrollIndicator={false}>
            <View style={{height: height * 0.88}}>
              <AuthImages source={images.loginIn} />
              <View style={{marginTop: 20}}>
                <Text
                  style={[
                    _styles.font24Regular,
                    {color: colors.black, textAlign: 'center', fontSize: 30},
                  ]}>
                  Welcome Back!
                </Text>
              </View>
              <View style={{marginTop: 50}}>
                <CustomButton
                  title="Sign In with Google"
                  color="#fff"
                  backgroundColor={colors.primary}
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
            <View style={styles.footerCont}>
              <View style={styles.footer}>
                <Text>Don't have an account?</Text>
                <Pressable onPress={() => navigation.navigate('SignUp')}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: colors.black,
                    }}>
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    width: '100%',
    justifyContent: 'center',
  },
  footerCont: {
    height: height * 0.1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
});
