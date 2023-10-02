import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'

import { Home } from '../importFilePages'

export enum PathNames {
  Home = '/',
}

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path={PathNames.Home}
          element={<Home />}
        ></Route>
      </Routes>
    </HashRouter>
  )
}

export default Router
