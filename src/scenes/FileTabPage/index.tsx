import {useNavigation} from '@react-navigation/core';
import {FileTabScreenNavigationProp} from '@routes';
import {globalStyle} from '@theme';
import React, {FC} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';

const FileTab: FC = () => {
  const navigation = useNavigation<FileTabScreenNavigationProp>();

  return (
    <SafeAreaView
      style={[globalStyle.SafeAreaViewStyle]}
      edges={['top', 'right', 'left']}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate('FileManager');
        }}>
        <Text style={styles.buttonText}>File Manager</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>测试2</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FileTab;
