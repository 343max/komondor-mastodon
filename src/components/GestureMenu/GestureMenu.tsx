import React from "react"
import { PanResponder, StyleProp, View, ViewStyle } from "react-native"
import { MenuButtonView } from "./MenuButtonView"
import { MenuItem, MenuView } from "./MenuView"

type Props = {
  style?: StyleProp<ViewStyle>
  setScrollingEnabled?: (enabled: boolean) => void
}

export type GestureMenuState = {
  action: "down" | "move" | "up"
  dy: number
}

export const GestureMenu: React.FC<Props> = ({
  style,
  setScrollingEnabled = () => {},
}) => {
  const [state, setState] = React.useState<GestureMenuState | null>(null)
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (evt, gestureState) =>
        setState({ action: "down", dy: gestureState.y0 + gestureState.dy }),
      onPanResponderMove: (evt, gestureState) =>
        setState({ action: "move", dy: gestureState.y0 + gestureState.dy }),
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (evt, gestureState) =>
        setState({
          action: "up",
          dy: gestureState.y0 + gestureState.dy,
        }),
      onPanResponderTerminate: (evt, gestureState) =>
        setState({
          action: "up",
          dy: gestureState.y0 + gestureState.dy,
        }),
      onShouldBlockNativeResponder: () => true,
    })
  ).current

  React.useEffect(() => {
    setScrollingEnabled(state?.action !== "down" && state?.action !== "move")
  }, [state?.action])

  const dismiss = React.useCallback(() => setState(null), [setState])

  const menuItems = React.useMemo<MenuItem[]>(
    () => [
      { label: "Say hello", action: () => console.log("Hello!") },
      { label: "Say good bye", action: () => console.log("Good bye!") },
      { label: "Say something", action: () => console.log("Something!") },
    ],
    []
  )

  return (
    <View style={style} {...panResponder.panHandlers}>
      <MenuButtonView size={8} />
      <MenuView menuItems={menuItems} state={state} dismiss={dismiss} />
    </View>
  )
}
