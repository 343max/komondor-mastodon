import React from "react"
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
    const renderChildNodes = (ts: StyleProp<TextStyle> | undefined) =>
      node.childNodes.map((n, i) => (
        <React.Fragment key={i}>{renderViews(n, i, ts)}</React.Fragment>
      ))

    if (!(node instanceof HTMLElement)) {
      return <Text style={textStyle}>{node.textContent}</Text>
    } else {
      if (node.tagName === null) {
        return <Text style={style}>{renderChildNodes(textStyle)}</Text>
      } else if (node.tagName === "P") {
        return (
          <Text>
            {index > 0 ? "\n\n" : ""}
            {renderChildNodes(textStyle)}
          </Text>
        )
      } else if (node.tagName === "BR") {
        return <Text>{"\n"}</Text>
      } else if (node.tagName === "A") {
        return (
          <Text onPress={() => handleLink(node.attributes)}>
            {renderChildNodes(tw`text-blue-500`)}
          </Text>
        )
      } else if (node.tagName === "SPAN") {
        if ((node.attributes["class"] ?? "").includes("invisible")) {
          return null
        } else {
          return <>{renderChildNodes(textStyle)}</>
        }
      } else {
        console.error(`unknown tag: ${node.tagName}`)
        return null
      }
    }
  }

  return <>{renderViews(root, 0, undefined)}</>
}
