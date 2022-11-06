import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store"
import { getRandomBytes } from "expo-random"

export type StoredAccount = {
  appId: string
  domain: string
  token: string
  state: string
}

const AccountsKeychainKey = "Accounts"

export const AccountTokenStore = {
  setAccounts: async (accounts: StoredAccount[]): Promise<void> => {
    const json = JSON.stringify(accounts)
    await setItemAsync(AccountsKeychainKey, json)
  },

  deleteAccounts: async (): Promise<void> => {
    await deleteItemAsync(AccountsKeychainKey)
  },

  getAccounts: async (): Promise<StoredAccount[]> => {
    return JSON.parse((await getItemAsync(AccountsKeychainKey)) ?? "[]")
  },
}

const generateId = (): string =>
  [...getRandomBytes(4)]
    .map((b): string => b.toString(16).padStart(2, "0"))
    .join("")

export const storeableAccount = (
  options: Omit<StoredAccount, "id">
): StoredAccount => ({ ...options, appId: generateId() })
