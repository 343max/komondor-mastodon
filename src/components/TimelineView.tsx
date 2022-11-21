import React from "react"
import { StatusListItem } from "./StatusListItem"
import { FlatList, View } from "react-native"
import { PaginatorFn, usePaginator } from "../hooks/usePaginator"
import { useClearScrolling } from "../hooks/useClearScrolling"
import { tw } from "../lib/tw"
import { useScrollingHeaderOptions } from "../hooks/useScrollingHeaderOptions"
import { Status } from "masto"
import { useStackNavigation } from "../hooks/useStackNavigation"

type Props<P> = {
  timeline: PaginatorFn<P, Status>
  headerTitle: string
  autoHidingHeader?: boolean
}

export const TimelineView = <P, T>({
  timeline,
  headerTitle,
  autoHidingHeader = false,
}: Props<P>): ReturnType<React.FC> => {
  const props = usePaginator(timeline)
  const [scrollProps, scrolledDown] = useClearScrolling()
  const { push } = useStackNavigation()

  const { headerHeight } = useScrollingHeaderOptions(
    scrolledDown && autoHidingHeader,
    () => ({
      headerTitle,
    }),
    [headerTitle]
  )

  return (
    <FlatList
      {...scrollProps}
      {...props}
      style={[tw`h-full`]}
      ListHeaderComponent={
        <View
          style={{
            height: headerHeight,
          }}
        />
      }
      renderItem={({ item }) => (
        <StatusListItem
          status={item}
          showActions={true}
          onPress={() => push("StatusDetails", { status: item })}
        />
      )}
    />
  )
}
