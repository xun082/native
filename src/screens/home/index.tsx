import React, { useEffect, useState } from 'react';
import { Button, View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { StackScreenProps } from '@react-navigation/stack';

import { supabase } from '@/utils/supabase';
import { chatRoom, useChatStore } from '@/stores/chatStore';
import { RootStackParamList } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type ChatProps = StackScreenProps<RootStackParamList, 'Chat'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [chatRoom, setChatRoom] = useState<Array<chatRoom>>([]);

  useEffect(() => {
    async function getUserProfiles() {
      const { data: profiles, error } = await supabase.from('profiles').select('*');
      await AsyncStorage.setItem('profiles', JSON.stringify(profiles));

      console.log(profiles);

      if (error) {
        console.error(error);
      }
    }

    getUserProfiles();
  }, []);

  useEffect(() => {
    async function getChatRooms() {
      const { data: chat_rooms, error } = await supabase.from('chat_rooms').select('*');

      if (chat_rooms) {
        setChatRoom(chat_rooms);
      }

      if (error) {
        console.error(error);
      }
    }

    getChatRooms();
  }, []);

  console.log(chatRoom);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Chat', { id: '42' })} />
    </View>
  );
};

export default HomeScreen;
