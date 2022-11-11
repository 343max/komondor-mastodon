import { Status } from "masto"
import { StyleProp, View, ViewStyle } from "react-native"
import { tw } from "../lib/tw"
import { HtmlText } from "./HtmlText"
import { MediaAttachmentView } from "./MediaAttachmentView"

type Props = {
  status: Status
  style?: StyleProp<ViewStyle> | undefined
}

export const StatusContentView: React.FC<Props> = ({ status, style }) => {
  return (
    <View style={style}>
      {status.content.length > 0 ? <HtmlText text={status.content} /> : null}
      {status.mediaAttachments.length > 0 ? (
        <View style={tw`mt-3`}>
          {status.mediaAttachments.map((attachment) => (
            <MediaAttachmentView attachment={attachment} key={attachment.id} />
          ))}
        </View>
      ) : null}
    </View>
  )
}
