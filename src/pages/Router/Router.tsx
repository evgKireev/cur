import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from '../importFilePages'

export enum PathNames {
  Home = '/',
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PathNames.Home}
          element={<Home />}
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
