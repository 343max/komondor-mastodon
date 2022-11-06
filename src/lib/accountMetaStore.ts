import AsyncStorage from "@react-native-async-storage/async-storage"

const AccountsMetaKey = "AccountsMeta"

export type AccountMeta = {
  appId: string
  username: string
  displayName: string
  avatar: string
  avatarStatic: string
}

export const AccountMetaStore = {
  setAccounts: async (accounts: AccountMeta[]): Promise<void> => {
    const json = JSON.stringify(accounts)
    await AsyncStorage.setItem(AccountsMetaKey, json)
  },

  deleteAccounts: async (): Promise<void> => {
    await AsyncStorage.removeItem(AccountsMetaKey)
  },

  getAccounts: async (): Promise<AccountMeta[]> => {
    return JSON.parse((await AsyncStorage.getItem(AccountsMetaKey)) ?? "[]")
  },
}
