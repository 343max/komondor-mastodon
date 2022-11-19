import React from "react"
import { useUpdateHeaderOptions } from "./useHeaderOptions"
import { useHeaderHeight } from "@react-navigation/elements"
import { NativeStackNavigationOptions } from "@react-navigation/native-stack"

export const useScrollingHeaderOptions = (
  headerHidden: boolean,
  callback?: () => NativeStackNavigationOptions,
  deps?: React.DependencyList
) => {
  const headerHeight = useHeaderHeight()
  const [visibleHeaderHeight, setVisibleHeaderHeight] = React.useState(0)
  React.useEffect(() => {
    if (headerHeight > visibleHeaderHeight) setVisibleHeaderHeight(headerHeight)
  }, [headerHeight])

  useUpdateHeaderOptions(() => {
    const outerOptions = callback ? callback() : {}
    const options: NativeStackNavigationOptions = {
      ...outerOptions,
      headerTransparent: true,
      headerStyle: {
        backgroundColor: "white",
      },
      headerShown: !headerHidden,
    }
    return options
  }, [headerHidden, ...(deps ?? [])])

  return { headerHeight: visibleHeaderHeight }
}
