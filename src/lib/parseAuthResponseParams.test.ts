import { parseAuthResponseParams } from "./parseAuthResponseParams"

describe("parseAuthResponseParams", () => {
  test("dismiss response", () => {
    const params = {
      error: "access_denied",
      error_description:
        "The resource owner or authorization server denied the request.",
      state: "1UIA8Qb5OF",
    }
    const response = parseAuthResponseParams(params, "xyz://fail")
    expect(response).toEqual({ type: "dismiss" })
  })

  test("success response", () => {
    const params = {
      code: "yi1EW-grwjakNmCLYu8sbL1RHX2yz-XglhpPTDu2abM",
      state: "U3tAFdzQtg",
    }
    const response = parseAuthResponseParams(params, "xyz://sucess")
    expect(response).toEqual({
      authentication: null,
      errorCode: null,
      type: "success",
      params: {
        code: "yi1EW-grwjakNmCLYu8sbL1RHX2yz-XglhpPTDu2abM",
        state: "U3tAFdzQtg",
      },
      url: "xyz://sucess",
    })
  })
})

// {"authentication": null, "error": null, "errorCode": null, "params": {"code": "yi1EW-grwjakNmCLYu8sbL1RHX2yz-XglhpPTDu2abM", "state": "U3tAFdzQtg"}, "type": "success", "url": "exp://192.168.178.147:19000?code=yi1EW-grwjakNmCLYu8sbL1RHX2yz-XglhpPTDu2abM&state=U3tAFdzQtg"}}
