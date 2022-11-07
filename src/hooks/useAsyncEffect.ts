import React from "react"

export const useAsyncEffect = (
  effect: () => Promise<void>,
  dependencyList: React.DependencyList
) => {
  React.useEffect(() => {
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyList)
}
