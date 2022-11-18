import React from "react"
import { useNavigation } from "@react-navigation/native"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"

export const useHeaderOptions = (
  callback: () => BottomTabNavigationOptions,
  deps: React.DependencyList
) => {
  const { setOptions } = useNavigation()

  React.useEffect(() => {
    setOptions(callback())
  }, [setOptions, ...deps])
}
