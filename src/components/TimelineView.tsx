import React from "react"
import { StatusListItem } from "./StatusListItem"
import { Animated, FlatList, View } from "react-native"
import { usePaginator } from "../hooks/usePaginator"
import { useCurrentAccountMeta } from "../hooks/useCurrentAccountMeta"
import { fullUserName } from "../lib/fullUsername"
import { useClearScrolling } from "../hooks/useClearScrolling"
import { useSetOptions } from "../hooks/useSetOptions"
import { tw } from "../lib/tw"

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

  const [headerHeight, setHeaderHeight] = React.useState(0)

  React.useEffect(() => {
    Animated.spring(headerTranslation, {
      toValue: scrolledDown ? -headerHeight : 0,
      useNativeDriver: true,
    }).start()
  }, [scrolledDown, headerTranslation, headerHeight])

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
      })
    }
  }, [accountMeta, headerTranslation])

  return (
    <FlatList
      {...scrollProps}
      {...props}
      style={{ marginTop: -headerHeight }}
      renderItem={({ item, index }) => (
        <View
          style={{
            marginTop: index === 0 ? headerHeight : 0,
          }}
          key={item.id}
        >
          <StatusListItem status={item} showActions={true} />
        </View>
      )}
    />
  )
}
