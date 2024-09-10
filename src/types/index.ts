// 定义 RootStackParamList 类型
export type RootStackParamList = {
  Auth: undefined; // 登录页不需要参数
  Home: undefined; // 首页不需要参数
  Chat: { id: string };
};
