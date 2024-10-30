// Action creator for screen navigation events
export const navigateScreen = screenName => ({
  type: 'NAVIGATE_SCREEN',
  payload: {screenName},
});

// Action creator for logging user actions
export const logUserAction = (eventName, eventData) => ({
  type: 'USER_ACTION',
  payload: {eventName, eventData},
});
