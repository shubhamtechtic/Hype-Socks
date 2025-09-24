import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-primary">HYPE</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Custom athletic socks engineered for comfort, durability, and style
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Scroll down to see the footer component with FAB
            </p>
            <div className="h-96 bg-white/50 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Main content area</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
