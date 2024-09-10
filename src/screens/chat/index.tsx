import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Chat({ route }: any) {
  const { id } = route.params; // 从导航参数中获取 id

  return (
    <View style={styles.container}>
      <Text style={styles.text}>正在与 ID 为 {id} 的联系人聊天</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
