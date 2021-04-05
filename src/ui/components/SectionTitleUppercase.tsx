import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import type CommonTextProps from '../models/CommonTextProps';
import useTheme from '../../theme/hooks/useTheme';

interface Props extends CommonTextProps {
  children: string | string[];
}

export const SectionTitleUppercase = (props: Props) => {
  const theme = useTheme();
  return (
    <Text style={[styles.root, { color: theme.txtColor }, props.style]}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  root: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 20,
  },
});
