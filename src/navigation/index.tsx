import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { ColorSchemeName } from "react-native"

import { RootStackParamList, RootTabParamList } from "../../types"
import { LoginScreen } from "../screens/LoginScreen"
import { HomeTimelineScreen } from "../screens/HomeTimelineScreen"
import { useTheme } from "react-native-paper"
import { NotificationsScreen } from "../screens/NotificationsScreen"
import { accountHeaderButton } from "../components/AccountMenu"
import { Ionicons } from "@expo/vector-icons"
import { ListsScreen } from "../screens/ListsScreen"
import { ListStatusesScreen } from "../screens/ListStatusesScreen"
import { StatusDetailScreen } from "../screens/StatusScreen"
import { UserProfileScreen } from "../screens/UserProfileScreen"

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
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="StatusDetails"
        component={StatusDetailScreen}
        options={{ title: "Details" }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ title: "" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const ListsStack = createNativeStackNavigator()

function ListsNavigator() {
  const { getParent } = useNavigation()

  React.useEffect(() => {
    getParent()!.setOptions({ headerShown: false })
  }, [getParent])

  return (
    <ListsStack.Navigator>
      <ListsStack.Screen name="Lists" component={ListsScreen} />
      <ListsStack.Screen name="List" component={ListStatusesScreen} />
    </ListsStack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const { colors } = useTheme()

  const { setOptions } = useNavigation()

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTimeline"
      screenListeners={{
        focus: (e) => {
          const target = e.target ?? ""
          setOptions({
            headerShown: !target.includes("ListsNavigator"),
            headerLeft: target.includes("HomeTimeline")
              ? accountHeaderButton
              : undefined,
          })
        },
      }}
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
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
        }}
      />
      <BottomTab.Screen
        name="ListsNavigator"
        component={ListsNavigator}
        options={{
          title: "Lists",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={28} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
