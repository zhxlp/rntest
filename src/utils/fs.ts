import {Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {join, parse, toDirPath} from './path';
import {checkAndRequestExternalStoragePermission} from './permissions';
import {name as appName} from '../../app.json';
import {BaseResult} from './common';

export const FS_ERROR = {
  PERMISSION_DENIED: 'PERMISSION_DENIED',
};

/**
 * 打印路径
 ** for Android
 * MainBundlePath:  undefined
 * CachesDirectoryPath:  /data/user/0/com.zhxlp.rntest/cache
 * ExternalCachesDirectoryPath:  /storage/emulated/0/Android/data/com.zhxlp.rntest/cache
 * DownloadDirectoryPath:  /storage/emulated/0/Download
 * DocumentDirectoryPath:  /data/user/0/com.zhxlp.rntest/files
 * ExternalDirectoryPath:  /storage/emulated/0/Android/data/com.zhxlp.rntest/files
 * ExternalStorageDirectoryPath:  /storage/emulated/0
 * TemporaryDirectoryPath:  /data/user/0/com.zhxlp.rntest/cache
 * LibraryDirectoryPath:  undefined
 * PicturesDirectoryPath:  /storage/emulated/0/Pictures
 * FileProtectionKeys:  undefined
 *
 * CachesDirectoryPath、ExternalCachesDirectoryPath、DocumentDirectoryPath、ExternalDirectoryPath 不需要权限
 *
 */

export function printPath() {
  console.log('MainBundlePath: ', RNFS.MainBundlePath);
  console.log('CachesDirectoryPath: ', RNFS.CachesDirectoryPath);
  console.log(
    'ExternalCachesDirectoryPath: ',
    RNFS.ExternalCachesDirectoryPath,
  );
  console.log('DownloadDirectoryPath: ', RNFS.DownloadDirectoryPath);
  console.log('DocumentDirectoryPath: ', RNFS.DocumentDirectoryPath);
  console.log('ExternalDirectoryPath: ', RNFS.ExternalDirectoryPath);
  console.log(
    'ExternalStorageDirectoryPath: ',
    RNFS.ExternalStorageDirectoryPath,
  );
  console.log('TemporaryDirectoryPath: ', RNFS.TemporaryDirectoryPath);
  console.log('LibraryDirectoryPath: ', RNFS.LibraryDirectoryPath);
  console.log('PicturesDirectoryPath: ', RNFS.PicturesDirectoryPath);
  console.log('FileProtectionKeys: ', RNFS.FileProtectionKeys);
}

/**
 * 获取应用的扩展存储目录
 * @param paths 追加路径
 * @returns 路径
 */
export function getAppExternalStoragePath(...paths: string[]): string {
  let dataPath = RNFS.DocumentDirectoryPath;

  if (Platform.OS === 'android') {
    dataPath = join(RNFS.ExternalStorageDirectoryPath, appName);
  }
  return join(dataPath, ...paths);
}

/**
 * 是否为需要权限访问的外部存储目录
 * @param path 路径
 * @returns 是否
 */
export function isExternalStoragePath(path: string): boolean {
  if (Platform.OS !== 'android') {
    return false;
  }
  if (!path.startsWith(RNFS.ExternalStorageDirectoryPath)) {
    return false;
  }
  const dir = parse(RNFS.ExternalDirectoryPath).dir;
  if (path.startsWith(dir)) {
    return false;
  }
  return true;
}

/**
 * 创建目录
 * @param path 路径
 * @returns 是否成功
 */
export async function mkdir(path: string): Promise<BaseResult<boolean>> {
  try {
    if (isExternalStoragePath(path)) {
      const perm = await checkAndRequestExternalStoragePermission();
      if (!perm) {
        return BaseResult.error(
          FS_ERROR.PERMISSION_DENIED,
          'Permission denied',
        );
      }
    }
    await RNFS.mkdir(path);
    return BaseResult.success(true);
  } catch (err) {
    return BaseResult.error('', String(err));
  }
}

interface ReadDirItem {
  /**
   * 路径
   */
  path: string;
  /**
   * 修改时间
   */
  mtime: Date | undefined;
  /**
   * 大小
   */
  size: number;
}

/**
 * 解析 RNFS.ReadDirItem[]
 * @param items RNFS.ReadDirItem[]
 * @returns ReadDirItem[]
 */
export function parseReadDirItems(items: RNFS.ReadDirItem[]): ReadDirItem[] {
  const list: ReadDirItem[] = [];
  items.forEach(item => {
    const isDir = item.isDirectory();
    list.push({
      path: isDir ? toDirPath(item.path) : item.path,
      mtime: item.mtime,
      size: item.size,
    });
  });
  return list;
}

/**
 * 读取目录
 * @param path 路径
 * @param showHide 显示隐藏文件
 * @returns 目录内容
 */
export async function readDir(
  path: string,
  showHide: boolean = true,
): Promise<BaseResult<ReadDirItem[]>> {
  try {
    if (isExternalStoragePath(path)) {
      const perm = await checkAndRequestExternalStoragePermission();
      if (!perm) {
        return BaseResult.error(
          FS_ERROR.PERMISSION_DENIED,
          'Permission denied',
        );
      }
    }
    const res = await RNFS.readDir(path);
    let list;
    if (showHide) {
      list = parseReadDirItems(res);
    }
    list = parseReadDirItems(res.filter(v => !v.name.startsWith('.')));
    return BaseResult.success(list);
  } catch (err) {
    return BaseResult.error('', String(err));
  }
}
