import {useNavigation} from '@react-navigation/core';
import {FileTabScreenNavigationProp} from '@routes';
import {globalStyle} from '@theme';
import React, {FC} from 'react';
import {Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const FileTab: FC = () => {
  const navigation = useNavigation<FileTabScreenNavigationProp>();

  return (
    <SafeAreaView
      style={[globalStyle.SafeAreaViewStyle]}
      edges={['top', 'right', 'left']}>
      <Button
        title="File Manager"
        onPress={() => {
          navigation.navigate('FileManager');
        }}
      />

      <Button
        title="File Manager"
        onPress={() => {
          navigation.navigate('FileManager');
        }}
      />
    </SafeAreaView>
  );
};

export default FileTab;
