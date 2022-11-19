import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { ColorSchemeName } from "react-native"

import { RootStackParamList, RootTabParamList } from "../../types"
import { LoginScreen } from "../screens/LoginScreen"
import { HomeTimelineScreen } from "../screens/HomeTimelineScreen"
import { useTheme } from "react-native-paper"
import { NotificationsScreen } from "../screens/NotificationsScreen"
import { acountHeaderButton } from "../components/AccountMenu"
import { Ionicons } from "@expo/vector-icons"
import { ListsScreen } from "../screens/ListsScreen"
import { ListStatusesScreen } from "../screens/ListStatusesScreen"

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="List" component={ListStatusesScreen} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const { colors } = useTheme()

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTimeline"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <BottomTab.Screen
        name="HomeTimeline"
        component={HomeTimelineScreen}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={28} color={color} />
          ),
          headerLeft: acountHeaderButton,
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="ios-notifications-outline"
              size={28}
              color={color}
            />
          ),
          headerLeft: acountHeaderButton,
        }}
      />
      <BottomTab.Screen
        name="Lists"
        component={ListsScreen}
        options={{
          title: "Lists",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={28} color={color} />
          ),
          headerLeft: acountHeaderButton,
        }}
      />
    </BottomTab.Navigator>
  )
}
