import './scss/app.scss'
import Router from './pages/Router/Router'


function App() {
  return (
    <div className="App">
      <Router />
    </div>
  )
}

const AppWithStore = () => {
  return <App />
}

export default AppWithStore
