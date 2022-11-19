import { EvilIcons } from "@expo/vector-icons"
import { Status } from "masto"
import React from "react"
import {
  View,
  StyleProp,
  ViewStyle,
  Pressable,
  PressableProps,
} from "react-native"
import { Text, useTheme } from "react-native-paper"
import { tw } from "../lib/tw"
import { Avatar } from "./Avatar"
import { StatusActionBar } from "./StatusActionBar"
import { StatusContentView } from "./StatusContentView"

type Props = {
  status: Status
  style?: StyleProp<ViewStyle> | undefined
  showActions?: boolean
  onPress?: PressableProps["onPress"]
}

export const StatusView: React.FC<Props> = ({
  status,
  style,
  showActions = false,
  onPress,
}) => {
  const { colors } = useTheme()
  const isRepost = status.reblog != null
  const displayStatus = status.reblog ?? status
  return (
    <View style={style}>
      {isRepost ? (
        <View style={tw`mb-1 flex-row`}>
          <EvilIcons name="retweet" size={24} color={colors.onSurface} />
          <Avatar
            uri={status.account.avatarStatic}
            size={18}
            style={tw`mx-1`}
          />
          <Text variant="titleSmall">{status.account.displayName}</Text>
        </View>
      ) : null}
      <Pressable onPress={onPress}>
        <View style={tw`flex-row w-full`}>
          <Avatar
            uri={displayStatus.account.avatarStatic}
            size={30}
            style={tw`mr-3 mt-[4px]`}
          />
          <View style={tw`flex-shrink-1`}>
            {displayStatus.account.displayName !== "" ? (
              <Text variant="titleSmall">
                {displayStatus.account.displayName}
              </Text>
            ) : null}
            <Text variant="titleSmall" style={tw`opacity-60`}>
              {`@${displayStatus.account.acct}`}
            </Text>
            <StatusContentView status={displayStatus} />
            {showActions ? (
              <StatusActionBar status={status} style={tw`mt-2`} />
            ) : null}
          </View>
        </View>
      </Pressable>
    </View>
  )
}
