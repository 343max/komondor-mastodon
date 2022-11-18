import React from "react"
import { StatusListItem } from "./StatusListItem"
import { FlatList, View } from "react-native"
import { usePaginator } from "../hooks/usePaginator"
import { useCurrentAccountMeta } from "../hooks/useCurrentAccountMeta"
import { fullUserName } from "../lib/fullUsername"
import { useClearScrolling } from "../hooks/useClearScrolling"
import { tw } from "../lib/tw"
import { useScrollingHeaderOptions } from "../hooks/useScrollingHeaderOptions"

type Props = {
  timeline: "home" | "public"
}

export const TimelineView: React.FC<Props> = ({ timeline }) => {
  const props = usePaginator((client) =>
    timeline === "home" ? client.timelines.home : client.timelines.public
  )

  const [scrollProps, scrolledDown] = useClearScrolling()

  const accountMeta = useCurrentAccountMeta()
  const { headerHeight } = useScrollingHeaderOptions(
    !scrolledDown,
    () =>
      !accountMeta
        ? {}
        : {
            headerTitle: fullUserName(accountMeta),
          },
    [accountMeta]
  )

  return (
    <FlatList
      {...scrollProps}
      {...props}
      style={[tw`h-full`, { marginTop: -headerHeight }]}
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
