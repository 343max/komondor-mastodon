import React from "react"
import { Pressable, Alert } from "react-native"
import { Menu, useTheme } from "react-native-paper"
import { useCurrentAccountId } from "../hooks/useCurrentAccountId"
import { useKnownAccounts } from "../hooks/useKnownAccounts"
import { tw } from "../lib/tw"
import { fullUserName } from "../lib/fullUsername"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { Avatar } from "./Avatar"
import { useStoredAccounts } from "../hooks/useStoredAccounts"

export const acountHeaderButton = (props: {
  tintColor?: string
  pressColor?: string
  pressOpacity?: number
  labelVisible?: boolean
}): React.ReactNode => <AccountHeaderButton />

const AccountHeaderButton: React.FC = () => {
  const [currentAccountId, setCurrentAccountId] = useCurrentAccountId()
  const knowAccounts = useKnownAccounts()
  const { removeAllAccounts } = useStoredAccounts()

  const { navigate } = useNavigation()
  const { colors } = useTheme()

  const myAccount = React.useMemo(
    () => knowAccounts.find(({ appId }) => appId === currentAccountId),
    [currentAccountId, knowAccounts]
  )

  const [visible, setVisible] = React.useState(false)

  const dismiss = () => setVisible(false)

  return (
    <Menu
      visible={visible}
      onDismiss={dismiss}
      style={tw`mt-9`}
      contentStyle={tw`rounded-lg`}
      anchor={
        <Pressable
          onPress={() => setVisible(true)}
          style={({ pressed }) =>
            tw`px-4 ${!pressed ? "opacity-100" : "opacity-50"}`
          }
        >
          <Avatar uri={myAccount?.avatarStatic} size={30} />
        </Pressable>
      }
    >
      {knowAccounts
        .filter(({ appId }) => appId !== currentAccountId)
        .map((a) => (
          <Menu.Item
            key={a.appId}
            onPress={() => {
              setCurrentAccountId(a.appId)
              dismiss()
            }}
            title={fullUserName(a)}
            leadingIcon={() => <Avatar uri={a.avatarStatic} size={28} />}
          />
        ))}
      <Menu.Item
        title="Add account..."
        onPress={() => {
          navigate("Login")
          dismiss()
        }}
        leadingIcon={() => (
          <SimpleLineIcons name="wrench" size={24} color={colors.primary} />
        )}
      />
      <Menu.Item
        title="Remove all accounts..."
        onPress={() => {
          Alert.alert(
            "Remove All Accounts?",
            "This will remove all logged in accounts from the app. Are you sure?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Remove All Accounts",
                style: "destructive",
                onPress: () => {
                  removeAllAccounts().then(() => {
                    setCurrentAccountId(undefined)
                    Alert.alert("Removed All Accounts")
                  })
                },
              },
            ]
          )
        }}
        leadingIcon={() => (
          <AntDesign name="delete" size={24} color={colors.error} />
        )}
      />
    </Menu>
  )
}
