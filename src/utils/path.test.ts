import {join, normalize, parse, toDirPath} from './path';

describe('normalize', () => {
  test.each([
    ['/a', '/a'],
    ['/a/', '/a/'],
    ['/a//', '/a/'],
    ['//a/', '/a/'],
    ['/a/c', '/a/c'],
    ['/a//c', '/a/c'],
    ['/a///c/', '/a/c/'],
    ['\\a///c', '/a/c'],
    ['\\/a/\\//c', '/a/c'],
    ['\\/a/\\//c\\', '/a/c/'],
  ])('normalize("%s") === "%s"', (a, expected) => {
    expect(normalize(a)).toBe(expected);
  });
});

describe('join', () => {
  test.each([
    [['a', 'b'], 'a/b'],
    [['/a', 'b'], '/a/b'],
    [['/a', '/b'], '/a/b'],
    [['/a/', '/b'], '/a/b'],
    [['/a/', '/b/'], '/a/b/'],
    [['/a', 'b', 'c'], '/a/b/c'],
    [['/a', 'b', 'c/'], '/a/b/c/'],
    [['/a', 'b', 'c/d'], '/a/b/c/d'],
  ])('join(...%j) === "%s"', (a, expected) => {
    expect(join(...a)).toBe(expected);
  });
});

describe('parse', () => {
  test.each([
    ['a.txt', {dir: '', base: 'a.txt', ext: '.txt', name: 'a', isDir: false}],
    ['a', {dir: '', base: 'a', ext: '', name: 'a', isDir: false}],
    ['/a', {dir: '/', base: 'a', ext: '', name: 'a', isDir: false}],
    ['/a.txt', {dir: '/', base: 'a.txt', ext: '.txt', name: 'a', isDir: false}],
    ['/a/', {dir: '/', base: 'a', ext: '', name: 'a', isDir: true}],
    ['/a/c', {dir: '/a/', base: 'c', ext: '', name: 'c', isDir: false}],
    [
      '/a/c.txt',
      {dir: '/a/', base: 'c.txt', ext: '.txt', name: 'c', isDir: false},
    ],
  ])('parse("%s") == %j', (a, expected) => {
    expect(parse(a)).toEqual(expected);
  });
});

describe('toDirPath', () => {
  test.each([
    ['/a', '/a/'],
    ['a', 'a/'],
    ['/a/b/c', '/a/b/c/'],
  ])('toDirPath("%s") === "%s"', (a, expected) => {
    expect(toDirPath(a)).toBe(expected);
  });
});
