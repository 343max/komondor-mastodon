import { StyleProp, View, ViewStyle } from "react-native"
import { Text } from "react-native-paper"
import { tw } from "../../lib/tw"
import { GestureMenuState } from "./GestureMenu"
import { Measurements, useMeasure } from "../../hooks/useMeasure"
import React from "react"
import { useLog } from "../../hooks/useLog"
import { useAsyncEffect } from "../../hooks/useAsyncEffect"
import { sleep } from "../../lib/sleep"

export type MenuItem = {
  label: string
  action: (() => void) | (() => Promise<void>)
}

type Props = {
  menuItems: MenuItem[]
  style?: StyleProp<ViewStyle>
  state: GestureMenuState | null
  dismiss: () => void
}

type ItemProps = {
  item: MenuItem
  highlighted: boolean
  updateMeasurements: (measurements: Measurements) => void
}

const MenuItemView: React.FC<ItemProps> = ({
  item,
  highlighted,
  updateMeasurements,
}) => {
  const [measureProps] = useMeasure<View>(updateMeasurements)

  return (
    <View
      style={[tw`p-5`, highlighted ? tw`bg-red-500` : tw`bg-black`]}
      {...measureProps}
    >
      <Text>{item.label}</Text>
    </View>
  )
}

export const MenuView: React.FC<Props> = ({
  menuItems,
  style,
  state,
  dismiss,
}) => {
  const [layouts, setLayouts] = React.useState<Record<number, Measurements>>({})

  const updateMeasurementsGenerator = React.useCallback(
    (index: number) => (measurements: Measurements) =>
      setLayouts((l) => ({ ...l, [index]: measurements })),
    [setLayouts]
  )

  const highlightedEntry = React.useMemo(() => {
    const [index, measurement] = Object.entries(layouts).find(
      ([index, measurements]) =>
        measurements.pageY < (state?.dy ?? 0) &&
        measurements.height + measurements.pageY > (state?.dy ?? 0)
    ) ?? [undefined, undefined]
    return index === undefined ? undefined : parseInt(index)
  }, [layouts, state])

  const [unhighlighted, setUnhighlighted] = React.useState(false)

  useAsyncEffect(async () => {
    if (state?.action === "up") {
      if (highlightedEntry === undefined) {
        dismiss()
      } else {
        for (const i in [1, 2, 3, 4, 5]) {
          setUnhighlighted((v) => !v)
          await sleep(0.1)
        }
        setUnhighlighted(false)
        await menuItems[highlightedEntry].action()
        dismiss()
      }
    }
  }, [state?.action])

  if (state === null) {
    return null
  } else
    return (
      <View
        style={[
          style,
          tw`bg-black border-solid border-2 border-gray-800 rounded absolute w-55 right-2 bottom-10`,
        ]}
      >
        {menuItems.map((item, index) => (
          <MenuItemView
            item={item}
            key={index}
            highlighted={index === highlightedEntry && !unhighlighted}
            updateMeasurements={updateMeasurementsGenerator(index)}
          />
        ))}
      </View>
    )
}
