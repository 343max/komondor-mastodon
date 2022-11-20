import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"
import { NoAccountView } from "./NoAccountView"

export const SafeClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <SafeCurrentClientProvider fallback={<NoAccountView />}>
      {children}
    </SafeCurrentClientProvider>
  )
}
