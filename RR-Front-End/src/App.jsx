import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import "bootstrap-icons/font/bootstrap-icons.css"
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Outlet></Outlet>
    </>
  )
}

export default App
