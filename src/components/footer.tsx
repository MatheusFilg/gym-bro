import { Github, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <div className="flex h-[82vh] flex-col justify-end">
      <p className="text-lg font-medium leading-relaxed">
        Feito por <span className="underline">Matheus F.</span>
      </p>
      <div className="flex flex-row space-x-3">
        <a
          href="https://www.linkedin.com/in/matheus-filgueiras-419700248/"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin />
        </a>
        <a
          href="https://github.com/MatheusFilg/"
          target="_blank"
          rel="noreferrer"
        >
          <Github className="h-6 w-6" />
        </a>
      </div>
    </div>
  )
}
