import React from "react"
import { View } from "react-native"

export type Measurements = {
  x: number
  y: number
  width: number
  height: number
  pageX: number
  pageY: number
}

export const useMeasure = <T extends View>(
  onLayout: (measurements: Measurements) => void
): {
  ref: React.RefObject<T>
  onLayout: () => void
} => {
  const ref = React.useRef<T>(null)

  return {
    ref,
    onLayout: () =>
      ref.current?.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => onLayout({ x, y, width, height, pageX, pageY })
      ),
  }
}
