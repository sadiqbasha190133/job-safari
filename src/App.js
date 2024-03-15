// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import {BrowserRouter, Route, Routes} from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoute"
import LoginForm from "./components/LoginForm"
import Home from "./components/Home"
import Jobs from "./components/Jobs"
import JobCardDetails from "./components/JobCardDetails"
import NotFound from "./components/NotFound"

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/jobs" element={<Jobs/>}/>
          <Route exact path="/jobs/:id" element={<JobCardDetails/>}/>
        </Route>
        <Route exact path="/login" element={<LoginForm/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App