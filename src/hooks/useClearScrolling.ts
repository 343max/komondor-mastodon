import React from "react"
import { ScrollViewProps } from "react-native"

export const useClearScrolling = (): [ScrollViewProps, boolean] => {
  const [lastY, setLastY] = React.useState(0)
  const [scrolledDown, setScrolledDown] = React.useState(false)

  const props: ScrollViewProps = {
    onScrollBeginDrag: ({ nativeEvent }) => {
      setLastY(nativeEvent.contentOffset.y)
    },
    onScroll: ({ nativeEvent }) => {
      setScrolledDown(
        nativeEvent.contentOffset.y > lastY && nativeEvent.contentOffset.y > 50
      )
      setLastY(nativeEvent.contentOffset.y)
    },
  }

  return [props, scrolledDown] as [ScrollViewProps, boolean]
}
