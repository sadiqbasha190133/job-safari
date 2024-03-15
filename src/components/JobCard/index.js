
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import {Link} from "react-router-dom"
import "./index.css"

const JobCard = (props)=>{
    const{details} = props
    const{id, companyLogoUrl, employmentType, jobDescription, location, packagePerAnnum, rating, title} = details
    return(
        <Link to={`/jobs/${id}`} className="job-card-link-element">
            <li className="jobsCard-main-container">
                <div className="logo-flex">
                    <img src={companyLogoUrl} alt="compant-logo" className="company-logo"/>
                    <div>
                        <h1 className="job-role-title">{title}</h1>
                        <div className="rating-flex">
                            <FaStar className="rating-star-icon"/>
                            <p className="rating">{rating}</p>
                        </div>
                    </div>
                </div>
                <div className="locationEmployment-salary-flex">
                    <div className="location-employment-flex">
                        <div className="rating-flex">
                            <FaLocationDot className="location-icon"/>
                            <p className="location-employment-title">{location}</p>
                        </div>
                        <div className="rating-flex">
                            <PiSuitcaseSimpleFill  className="employmentType-icon"/>    
                            <p className="location-employment-title">{employmentType}</p>
                        </div>
                    </div>
                    <h1 className="package-per-annum-title">{packagePerAnnum}</h1>
                </div>
                <p className="job-card-hr-line"></p>
                <h1 className="description-title">{jobDescription}</h1>
                <p></p>
            </li>
        </Link>
    )
}
export default JobCard