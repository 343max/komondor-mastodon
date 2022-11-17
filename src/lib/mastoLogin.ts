import {
  HttpNativeImpl,
  InstanceRepository,
  MastoClient,
  MastoConfig,
  SerializerNativeImpl,
  WsNodejsImpl,
} from "masto"

export const mastoLogin = async (config: MastoConfig): Promise<MastoClient> => {
  const serializer = new SerializerNativeImpl()
  const http = new HttpNativeImpl(config, serializer)
  const instance = await new InstanceRepository(http, "1.0.0", config).fetch()
  const ws = new WsNodejsImpl(
    instance.urls.streamingApi,
    instance.version,
    config,
    serializer
  )

  return new MastoClient(http, ws, instance.version, config)
}
