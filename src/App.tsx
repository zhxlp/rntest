/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {RootStackScreen} from '@routes';
import {navigationRef} from '@routes/navigationUtils';
import React, {useEffect} from 'react';
import ShareMenu, {ShareData} from 'react-native-share-menu';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RNFS from 'react-native-fs';

const handleShare = (share?: ShareData) => {
  console.log(share);
  if (!share || !share.data) {
    return;
  }
  if (
    share.mimeType === 'text/plain' &&
    typeof share.data === 'string' &&
    !share.data.startsWith('content://')
  ) {
    console.log('文本');
    return;
  }
  let data: string[] = [];
  if (typeof share.data === 'string') {
    data = [share.data];
  } else {
    data = share.data;
  }
  try {
    data.forEach(async uri => {
      const res = await RNFS.stat(uri);
      console.log(res);
    });
  } catch (err) {
    console.error(err);
  }
};
const App = () => {
  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, []);
  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <RootStackScreen />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
