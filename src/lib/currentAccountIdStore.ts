import AsyncStorage from "@react-native-async-storage/async-storage"
const CurrentAccountKey = "CurrentAccount"

export const getCurrentAccountId = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(CurrentAccountKey)
}

export const setCurrentAccountId = async (accountId: string): Promise<void> => {
  await AsyncStorage.setItem(CurrentAccountKey, accountId)
}

export const removeCurrentAccountId = async (): Promise<void> => {
  await AsyncStorage.removeItem(CurrentAccountKey)
}
