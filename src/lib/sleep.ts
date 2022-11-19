export const sleep = async (timeoutSeconds: number): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, timeoutSeconds * 1000))
