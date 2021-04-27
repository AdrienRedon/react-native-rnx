import React from 'react';
import { StyleSheet } from 'react-native';
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
    <CardBg style={[styles.container, props.style]} color={'transparent'}>
      <Text style={styles.value}>{props.value}</Text>
      <Text style={styles.title}>{props.title}</Text>
      {!!props.detail && <Text style={styles.detail}>{props.detail}</Text>}
    </CardBg>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'visible',
  },
  value: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
  },
  title: { textAlign: 'center', fontWeight: '700', fontSize: 14 },
  detail: { textAlign: 'center', fontSize: 12 },
});
