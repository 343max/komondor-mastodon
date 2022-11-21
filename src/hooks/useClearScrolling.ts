import React from "react"
import { ScrollViewProps } from "react-native"

export const useClearScrolling = (): [ScrollViewProps, boolean] => {
  const lastY = React.useRef(0)
  const [scrolledDown, setScrolledDown] = React.useState(false)

  const props: ScrollViewProps = React.useMemo(
    () => ({
      onScrollBeginDrag: ({ nativeEvent }) => {
        lastY.current = nativeEvent.contentOffset.y
      },
      onScroll: ({ nativeEvent }) => {
        setScrolledDown(
          nativeEvent.contentOffset.y > lastY.current &&
            nativeEvent.contentOffset.y > 50
        )
        lastY.current = nativeEvent.contentOffset.y
      },
    }),
    []
  )

  return [props, scrolledDown]
}
