import Header from "./components/Header"
import AppRoutes from "./components/Routes"

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
      
        <main className="container mx-auto py-24">

          <AppRoutes />

        </main>
      </div>
    </>
  )
}

export default App
