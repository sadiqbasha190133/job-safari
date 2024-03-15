
import Header from "../Header"
import "./index.css"
import { Link } from "react-router-dom"
function Home(){
    return(
        <div className="home-main-container">
            <Header/>
                <div className="home-container">
                    <h1 className="title">Find Your Jobs That Fits Your Life</h1>
                    <p className="description">
                        Millions of the people are searching for jobs, salary information, company reviews. 
                        Find the job that fits your abilities and potentials
                    </p>
                    <Link to="/jobs">
                        <button className="find-jobs-button">Find Jobs</button>
                    </Link>
                </div>
        </div>
        
    )
}

export default Home