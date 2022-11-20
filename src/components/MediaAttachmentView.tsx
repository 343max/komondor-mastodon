import React from "react"
import { Attachment } from "masto"
import { View, Image } from "react-native"
import { Text } from "react-native-paper"
import { tw } from "../lib/tw"
import { Video } from "expo-av"
import { ResizeMode } from "../../node_modules/expo-av/build/Video.types"
import { AutoSizingImage } from "./AutoSizingImage"

type Props = {
  attachment: Attachment
}

const ImageAttachment: React.FC<Props> = ({ attachment }) => {
  const meta = attachment.meta?.small ?? { width: 16, height: 9 }
  return (
    <AutoSizingImage
      imageSize={meta}
      resizeDirection="vertical"
      source={{ uri: attachment.previewUrl }}
      style={[tw`w-full`]}
    />
  )
}

const GifvAttachment: React.FC<Props> = ({ attachment }) => {
  const [height, setHeight] = React.useState(1)
  const meta = attachment.meta?.small ?? { width: 16, height: 9 }
  if (!attachment.url) {
    return <ImageAttachment attachment={attachment} />
  } else {
    return (
      <Video
        onLayout={({ nativeEvent }) => {
          setHeight(
            Math.round(
              (nativeEvent.layout.width / (meta.width ?? 100)) * meta.height
            )
          )
        }}
        shouldPlay
        isLooping
        source={{ uri: attachment.url }}
        resizeMode={ResizeMode.CONTAIN}
        style={[tw`w-full`, { height }]}
      />
    )
  }
}
const UnsupportedAttachment: React.FC<Props> = ({ attachment }) => {
  return <Text>⚠️ unsupported media type: ${attachment.type}</Text>
}

export const MediaAttachmentView: React.FC<Props> = ({ attachment }) => {
  const attachmentView = () => {
    if (attachment.type === "image") {
      return <ImageAttachment attachment={attachment} />
    } else if (attachment.type === "gifv") {
      return <GifvAttachment attachment={attachment} />
    } else {
      return <UnsupportedAttachment attachment={attachment} />
    }
  }

  return <View>{attachmentView()}</View>
}
