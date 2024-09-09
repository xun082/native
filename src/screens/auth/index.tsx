import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack'; // 导入 StackNavigationProp
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {supabase} from '../../utils/supabase'; // Supabase 导入
import {RootStackParamList} from '../../types'; // 导入 RootStackParamList 类型定义

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Auth() {
  const navigation = useNavigation<NavigationProp>(); // 使用 navigation 类型定义

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 隐藏顶部导航栏
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // 检查用户是否已经登录
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const session = await AsyncStorage.getItem('supabase_session');
        if (session) {
          navigation.replace('Home'); // 跳转到 Home 页面
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();
  }, [navigation]);

  // 使用 Supabase 登录
  const signInWithEmail = async () => {
    setLoading(true);

    try {
      const {
        error,
        data: {session},
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('登录失败', error.message);
      } else {
        // 保存用户会话信息
        await AsyncStorage.setItem('supabase_session', JSON.stringify(session));
        navigation.replace('Home'); // 登录成功后重定向到首页
      }
    } catch (error) {
      Alert.alert('登录时出错，请重试。');
      console.error('Error during sign in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="请输入邮箱"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="请输入密码"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <Pressable
        style={[
          styles.button,
          loading ? styles.buttonDisabled : styles.buttonActive,
        ]}
        onPress={signInWithEmail}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? '正在登录...' : '登录'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonActive: {
    backgroundColor: '#28a745',
  },
  buttonDisabled: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
