import React from "react"

export const useLog = (deps: React.DependencyList) =>
  React.useEffect(() => console.log(...deps), deps)
