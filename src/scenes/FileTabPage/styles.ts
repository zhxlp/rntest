import {palette} from '@theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: palette.BLUE_6,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: palette.WHITE,
  },
  buttonText: {
    color: palette.WHITE,
    fontSize: 12,
  },
});

export default styles;
