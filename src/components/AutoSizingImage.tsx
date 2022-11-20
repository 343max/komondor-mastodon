import React from "react"
import { Image, ImageStyle, StyleProp } from "react-native"

type Size = { width: number; height: number }

type Props = React.ComponentProps<typeof Image> & {
  resizeDirection: "vertical" | "horizontal"
  imageSize?: Size
}

export const AutoSizingImage: React.FC<Props> = ({
  resizeDirection,
  style,
  imageSize: providedImageSize,
  ...props
}) => {
  const [fixedProp, flexibleProp] =
    resizeDirection === "vertical"
      ? (["width", "height"] as const)
      : (["height", "width"] as const)

  const [imageSize, setImageSize] = React.useState<Size | undefined>(
    providedImageSize
  )
  const [viewSize, setViewSize] = React.useState<Size | undefined>()

  const resizeStyle = React.useMemo<Partial<Size>>(() => {
    if (!imageSize || !viewSize) {
      return {}
    } else {
      return {
        [flexibleProp]:
          (viewSize[fixedProp] / imageSize[fixedProp]) *
          imageSize[flexibleProp],
      }
    }
  }, [imageSize, viewSize])

  console.log([imageSize, viewSize, resizeStyle])

  return (
    <Image
      {...props}
      style={[style, resizeStyle]}
      onLoad={({ nativeEvent }) => {
        setImageSize({
          width: nativeEvent.source.width,
          height: nativeEvent.source.height,
        })
      }}
      onLayout={({ nativeEvent }) => {
        setViewSize({
          width: nativeEvent.layout.width,
          height: nativeEvent.layout.height,
        })
      }}
    />
  )
}
