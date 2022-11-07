import { useClients } from "../hooks/useClients"
import { useAsyncEffect } from "../hooks/useAsyncEffect"
import { useStoredMeta } from "../hooks/useStoredMeta"

export const AccountMetaUpdater: React.FC = () => {
  const { latestClient } = useClients()
  const { updateAccountMeta } = useStoredMeta()

  useAsyncEffect(async () => {
    if (latestClient) {
      const account = await latestClient.client.accounts.verifyCredentials()
      updateAccountMeta({
        appId: latestClient.accountId,
        username: account.username,
        displayName: account.displayName,
        avatar: account.avatar,
        avatarStatic: account.avatarStatic,
      })
    }
  }, [latestClient])

  return <></>
}
