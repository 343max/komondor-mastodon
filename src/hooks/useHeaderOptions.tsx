import React from "react"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationOptions } from "@react-navigation/native-stack"

export const useUpdateHeaderOptions = (
  callback: () => NativeStackNavigationOptions,
  deps: React.DependencyList
) => {
  const anyNav = useNavigation()

  const stackNav = React.useMemo(() => {
    // make sure we are using the stack navigators header as this is the one we show
    return anyNav.getState().type === "tab" ? anyNav.getParent() : anyNav
  }, [anyNav])

  React.useEffect(() => {
    if (stackNav) {
      stackNav.setOptions(callback())
    }
  }, [stackNav, ...deps])
}
