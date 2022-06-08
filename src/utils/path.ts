export function normalize(_path: string): string {
  return _path.replace(/\\/g, '/').replace(/\/{2,}/g, '/');
}

export function join(...paths: string[]): string {
  return normalize(paths.join('/'));
}

interface ParsedPath {
  /**
   * 目录 例：/a/b/
   */
  dir: string;
  /**
   * 名称(包括扩展名) 例: test.txt
   */
  base: string;
  /**
   * 扩展名  例：.txt
   */
  ext: string;
  /**
   * 名称 例：test
   */
  name: string;
  /**
   * 是否为目录
   */
  isDir: boolean;
}

export function parse(_path: string): ParsedPath {
  if (!_path) {
    return {dir: '', base: '', ext: '', name: '', isDir: false};
  }
  let path = normalize(_path);
  if (path === '/') {
    return {dir: '/', base: '', ext: '', name: '', isDir: true};
  }
  const isDir = path.charCodeAt(path.length - 1) === 47;
  if (isDir) {
    path = path.substring(0, path.length - 1);
  }

  let dirIdx = path.lastIndexOf('/');
  const dir = path.substring(0, dirIdx + 1);
  const base = path.substring(dirIdx + 1);

  if (isDir) {
    return {dir: dir, base: base, ext: '', name: base, isDir: true};
  }
  const extIdx = base.lastIndexOf('.');
  if (extIdx === -1 || extIdx === 0) {
    return {dir: dir, base: base, ext: '', name: base, isDir: false};
  }
  let ext = base.substring(extIdx);
  let name = base.substring(0, extIdx);
  return {dir: dir, base: base, ext: ext, name: name, isDir: false};
}

/**
 * 确保路径尾部为 /
 * @param _path 原路径
 * @returns 新路径
 */
export function toDirPath(_path: string): string {
  let path = normalize(_path);
  if (path.charCodeAt(path.length - 1) === 47) {
    return path;
  }
  return path + '/';
}

export default {
  normalize,
  join,
  parse,
};
