import { Account } from "masto"
import React from "react"
import { View, Image } from "react-native"
import { Text } from "react-native-paper"
import { tw } from "../lib/tw"
import { Avatar } from "./Avatar"
import { AutoSizingImage } from "./AutoSizingImage"

type Props = {
  user: Account
}

export const UserProfileHeaderView: React.FC<Props> = ({ user }) => {
  return (
    <View>
      <AutoSizingImage
        resizeDirection="vertical"
        source={{ uri: user.header }}
        style={tw`w-full h-10 bg-gray-600`}
        resizeMode="contain"
      />
      <View style={tw`flex-row mx-4 mt-1 mb-5`}>
        <Avatar uri={user.avatar} size={80} style={tw`mt-[-20]`} />
        <View style={tw`flex-col ml-2 flex-shrink-1`}>
          {user.displayName !== "" ? (
            <Text variant="titleSmall">{user.displayName}</Text>
          ) : null}
          <Text variant="titleSmall" style={tw`opacity-60`}>
            {`@${user.acct}`}
          </Text>
        </View>
      </View>
    </View>
  )
}
