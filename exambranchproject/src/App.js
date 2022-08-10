// import 'antd/dist/antd.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from "react-router-dom"
import Supply from "./Supply"
import Reval from "./Reval"
import LoginForm from "./Components/LoginForm"
import NavBar from "./Components/NavBar"
import { useState } from "react"
import Download from "./Download"
import Update from "./Update"
import water from "./Components/clgLogo.png"
import Cbt from "./Cbt"

const App = () => {
  const [token, settoken] = useState(false)
  if (!token) {
    return (
      <>
        <br />
        <br />
        <LoginForm settoken={settoken} />
      </>
    )
  }
  return (
    <div
      style={{
        backgroundImage: `url(${water})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        "-webkit-print-color-adjust": "exact",
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="Navbar">
              <NavBar value={"Supply"} />
              <style>{`@media print{.Navbar{display:none;}}`}</style>
            </div>
            <Supply />
          </Route>
          <Route exact path="/Supply">
            <div className="Navbar">
              <NavBar value={"supply"} />
              <style>{`@media print{.Navbar{display:none;}}`}</style>
            </div>
            <Supply />
          </Route>
          <Route exact path="/Reval">
            <div className="Navbar">
              <NavBar value={"reval"} />
              <style>{`@media print{.Navbar{display:none;}}`}</style>
            </div>
            <Reval />
          </Route>
          <Route exact path="/Update">
            <>
              <div className="Navbar">
                <NavBar value={"update"} />
                <style>{`@media print{.Navbar{display:none;}}`}</style>
              </div>
              <Update />
            </>
          </Route>
          <Route exact path="/Download">
            <>
              <div className="Navbar">
                <NavBar value={"Download"} />
                <style>{`@media print{.Navbar{display:none;}}`}</style>
              </div>
              <Download />
            </>
          </Route>
          <Route exact path="/Cbt">
            <>
              <div className="Navbar">
                <NavBar value={"cbt"} />
                <style>{`@media print{.Navbar{display:none;}}`}</style>
              </div>
              <Cbt />
            </>
          </Route>
          <Route>OOPs page not Found 404</Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
