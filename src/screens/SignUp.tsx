import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../utils/colors';
import {useSafeTops} from '../hooks/useSafeTops';
import _styles from '../utils/_styles';
import {CustomInputs} from '../components/CustomInputs';
import {CustomButton} from '../components/CustomButton';
import {AuthImages} from '../components/AuthImages';
import images from '../utils/images';
import PhoneInput from 'react-native-phone-input';
import {navigateScreen} from '../reduxUtils/services/analyticsActions';
import {useDispatch} from 'react-redux';
import {MainContainer} from '../components/MainContainer';

const {height} = Dimensions.get('window');

export const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const phoneRef = useRef<PhoneInput>();
  const dispatch = useDispatch();

  // const isNewUserFromLogin = route?.params?.isNewUserFromLogin;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onChangeNmber = (value: string, iso2: any) => {
    setPhoneNumber(value);
  };

  const proceedToGoogle = () => {
    // first check authenticate email
    setEmailErr(!emailRegex.test(email));
    if (!emailRegex.test(email)) {
      return;
    }

    // validate phone number
    const checkValid = phoneRef.current?.isValidNumber(phoneNumber);
    setPhoneErr(!checkValid);
    if (!checkValid) {
      return;
    }

    // navigate to google sign up screen with the credentials. might need then later
    navigation.navigate('GoogleSignUp', {
      email,
      firstName,
      lastName,
      phoneNumber,
    });
  };

  // update email error state for every email text change, if there's an email error

  useEffect(() => {
    if (emailErr) {
      setEmailErr(!emailRegex.test(email));
    }
  }, [email]);

  useEffect(() => {
    // screen update to analytics
    dispatch(navigateScreen('SignUp'));
  }, []);

  return (
    <MainContainer backgroundColor="#fff" barStyle="dark-content">
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{paddingBottom: 20}}
          keyboardShouldPersistTaps="always">
          <View>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                position: 'absolute',
                left: 0,
              }}>
              <Image source={images.backIcon} style={{height: 20, width: 20}} />
            </Pressable>
            <AuthImages source={images.signUp} />
            <View style={{marginTop: 20}}>
              <Text
                style={[
                  _styles.font24Regular,
                  {color: colors.black, textAlign: 'center', fontSize: 30},
                ]}>
                Register
              </Text>
            </View>
            <View style={{marginTop: 30, gap: 20}}>
              <CustomInputs
                placeholder="First Name"
                onChangeText={setFirstName}
              />
              <CustomInputs
                placeholder="Last Name"
                onChangeText={setLastName}
              />
              <CustomInputs
                placeholder="Email"
                onChangeText={setEmail}
                error={emailErr}
                errorMessage="Please enter a valid email address."
              />
              <View>
                <PhoneInput
                  ref={phoneRef}
                  onChangePhoneNumber={onChangeNmber}
                  style={styles.phoneInput}
                  initialCountry={'ng'}
                  textProps={{
                    placeholder: 'Phone Number',
                  }}
                  textStyle={[_styles.font14Regular, {color: '#555'}]}
                  autoFormat
                />
                {phoneErr && (
                  <Text style={[_styles.font12Regular, {color: '#ff0000'}]}>
                    Please enter a valid phone number.
                  </Text>
                )}
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <CustomButton
                backgroundColor={colors.primary}
                title={'Sign Up'}
                color="#fff"
                onPress={proceedToGoogle}
                disabled={
                  email == '' ||
                  firstName == '' ||
                  lastName == '' ||
                  phoneNumber == ''
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  phoneInput: {
    height: 50,
    width: '100%',
    backgroundColor: colors.greyLight,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});
