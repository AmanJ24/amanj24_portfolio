import { person } from '../../data/content'

export default function Footer() {
  return (
    <footer
      data-section="footer"
      className="border-t border-border py-8"
      id="footer"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-xs text-muted">
          © 2025 {person.name}
        </span>
        <span className="font-mono text-xs text-muted">
          Built with React · Vite · Deployed on Vercel
        </span>
      </div>
    </footer>
  )
}
