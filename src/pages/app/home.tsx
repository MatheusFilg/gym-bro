import { Helmet } from 'react-helmet-async'

export function Home() {
  return (
    <div>
      <Helmet title="Home" />
      <h1 className="text-primary-foreground dark:text-primary">
        Ola essa é a home
      </h1>
    </div>
  )
}
