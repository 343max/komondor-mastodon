import AsyncStorage from "@react-native-async-storage/async-storage"
const CurrentAccountKey = "CurrentAccount"

export const getCurrentAccount = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(CurrentAccountKey)
}

export const setCurrentAccount = async (accountId: string): Promise<void> => {
  await AsyncStorage.setItem(CurrentAccountKey, accountId)
}
