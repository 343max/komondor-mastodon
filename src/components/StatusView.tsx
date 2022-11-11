import { EvilIcons } from "@expo/vector-icons"
import { Status } from "masto"
import React from "react"
import { View, StyleProp, ViewStyle } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { tw } from "../lib/tw"
import { Avatar } from "./Avatar"
import { MediaAttachmentView } from "./MediaAttachmentView"
import { HtmlText } from "./HtmlText"
import { StatusActionBar } from "./StatusActionBar"

type Props = {
  status: Status
  style?: StyleProp<ViewStyle> | undefined
  showActions: boolean
}

export const StatusView: React.FC<Props> = ({ status, style, showActions }) => {
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
          {displayStatus.content.length > 0 ? (
            <HtmlText text={displayStatus.content} />
          ) : null}
          {displayStatus.mediaAttachments.length > 0 ? (
            <View style={tw`mt-3`}>
              {displayStatus.mediaAttachments.map((attachment) => (
                <MediaAttachmentView
                  attachment={attachment}
                  key={attachment.id}
                />
              ))}
            </View>
          ) : null}
          {showActions ? (
            <StatusActionBar status={status} style={tw`mt-2`} />
          ) : null}
        </View>
      </View>
    </View>
  )
}
