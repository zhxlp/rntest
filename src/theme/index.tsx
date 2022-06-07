import {StyleSheet} from 'react-native';
import {palette} from './colors';

const theme = {
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  colors: {
    headerBackground: palette.WHITE,
    mainBackground: palette.GREY_2,
    lineBackground: palette.GREY_4,
  },
};

export const globalStyle = StyleSheet.create({
  directionRow: {
    flexDirection: 'row',
  },
  directionColumm: {
    flexDirection: 'column',
  },
  flex0: {
    flex: 0,
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  fullContainer: {
    backgroundColor: theme.colors.mainBackground,
    flex: 1,
    flexGrow: 1,
  },
  SafeAreaViewStyle: {
    backgroundColor: theme.colors.headerBackground,
    flex: 1,
  },
  pageContainerStyle: {
    backgroundColor: theme.colors.mainBackground,
  },
});
