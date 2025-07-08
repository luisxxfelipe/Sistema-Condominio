import { BrowserRouter as Router } from "react-router-dom"
import Rotas from "./routes/Routes"
import { PermissionProvider } from "./hooks/usePermissions"

function App() {
  return (
    <Router>
      <PermissionProvider>
        <Rotas />
      </PermissionProvider>
    </Router>
  )
}

export default App
