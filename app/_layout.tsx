import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chapter/[id]" />
        <Stack.Screen name="tutor/[chapterId]" />
        <Stack.Screen name="doubt/index" />
        <Stack.Screen name="quiz/[chapterId]" />
        <Stack.Screen name="challenge/index" />
        <Stack.Screen name="challenge/play" />
      </Stack>
    </SafeAreaProvider>
  );
}
