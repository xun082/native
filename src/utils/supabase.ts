import { AppState, Platform } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iwzdjveihpunljkgvzwq.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3emRqdmVpaHB1bmxqa2d2endxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0MDQ5ODYsImV4cCI6MjAyMzk4MDk4Nn0.y9XFWIqpawAHy70DJlHSi-1E3UHxLDSPrP0ghUvoAOA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: Platform.OS !== 'web',
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export async function downloadImage(path: string) {
  try {
    const { data, error } = await supabase.storage.from('msg_image').download(path);

    if (error) {
      throw error;
    }

    if (data) {
      const url = URL.createObjectURL(data);

      return url;
    }
  } catch (error) {
    console.log('Error downloading image: ', error);
  }
}
