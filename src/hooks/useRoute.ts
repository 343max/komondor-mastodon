import {
  RouteProp,
  useRoute as useRouteOriginal,
} from "@react-navigation/native"
import { RootStackParamList } from "../../types"

export const useRoute = <RouteName extends keyof RootStackParamList>() =>
  useRouteOriginal<RouteProp<RootStackParamList, RouteName>>()
