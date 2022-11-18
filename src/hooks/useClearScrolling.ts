import React from "react"
import { ScrollViewProps } from "react-native"

export const useClearScrolling = (): [ScrollViewProps, boolean] => {
  const [userIsScrolling, setUserIsScrolling] = React.useState(false)
  const [lastY, setLastY] = React.useState(0)
  const [scrolledDown, setScrolledDown] = React.useState(false)

  const props: ScrollViewProps = React.useMemo(
    () => ({
      onScrollBeginDrag: ({ nativeEvent }) => {
        setUserIsScrolling(true)
        setLastY(nativeEvent.contentOffset.y)
      },
      onScrollEndDrag: () => {
        setUserIsScrolling(false)
      },
      onScroll: ({ nativeEvent }) => {
        if (userIsScrolling) {
          setScrolledDown(
            nativeEvent.contentOffset.y > lastY &&
              nativeEvent.contentOffset.y > 50
          )
          setLastY(nativeEvent.contentOffset.y)
        }
      },
    }),
    [userIsScrolling]
  )

  return [props, scrolledDown] as [ScrollViewProps, boolean]
}
