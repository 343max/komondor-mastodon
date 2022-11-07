import React from "react"
import { useNavigation } from "@react-navigation/native"
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"

export const useHeaderOptions = (options: BottomTabNavigationOptions) => {
  const { setOptions } = useNavigation()

  React.useEffect(() => {
    setOptions(options)
  }, [setOptions, options])
}
