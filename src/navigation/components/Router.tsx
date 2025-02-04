import * as React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import type Screen from '../models/Screen';
import { Stack } from './Stack';
import useTheme from '../../theme/hooks/useTheme';
import { BottomSheet } from '../../ui/components/BottomSheet';

const Tab = createBottomTabNavigator();

interface Props {
  tabs: {
    [name: string]: {
      screens: Screen[];
      initial: string;
      title?: string;
      iconName: string;
      iconSize?: number;
    };
  };
}

export const Router = (props: Props) => {
  const theme = useTheme();
  const isDarkTheme = useColorScheme() === 'dark';

  const tabs = Object.keys(props.tabs).map((name) => ({
    name,
    ...props.tabs[name],
  }));

  return (
    <>
      <View style={[styles.root, { backgroundColor: theme.bgColor }]}>
        <NavigationContainer
          theme={{
            dark: isDarkTheme,
            colors: {
              primary: theme.primaryColor,
              background: theme.bgColor,
              card: theme.bgColor,
              text: theme.txtColor,
              border: theme.bgColor,
              notification: theme.txtColor,
            },
          }}
        >
          {tabs.length > 1 ? ( // Multiple tabs: show bottom bar
            <Tab.Navigator
              screenOptions={(_tabNavProps) => {
                const routeName = getFocusedRouteNameFromRoute(
                  _tabNavProps.route
                );
                return {
                  tabBarVisible:
                    !routeName ||
                    routeName === props.tabs[_tabNavProps.route.name].initial,
                  tabBarIcon: ({ color }) => {
                    return (
                      <Icon
                        name={props.tabs[_tabNavProps.route.name].iconName}
                        size={21}
                        color={color}
                        solid={true}
                      />
                    );
                  },
                };
              }}
              tabBarOptions={{
                activeTintColor: theme.primaryColor,
                inactiveTintColor: 'gray',
              }}
            >
              {tabs.map((s) => (
                <Tab.Screen
                  key={s.name}
                  name={s.name}
                  options={{
                    title: s.title || s.name,
                  }}
                >
                  {(stackProps) => (
                    <Stack
                      {...stackProps}
                      screens={s.screens}
                      initial={s.initial}
                    />
                  )}
                </Tab.Screen>
              ))}
            </Tab.Navigator>
          ) : tabs.length === 1 ? ( // One tab: don't show bottom bar
            <Stack screens={tabs[0].screens} initial={tabs[0].initial} />
          ) : undefined}
        </NavigationContainer>
      </View>
      <BottomSheet />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
