import { SimpleLineIcons } from "@expo/vector-icons"
import { Status } from "masto"
import React from "react"
import { View, StyleProp, ViewStyle, TouchableOpacity } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { tw } from "../lib/tw"
import { Avatar } from "./Avatar"
import { MediaAttachmentView } from "./MediaAttachmentView"

type Props = {
  status: Status
  style?: StyleProp<ViewStyle> | undefined
}

export const StatusView: React.FC<Props> = ({ status, style }) => {
  const { colors } = useTheme()
  return (
    <View style={[tw`flex-row w-full`, style]}>
      <Avatar uri={status.account.avatarStatic} size={30} style={tw`mr-3`} />
      <View style={tw`w-full`}>
        <Text variant="titleSmall">
          {status.account.displayName}
          <TouchableOpacity
            onPress={() => {
              console.log(JSON.stringify(status, null, 2))
            }}
          >
            <SimpleLineIcons
              name="wrench"
              size={12}
              color={colors.primary}
              style={tw`pl-2`}
            />
          </TouchableOpacity>
        </Text>
        <Text variant="titleSmall">{status.account.acct}</Text>
        {status.reblog ? (
          <StatusView status={status.reblog} style={tw`mt-2`} />
        ) : (
          <Text>{status.content}</Text>
        )}
        {status.mediaAttachments.map((attachment) => (
          <MediaAttachmentView attachment={attachment} />
        ))}
      </View>
    </View>
  )
}
