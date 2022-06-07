import React, {FC} from 'react';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/core';
import OtherTab from '@scenes/OtherTabPage';
import FileManager from '@scenes/FileManagerPage';
import FileTab from '@scenes/FileTabPage';

export type FileStackParamList = {
  FileTab: undefined;
  FileManager: undefined;
};

export type MainTabParamList = {
  File: NavigatorScreenParams<FileStackParamList>;
  Other: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
};

export type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;
type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export type FileScreenRouteProp = RouteProp<MainTabParamList, 'File'>;
type FileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'File'>,
  MainScreenNavigationProp
>;

export type OtherScreenRouteProp = RouteProp<MainTabParamList, 'Other'>;
export type OtherScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Other'>,
  MainScreenNavigationProp
>;

export type FileTabScreenRouteProp = RouteProp<FileStackParamList, 'FileTab'>;
export type FileTabScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<FileStackParamList, 'FileTab'>,
  FileScreenNavigationProp
>;

export type FileManagerScreenRouteProp = RouteProp<
  FileStackParamList,
  'FileManager'
>;
export type FileManagerScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<FileStackParamList, 'FileManager'>,
  FileScreenNavigationProp
>;

const FileStack = createStackNavigator<FileStackParamList>();

const FileStackScreen: FC = () => {
  return (
    <FileStack.Navigator>
      <FileStack.Screen
        name="FileTab"
        component={FileTab}
        options={{title: '文件'}}
      />
      <FileStack.Screen
        name="FileManager"
        component={FileManager}
        options={{title: '文件管理'}}
      />
    </FileStack.Navigator>
  );
};

const MainTab = createBottomTabNavigator<MainTabParamList>();
const MainTabScreen: FC = () => {
  return (
    <MainTab.Navigator screenOptions={{headerShown: false}}>
      <MainTab.Screen name="File" component={FileStackScreen} />
      <MainTab.Screen name="Other" component={OtherTab} />
    </MainTab.Navigator>
  );
};

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackScreen: FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Main"
        component={MainTabScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};
