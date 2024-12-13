import Header from "./components/Header"
import AppRoutes from "./components/Routes"
import { AuthProvider } from "./contexts/AuthProvider"

function App() {
  return (
    <>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="container mx-auto py-24">

            <AppRoutes />

          </main>
        </div>
      </AuthProvider>
    </>
  )
}

export default App
