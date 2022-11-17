import {
  BaseHttp,
  Http,
  Headers,
  MastoConfig,
  Serializer,
  MastoError,
  MimeType,
  createError,
  CreateErrorParams,
  Request,
  Response,
} from "masto"
import { headerCase } from "change-case"

// this has to exists till https://github.com/neet/masto.js/pull/682 is merged / released
export class HttpWorkaroundImpl extends BaseHttp implements Http {
  constructor(readonly config: MastoConfig, readonly serializer: Serializer) {
    super()
  }

  async request<T>(request: Request): Promise<Response<T>> {
    const { timeout, proxy } = this.config
    const { method, data, params } = request

    if (proxy != undefined) {
      // eslint-disable-next-line no-console
      console.warn("Proxies are not supported on HttpNativeImpl")
    }

    if (timeout != undefined) {
      // eslint-disable-next-line no-console
      console.warn("Timeouts are not supported on HttpNativeImpl")
    }

    const url = this.resolveUrl(request.url, params)
    const headers = new Headers(
      this.createHeader(request.headers) as unknown as Record<string, string>
    )
    const reqContentType = headers.get("Content-Type") ?? "application/json"
    const body = this.serializer.serialize(reqContentType as MimeType, data)

    if (
      body instanceof FormData &&
      reqContentType === "multipart/form-data" &&
      HttpWorkaroundImpl.hasBlob(body)
    ) {
      // As multipart form data should contain an arbitrary boundary,
      // leave Content-Type header undefined, so that fetch() API
      // automatically configure Content-Type with an appropriate boundary.
      headers.delete("Content-Type")
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: body as string,
      })

      console.log(response)

      console.log(response.headers)

      if (!response.ok) {
        throw response
      }

      const text = await response.text()
      const resContentType = this.getContentType(
        HttpWorkaroundImpl.toHeaders(response.headers)
      )

      if (resContentType == undefined) {
        throw new MastoError("Content-Type is not defined")
      }

      return {
        headers: HttpWorkaroundImpl.toHeaders(response.headers),
        data: this.serializer.deserialize("application/json", text),
      }
    } catch (error) {
      if (!(error instanceof Response)) {
        throw error
      }

      const data = await error.json()

      throw createError({
        statusCode: error.status,
        message: data?.error,
        details: data?.errorDescription,
        description: data?.details,
        limit: error.headers.get("X-RateLimit-Limit"),
        remaining: error.headers.get("X-RateLimit-Remaining"),
        reset: error.headers.get("X-RateLimit-Reset"),
      } as CreateErrorParams)
    }
  }

  private static toHeaders(headers: globalThis.Headers): Headers {
    console.log({ headers })
    const result: Record<string, string> = {}
    headers.forEach((value: string, key: string) => {
      result[headerCase(key)] = value
    })

    return result as Headers
  }

  private static hasBlob(formData: FormData): boolean {
    let hasBlob = false
    // eslint-disable-next-line unicorn/no-array-for-each
    formData.forEach((v: string | Blob) => (hasBlob ||= v instanceof Blob))
    return hasBlob
  }
}
