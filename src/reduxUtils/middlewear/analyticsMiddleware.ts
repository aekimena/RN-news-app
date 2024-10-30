import analytics from '@react-native-firebase/analytics';

const analyticsMiddleware = store => next => action => {
  // Log screen transitions
  if (action.type === 'NAVIGATE_SCREEN') {
    (async () => {
      await analytics().logScreenView({
        screen_name: action.payload.screenName,
        screen_class: action.payload.screenName,
      });
      console.log('new scren recorded');
    })();
  }

  // Log other user actions
  if (action.type === 'USER_ACTION') {
    (async () => {
      await analytics().logEvent(
        action.payload.eventName,
        action.payload.eventData,
      );
      console.log('new evnt recorded');
    })();
  }

  return next(action);
};

export default analyticsMiddleware;
