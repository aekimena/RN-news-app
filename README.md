# lendsqr-fp-news

## Task
The goal of this project is to build a React Native news app called FP News with essential features such as crash reporting, messaging, remote configuration, analytics, over-the-air updates, and Google sign-in. Here’s the detailed process and setup used for the app.

## Features;
Crashlytics

Messaging

Remote-config

Firebase Analytics

Over-the-air update using code push

Google sign in

## Installation

To build this app, I set up several packages for core functionality and UI

React Navigation: React Navigation is one of the best packages For seamless screen navigation throughout the app.

react-native-bootsplash: To display a splash screen on app launch, i used the react native bootsplash package. best for custom logo display. 

react-native-notifier: To display error messages or alerts, i used this package. It Provides toast-style notifications.

axios: I utilized axios for making HTTP requests to fetch news data.

react-redux / @reduxjs/toolkit: For global state management and easier setup with Redux.

@react-native-firebase/analytics: I installed this to collect usage and behavioral data in Firebase.

@react-native-firebase/auth: I installed this For managing user authentication, integrated with Google Sign-In.

@react-native-firebase/crashlytics: To track and log app crashes and errors in Firebase

@react-native-google-signin/google-signin: To  Manage user authentication via Google.

react-native-code-push: To implement Over-the-air update.

react-native-gesture-handler: This is required by react-native-notifier as a dependency.

appcenter-analytics, appcenter-crashes, : For crash reporting and analytics through App Center.

@testing-library/react-native: I Used this for unit testing and ensuring functionality across app components.


## User Interface
As my strengths lean more toward development than design, I sourced UI inspiration from Dribbble. By combining elements from various news app designs, I created a clean, user-friendly interface for FP News that’s both functional and visually appealing.

## API Integration
I initially considered the NewsCatcher API via RapidAPI, but the monthly subscription cost of $380 led me to find an alternative. I opted for the Real Time News Data API, which offers a free plan and meets the app’s data needs. You can view this API here: https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-news-data


## Unit Testing;
For unit testing, I used @testing-library/react-native to verify that components function as expected.

## Problems Encountered

App Center and CodePush Issues:

React Native 0.76.1 does not include the local-cli folder in the path node_modules/react-native/local-cli/cli.js, which caused issues during code push. To resolve this, I copied this folder from an older React Native version and placed it in node_modules/react-native/. This successfully provided the path App Center required, enabling successful OTA updates.

Google Sign-In Developer Error:

I initially encountered DEVELOPER_ERROR when attempting Google Sign-In. The fix was to ensure the web client ID matched the Firebase Console and that the app was correctly configured in Google API Console.


