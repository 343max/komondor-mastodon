import { Text as PaperText } from "react-native-paper"

type Props = React.ComponentProps<typeof PaperText>

export const Text: React.FC<Props> = ({ style, children, ...props }) => {
  return (
    <PaperText style={style} {...props}>
      {children}
    </PaperText>
  )
}
