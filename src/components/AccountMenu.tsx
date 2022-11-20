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
import { Haptics } from "../lib/haptics"

export const accountHeaderButton = (props: {
  tintColor?: string
  pressColor?: string
  pressOpacity?: number
  labelVisible?: boolean
}): React.ReactNode => <AccountHeaderButton />

type MenuItemProps = React.ComponentProps<typeof Menu.Item> & {
  dismiss: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ onPress, dismiss, ...props }) => {
  return (
    <Menu.Item
      {...props}
      onPress={() => {
        dismiss()
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        if (onPress) onPress()
      }}
    />
  )
}

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
          onPressIn={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            setVisible(true)
          }}
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
          <MenuItem
            key={a.appId}
            dismiss={dismiss}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
              setCurrentAccountId(a.appId)
            }}
            title={fullUserName(a)}
            leadingIcon={() => <Avatar uri={a.avatarStatic} size={28} />}
          />
        ))}
      <MenuItem
        title="Add account..."
        dismiss={dismiss}
        onPress={() => {
          navigate("Login")
        }}
        leadingIcon={() => (
          <SimpleLineIcons name="wrench" size={24} color={colors.primary} />
        )}
      />
      <MenuItem
        title="Remove all accounts..."
        dismiss={dismiss}
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
