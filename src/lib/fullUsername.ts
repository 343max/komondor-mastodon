export const fullUserName = ({
  username,
  domain,
}: {
  username: string
  domain: string
}) => `@${username}@${domain}`
