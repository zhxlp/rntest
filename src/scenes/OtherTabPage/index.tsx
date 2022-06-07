import {globalStyle} from '@theme';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const OtherTab: FC = () => {
  return (
    <SafeAreaView
      style={[globalStyle.SafeAreaViewStyle]}
      edges={['top', 'right', 'left']}>
      <View>
        <Text>OtherTab</Text>
      </View>
    </SafeAreaView>
  );
};

export default OtherTab;
