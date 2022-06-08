import {globalStyle} from '@theme';
import React, {FC} from 'react';
import {Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAppStoragePath, mkdir, printPath, readDir} from '@utils/fs';
const FileManager: FC = () => {
  return (
    <SafeAreaView
      style={[globalStyle.SafeAreaViewStyle]}
      edges={['top', 'right', 'left']}>
      <Button
        title="打印路径"
        onPress={() => {
          printPath();
        }}
      />
      <Button
        title="获取应用存储目录"
        onPress={() => {
          const dataPath = getAppStoragePath();
          console.log(dataPath);
        }}
      />
      <Button
        title="创建应用存储目录"
        onPress={async () => {
          const dataPath = getAppStoragePath();
          const res = await mkdir(dataPath);
          console.log(res);
        }}
      />
      <Button
        title="读取存储目录"
        onPress={async () => {
          const dataPath = getAppStoragePath();
          const res = await readDir(dataPath, true);
          console.log(res);
        }}
      />
    </SafeAreaView>
  );
};

export default FileManager;
