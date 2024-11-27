import Header from "./components/Header"
import AppRoutes from "./components/Routes"

function App() {
  return (
    <>
      <Header />
      
      <main className="grow prose container mx-auto py-8">

        <AppRoutes />

      </main>
    
    </>
  )
}

export default App
