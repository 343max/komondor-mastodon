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
  const [scrollEnabled, setScrollEnabled] = React.useState(true)

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
      progressViewOffset={headerHeight}
      scrollEnabled={scrollEnabled}
      ListHeaderComponent={
        <View
          style={{
            height: headerHeight,
          }}
        />
      }
      extraData={[headerHeight]}
      listKey="id"
      initialNumToRender={5}
      maxToRenderPerBatch={8}
      windowSize={15}
      renderItem={({ item }) => {
        return (
          <StatusListItem
            status={item}
            showActions={true}
            setScrollingEnabled={setScrollEnabled}
            onPress={() => push("StatusDetails", { status: item })}
          />
        )
      }}
    />
  )
}
