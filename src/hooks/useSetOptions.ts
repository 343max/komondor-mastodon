import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"

export const useSetOptions = (): ((
  options: BottomTabNavigationOptions
) => void) => {
  return useNavigation().setOptions
}
