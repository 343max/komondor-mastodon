import { openBrowserAsync } from "expo-web-browser"

export const useStatusLinkHandler = () => {
  return async (attributes: Record<string, string>) => {
    const url = attributes["href"]!
    await openBrowserAsync(url, { dismissButtonStyle: "close" })
  }
}
