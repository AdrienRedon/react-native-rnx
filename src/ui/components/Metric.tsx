import React from 'react';
import { View, StyleSheet } from 'react-native';
import type CommonViewProps from '../models/CommonViewProps';
import { Text } from './Text';
import { CardBg } from './CardBg';

interface Props extends CommonViewProps {
  value: string;
  title: string;
  detail?: string;
}

export const Metric = (props: Props) => {
  return (
    <CardBg style={[styles.container, props.style]}>
      <Text style={styles.value}>{props.value}</Text>
      <View>
        <Text style={styles.title}>{props.title}</Text>
        {!!props.detail && <Text style={styles.detail}>{props.detail}</Text>}
      </View>
    </CardBg>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  value: {
    textAlign: 'right',
    fontSize: 30,
    fontWeight: '700',
    marginRight: 3,
    marginTop: -4,
  },
  title: {
    fontWeight: '700',
    fontSize: 12,
  },
  detail: {
    fontSize: 10,
  },
});
