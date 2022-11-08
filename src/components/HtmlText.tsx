import { Text } from "react-native-paper"
import { parse, Node, HTMLElement } from "node-html-parser"
import { StyleProp, TextStyle, View } from "react-native"
import { tw } from "../lib/tw"

type Props = {
  text: string
  style?: StyleProp<TextStyle>
}

export const HtmlText: React.FC<Props> = ({ text, style }) => {
  const root = parse(text)

  const renderViews = (
    node: HTMLElement | Node,
    textStyle: StyleProp<TextStyle> | undefined
  ): React.ReactElement<any, any> | null => {
    if (!(node instanceof HTMLElement)) {
      return <Text style={textStyle}>{node.textContent}</Text>
    } else {
      if (node.tagName === null) {
        return (
          <Text style={style}>
            {node.childNodes.map((n) => renderViews(n, textStyle))}
          </Text>
        )
      } else if (node.tagName === "P") {
        return (
          <Text>
            {node.childNodes.map((n) => renderViews(n, textStyle))}
            {"\n\n"}
          </Text>
        )
      } else if (node.tagName === "BR") {
        return <Text>{"\n"}</Text>
      } else if (node.tagName === "A") {
        return (
          <Text onPress={() => console.log(node.structure)}>
            {node.childNodes.map((n) => renderViews(n, tw`text-blue-500`))}
          </Text>
        )
      } else if (node.tagName === "SPAN") {
        if ((node.attributes["class"] ?? "").includes("invisible")) {
          return null
        } else {
          return <>{node.childNodes.map((n) => renderViews(n, textStyle))}</>
        }
      } else {
        console.error(`unknown tag: ${node.tagName}`)
        return null
      }
    }
  }

  return <>{renderViews(root, undefined)}</>
}
