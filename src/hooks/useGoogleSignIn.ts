import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {showToast} from '../functions/showToast';

export const useGoogleSignIn = () => {
  const onGooglePress = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        // check if google play services is installed, then sign in
        await GoogleSignin.hasPlayServices();
        const response = await GoogleSignin.signIn();

        if (isSuccessResponse(response)) {
          // genrate google credential with firebase auth
          const googleCredential = auth.GoogleAuthProvider.credential(
            response.data.idToken,
          );
          resolve({userData: response.data, googleCredential});
        } else {
          // sign in was cancelled by user
          reject();
        }
      } catch (error) {
        if (isErrorWithCode(error)) {
          switch (error.code) {
            case statusCodes.IN_PROGRESS:
              // operation (eg. sign in) already in progress
              showToast({
                description: 'Sign In already in progress. Please wait.',
                type: 'success',
              });
              reject();
              break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
              // Android only, play services not available or outdated
              showToast({
                description:
                  'Play services not available or outdated. Please update your play services.',
                type: 'error',
              });
              reject();
              break;
            default:
              // some other error happened
              console.log(error);
              showToast({description: 'Something went wrong!', type: 'error'});
              reject();
          }
        } else {
          // an error that's not related to google sign in occurred
          showToast({description: 'Something went wrong!', type: 'error'});
          reject();
        }
      }
    });
  };

  return {onGooglePress};
};
