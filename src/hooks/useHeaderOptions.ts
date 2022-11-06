import React from "react"
import { HeaderOptions } from "@react-navigation/elements"
import { useNavigation } from "@react-navigation/native"

export const useHeaderOptions = (options: HeaderOptions) => {
  const { setOptions } = useNavigation()

  React.useEffect(() => {
    setOptions(options)
  }, [setOptions, options])
}
