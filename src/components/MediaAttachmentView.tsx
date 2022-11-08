import React from "react"
import { Attachment } from "masto"
import { View, Image } from "react-native"
import { Text } from "react-native-paper"
import { tw } from "../lib/tw"

type Props = {
  attachment: Attachment
}

const ImageAttachment: React.FC<Props> = ({ attachment }) => {
  const [height, setHeight] = React.useState(1)
  const meta = attachment.meta?.small ?? { width: 16, height: 9 }
  return (
    <Image
      onLayout={({ nativeEvent }) => {
        setHeight(
          Math.round(
            (nativeEvent.layout.width / (meta.width ?? 100)) * meta.height
          )
        )
      }}
      source={{ uri: attachment.previewUrl }}
      style={[tw`w-full`, { height }]}
    />
  )
}

const UnsupportedAttachment: React.FC<Props> = ({ attachment }) => {
  return <Text>{attachment.type}</Text>
}

export const MediaAttachmentView: React.FC<Props> = ({ attachment }) => {
  const attachmentView = () => {
    if (attachment.type === "image") {
      return <ImageAttachment attachment={attachment} />
    } else {
      return <UnsupportedAttachment attachment={attachment} />
    }
  }

  return <View>{attachmentView()}</View>
}
