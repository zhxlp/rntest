import {
  Permission,
  PermissionsAndroid,
  PermissionStatus,
  Platform,
} from 'react-native';

/**
 * 检查权限是否全部存在
 * @param permissions 权限列表
 * @returns 权限是否全部存在
 */
export async function checkPermissions(
  permissions: Permission[],
): Promise<boolean> {
  try {
    if (Platform.OS !== 'android') {
      return true;
    }
    for (const permission of permissions) {
      const res = await PermissionsAndroid.check(permission);
      if (!res) {
        return false;
      }
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * 请求权限
 * @param permissions 权限列表
 * @returns 请求结果
 */
export async function requestPermissions(
  permissions: Permission[],
): Promise<PermissionStatus> {
  try {
    if (Platform.OS !== 'android') {
      return PermissionsAndroid.RESULTS.GRANTED;
    }
    const res = await PermissionsAndroid.requestMultiple(permissions);
    if (
      permissions.some(
        permission =>
          res[permission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN,
      )
    ) {
      return PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
    }

    if (
      permissions.some(
        permission => res[permission] === PermissionsAndroid.RESULTS.DENIED,
      )
    ) {
      return PermissionsAndroid.RESULTS.DENIED;
    }
    return PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error(err);
    return PermissionsAndroid.RESULTS.DENIED;
  }
}

/**
 * 检查和请求权限
 * @param permissions 权限列表
 * @returns 结果
 */
export async function checkAndRequestPermissions(
  permissions: Permission[],
): Promise<PermissionStatus> {
  const checkRes = await checkPermissions(permissions);
  if (checkRes) {
    return PermissionsAndroid.RESULTS.GRANTED;
  }
  return requestPermissions(permissions);
}
