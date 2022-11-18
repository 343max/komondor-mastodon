import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import React from "react"
import { Animated } from "react-native"
import { tw } from "../lib/tw"
import { useHeaderOptions } from "./useHeaderOptions"

export const useScrollingHeaderOptions = (
  headerVisible: boolean,
  callback?: () => BottomTabNavigationOptions,
  deps?: React.DependencyList
) => {
  const headerTranslation = React.useRef(new Animated.Value(0)).current
  const [headerHeight, setHeaderHeight] = React.useState(0)

  React.useEffect(() => {
    Animated.spring(headerTranslation, {
      toValue: headerVisible ? 0 : -headerHeight,
      useNativeDriver: true,
    }).start()
  }, [headerVisible, headerTranslation, headerHeight])

  useHeaderOptions(() => {
    const outerOptions = callback ? callback() : {}
    return {
      ...outerOptions,
      headerBackground: () => {
        return (
          <Animated.View
            style={[
              tw`w-full h-full bg-white dark:bg-black`,
              { transform: [{ translateY: headerTranslation }] },
            ]}
            onLayout={({ nativeEvent }) => {
              setHeaderHeight(nativeEvent.layout.height)
            }}
          />
        )
      },
      headerStyle: {
        transform: [{ translateY: headerTranslation }],
      },
    }
  }, [headerVisible, ...(deps ?? [])])

  return { headerHeight }
}
