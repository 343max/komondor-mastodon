import { AuthSessionResult } from "expo-auth-session"
import { QueryParams } from "expo-linking"

export const parseAuthResponseParams = (
  params: QueryParams,
  url: string
): AuthSessionResult | null => {
  if (
    typeof params["code"] === "string" &&
    typeof params["state"] === "string"
  ) {
    return {
      type: "success",
      params: { code: params["code"], state: params["state"] },
      url,
      errorCode: null,
      authentication: null,
    }
  } else {
    return { type: "dismiss" }
  }
}
