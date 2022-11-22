import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"
import { NoAccountView } from "./NoAccountView"
import { LoadingView } from "./LoadingView"

export const SafeClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <SafeCurrentClientProvider
      noAccount={<NoAccountView />}
      notLoaded={<LoadingView />}
    >
      {children}
    </SafeCurrentClientProvider>
  )
}
