import {globalStyle} from '@theme';
import React, {FC} from 'react';
import {Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {checkAndRequestExternalStoragePermission} from '@utils/permissions';
import {getAppExternalStoragePath, mkdir, printPath, readDir} from '@utils/fs';
import RNFS from 'react-native-fs';
const FileManager: FC = () => {
  return (
    <SafeAreaView
      style={[globalStyle.SafeAreaViewStyle]}
      edges={['top', 'right', 'left']}>
      <Button
        title="请求存储权限"
        onPress={async () => {
          const res = await checkAndRequestExternalStoragePermission();
          console.log(res);
        }}
      />

      <Button
        title="打印路径"
        onPress={() => {
          printPath();
        }}
      />
      <Button
        title="获取应用扩展存储目录"
        onPress={() => {
          const dataPath = getAppExternalStoragePath();
          console.log(dataPath);
        }}
      />
      <Button
        title="创建应用扩展存储目录"
        onPress={async () => {
          const dataPath = getAppExternalStoragePath();
          const res = await mkdir(dataPath);
          console.log(res);
        }}
      />
      <Button
        title="读取扩展存储目录"
        onPress={async () => {
          const dataPath = getAppExternalStoragePath();
          const res = await readDir(dataPath, true);
          console.log(res);
        }}
      />
    </SafeAreaView>
  );
};

export default FileManager;
