import React from "react"
import { StatusListItem } from "./StatusListItem"
import { Animated, FlatList, StatusBar } from "react-native"
import { usePaginator } from "../hooks/usePaginator"
import { useCurrentAccountMeta } from "../hooks/useCurrentAccountMeta"
import { fullUserName } from "../lib/fullUsername"
import { useClearScrolling } from "../hooks/useClearScrolling"
import { useSetOptions } from "../hooks/useSetOptions"
import { tw } from "../lib/tw"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type Props = {
  timeline: "home" | "public"
}

export const TimelineView: React.FC<Props> = ({ timeline }) => {
  const props = usePaginator((client) =>
    timeline === "home" ? client.timelines.home : client.timelines.public
  )

  const setOptions = useSetOptions()

  const [scrollProps, scrolledDown] = useClearScrolling()

  const headerTranslation = React.useRef(new Animated.Value(0)).current
  const tabBarTranslation = React.useRef(new Animated.Value(0)).current

  const [headerHeight, setHeaderHeight] = React.useState(0)

  const safeAreaInsets = useSafeAreaInsets()

  React.useEffect(() => {
    Animated.spring(headerTranslation, {
      toValue: scrolledDown ? -headerHeight : 0,
      useNativeDriver: true,
    }).start()
    Animated.timing(tabBarTranslation, {
      toValue: scrolledDown ? 80 : 0,
      useNativeDriver: true,
    }).start()
  }, [scrolledDown, headerTranslation, tabBarTranslation, headerHeight])

  const accountMeta = useCurrentAccountMeta()
  React.useEffect(() => {
    if (accountMeta) {
      setOptions({
        headerTitle: fullUserName(accountMeta),
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
        tabBarStyle: [{ translateY: tabBarTranslation }],
      })
    }
  }, [accountMeta, headerTranslation, tabBarTranslation])

  return (
    <FlatList
      {...scrollProps}
      {...props}
      contentInset={{ top: headerHeight - safeAreaInsets.top }}
      style={{ marginTop: -headerHeight }}
      renderItem={({ item }) => (
        <StatusListItem status={item} showActions={true} key={item.id} />
      )}
    />
  )
}
