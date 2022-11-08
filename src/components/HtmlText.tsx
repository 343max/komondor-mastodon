import { Text } from "react-native-paper"
import { parse, Node, HTMLElement } from "node-html-parser"
import { StyleProp, TextStyle, View } from "react-native"
import { tw } from "../lib/tw"
import { useStatusLinkHandler } from "../hooks/useStatusLinkHandler"

type Props = {
  text: string
  style?: StyleProp<TextStyle>
}

export const HtmlText: React.FC<Props> = ({ text, style }) => {
  const root = parse(text)
  const handleLink = useStatusLinkHandler()

  const renderViews = (
    node: HTMLElement | Node,
    index: number,
    textStyle: StyleProp<TextStyle> | undefined
  ): React.ReactElement<any, any> | null => {
    if (!(node instanceof HTMLElement)) {
      return <Text style={textStyle}>{node.textContent}</Text>
    } else {
      if (node.tagName === null) {
        return (
          <Text style={style}>
            {node.childNodes.map((n, i) => renderViews(n, i, textStyle))}
          </Text>
        )
      } else if (node.tagName === "P") {
        return (
          <Text>
            {index > 0 ? "\n\n" : ""}
            {node.childNodes.map((n, i) => renderViews(n, i, textStyle))}
          </Text>
        )
      } else if (node.tagName === "BR") {
        return <Text>{"\n"}</Text>
      } else if (node.tagName === "A") {
        return (
          <Text onPress={() => handleLink(node.attributes)}>
            {node.childNodes.map((n, i) =>
              renderViews(n, i, tw`text-blue-500`)
            )}
          </Text>
        )
      } else if (node.tagName === "SPAN") {
        if ((node.attributes["class"] ?? "").includes("invisible")) {
          return null
        } else {
          return (
            <>{node.childNodes.map((n, i) => renderViews(n, i, textStyle))}</>
          )
        }
      } else {
        console.error(`unknown tag: ${node.tagName}`)
        return null
      }
    }
  }

  return <>{renderViews(root, 0, undefined)}</>
}
