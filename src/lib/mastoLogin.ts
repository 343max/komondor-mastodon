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
  // TODO: update to masto 4.6.5
  // masto Paginator has an error where params are sent via data
  // this works around this issue for now
  async request<T>(request: Request): Promise<Response<T>> {
    console.log([request, typeof request.data])

    if (request.method === "get" && typeof request.data === "object") {
      return super.request({
        ...request,
        params: request.data,
        data: undefined,
      })
    } else {
      return super.request(request)
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
