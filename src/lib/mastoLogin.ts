import {
  HttpNativeImpl,
  InstanceRepository,
  MastoClient,
  MastoConfig,
  SerializerNativeImpl,
  WsNodejsImpl,
  Response,
  Request,
} from "masto"

class Http extends HttpNativeImpl {
  async request<T>(request: Request): Promise<Response<T>> {
    // requests can include https://domains.tld which confuses the fetch method
    // therefore we remove that part
    const url = request.url.replace(/^https?:\/\/[^\/]+/, "")

    // TODO: update to masto 4.6.5
    // masto Paginator has an error where params are sent via data
    // this works around this issue for now
    const newRequest =
      request.method === "get" && typeof request.data === "object"
        ? {
            ...request,
            params: request.data,
            data: undefined,
            url,
          }
        : { ...request, url }

    const response = await super.request<T>(newRequest)
    return {
      ...response,
      headers: { ...response.headers, link: response.headers.Link },
    }
  }
}

export const mastoLogin = async (config: MastoConfig): Promise<MastoClient> => {
  const serializer = new SerializerNativeImpl()
  const http = new Http(config, serializer)
  const instance = await new InstanceRepository(http, "1.0.0", config).fetch()
  const ws = new WsNodejsImpl(
    instance.urls.streamingApi,
    instance.version,
    config,
    serializer
  )

  return new MastoClient(http, ws, instance.version, config)
}
