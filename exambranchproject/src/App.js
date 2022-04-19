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
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {/* <>
            <NavBar value={'Home'} />
            <Button type="primary">henlo</Button>
            <Button type="ghost">henlo</Button>
            <Button type="dashed">henlo</Button>
            {/* <a href="./Supply.js">test</a> */}
          <>
            <br />
            <br />
            <LoginForm />
          </>
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
            <br />
            <br />
            <LoginForm />
          </>
        </Route>
        <Route>OOPs page not Found 404</Route>
      </Switch>
    </Router>
  )
}

export default App
