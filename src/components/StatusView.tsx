import { EvilIcons } from "@expo/vector-icons"
import { Status } from "masto"
import React from "react"
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  PressableProps,
  Share,
} from "react-native"
import { Text, useTheme } from "react-native-paper"
import { tw } from "../lib/tw"
import { Avatar } from "./Avatar"
import { StatusContentView } from "./StatusContentView"
import { useStackNavigation } from "../hooks/useStackNavigation"
import { GestureMenu } from "./GestureMenu/GestureMenu"

type Props = {
  status: Status
  style?: StyleProp<ViewStyle> | undefined
  showActions?: boolean
  onPress?: PressableProps["onPress"]
  setScrollingEnabled?: (enabled: boolean) => void
}

export const StatusView: React.FC<Props> = ({
  status,
  style,
  showActions = false,
  onPress,
  setScrollingEnabled,
}) => {
  const { colors } = useTheme()
  const isRepost = status.reblog != null
  const displayStatus = status.reblog ?? status
  const { push } = useStackNavigation()

  const pushAuthorProfile = () =>
    push("UserProfile", { user: displayStatus.account })

  return (
    <View style={style}>
      <View>
        {isRepost ? (
          <Pressable
            onPress={() => push("UserProfile", { user: status.account })}
          >
            <View style={tw`mb-1 flex-row`}>
              <EvilIcons name="retweet" size={24} color={colors.onSurface} />
              <Avatar
                uri={status.account.avatarStatic}
                size={18}
                style={tw`mx-1`}
              />
              <Text variant="titleSmall">{status.account.displayName}</Text>
            </View>
          </Pressable>
        ) : null}
        <Pressable onPress={onPress}>
          <View style={tw`flex-row w-full`}>
            <Pressable onPress={pushAuthorProfile}>
              <Avatar
                uri={displayStatus.account.avatarStatic}
                size={30}
                style={tw`mr-3 mt-[4px]`}
              />
            </Pressable>
            <View style={tw`flex-shrink-1`}>
              <Pressable onPress={pushAuthorProfile}>
                {displayStatus.account.displayName !== "" ? (
                  <Text variant="titleSmall">
                    {displayStatus.account.displayName}
                  </Text>
                ) : null}
                <Text variant="titleSmall" style={tw`opacity-60`}>
                  {`@${displayStatus.account.acct}`}
                </Text>
              </Pressable>
              <StatusContentView status={displayStatus} />
            </View>
          </View>
        </Pressable>
      </View>
      {showActions ? (
        <GestureMenu
          style={tw`absolute right-6 top-3 pl-20`}
          setScrollingEnabled={setScrollingEnabled}
          menuItems={[
            {
              label: "Share",
              action: () => Share.share({ url: status.url ?? status.uri }),
            },
            {
              label: "Share Debug Information",
              action: () =>
                Share.share({ message: JSON.stringify(status, undefined, 2) }),
            },
          ]}
        />
      ) : null}
    </View>
  )
}
