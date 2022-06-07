import {NavigationContainerRef, StackActions} from '@react-navigation/core';
import {RootStackParamList} from '@routes';
import {createRef} from 'react';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();
export const isMountedRef = createRef();

interface NavigateProps {
  <RouteName extends keyof RootStackParamList>(
    options:
      | {
          key: string;
          params?: RootStackParamList[RouteName];
          merge?: boolean;
        }
      | {
          name: RouteName;
          key?: string;
          params: RootStackParamList[RouteName];
          merge?: boolean;
        },
  ): void;
}

export const navigate: NavigateProps = options => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(options);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

export const navigatePop = (): void => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current?.dispatch(StackActions.pop());
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

export const popToTop = (): void => {
  if (isMountedRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current?.dispatch(StackActions.popToTop());
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};
