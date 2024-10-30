type GoogleSignInData = {
  user: {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
  };
  idToken: string | null;
};

type GoogleAdditionalInfo = {
  isNewUser: true;
  profile: {
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    name: string;
    picture: string;
  };
  providerId: 'google.com';
};

type GoogleUserInfo = {
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | number;
  photoURL: string;
};

type UserInfo = {
  lastName: string;
  firstName: string;
  email: string;
  phoneNumber: string;
};

type NewsItemProps = {
  title: string;
  link?: string;
  snippet?: string;
  photo_url?: string;
  thumbnail_url?: string;
  published_datetime_utc: string;
  source_url?: string;
  source_name: string;
  source_logo_url: string;
  source_favicon_url?: string;
  source_publication_id?: string;
  related_topics?: null;
  sub_articles?: null;
  story_id?: string;
};
