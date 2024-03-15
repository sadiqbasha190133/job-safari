
import { useEffect, useState } from "react";
import Header from "../Header"
import Skills from "../Skills";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { PiSuitcaseSimpleFill } from "react-icons/pi";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useParams, Link } from "react-router-dom"
import Cookies from "js-cookie";
import "./index.css"
import JobCard from "../JobCard";



const JobCardDetails = () =>{
    const {id} = useParams()
    const [jobCardDetails, setJobCardDetails] = useState({})
    const [skillsDetails, setSkillsDetails] = useState([])
    const [similarJobsDetails, setSimilarJobDetails] = useState([])

    useEffect(()=>{
        const fetchJobDetails = async() =>{ 
            const cookie = Cookies.get('jwt_token')
            const url = `https://apis.ccbp.in/jobs/${id}`
            const options = {
                method:'GET',
                headers:{
                    Authorization:`Bearers ${cookie}`
                }
            }
            const response = await fetch(url, options)  
            const data = await response.json()
            console.log(data)

            const {job_details, similar_jobs} = data
            const {life_at_company, skills} = job_details
            const formattedJobDetails = {
                companyLogoUrl:job_details.company_logo_url,
                companyWebsiteUrl:job_details.company_website_url,
                employmentType:job_details.employment_type,
                id:job_details.id,
                jobDescription:job_details.job_description,
                location:job_details.location,
                packagePerAnnum:job_details.package_per_annum,
                rating:job_details.rating,
                title:job_details.title,
                lifeAtCompanyDescription:life_at_company.description,
                lifeAtCompanyImageUrl:life_at_company.image_url
            }
            setJobCardDetails(formattedJobDetails)

            const formattedSkillsDetails = skills.map(eachSkill=>({
                name:eachSkill.name,
                imageUrl:eachSkill.image_url
            }))
            setSkillsDetails(formattedSkillsDetails)
            

            const formattedSimilarJobsDetails = similar_jobs.map(eachJob=>({
                companyLogoUrl:eachJob.company_logo_url,
                employmentType:eachJob.employment_type,
                id:eachJob.id,
                jobDescription:eachJob.job_description,
                location:eachJob.location,
                rating:eachJob.rating,
                title:eachJob.title
            }))
            setSimilarJobDetails(formattedSimilarJobsDetails)

        }
        fetchJobDetails()
    }, [id])



    return(
        <div className="jobDetails-background">
            <Header/>
            <div className="jobDetails-padding">
                <div className="jobDetails-main-container">
                    <div className="jobDetails-logo-flex">
                        <img src={jobCardDetails.companyLogoUrl} alt="compant-logo" className="company-logo"/>
                        <div>
                            <h1 className="jobDetails-role-title">{jobCardDetails.title}</h1>
                            <div className="jobDetails-rating-flex">
                                <FaStar className="jobDetails-rating-star-icon"/>
                                <p className="jobDetails-rating">{jobCardDetails.rating}</p>
                            </div>
                        </div>
                    </div>
                    <div className="jobDetails-locationEmployment-salary-flex">
                        <div className="jobDetails-location-employment-flex">
                            <div className="jobDetails-rating-flex">
                                <FaLocationDot className="jobDetails-location-icon"/>
                                <p className="jobDetails-location-employment-title">{jobCardDetails.location}</p>
                            </div>
                            <div className="jobDetails-rating-flex">
                                <PiSuitcaseSimpleFill  className="jobDetails-employmentType-icon"/>    
                                <p className="jobDetails-location-employment-title">{jobCardDetails.employmentType}</p>
                            </div>
                        </div>
                        <h1 className="jobDetails-package-per-annum-title">{jobCardDetails.packagePerAnnum}</h1>
                    </div>
                    <p className="jobDetails-card-hr-line"></p>
                    <div className="jobDetails-descr-visit-flex"> 
                        <h1 className="jd-descr-heading">Description</h1>
                        <Link to={jobCardDetails.companyWebsiteUrl} style={{textDecoration:"none"}} target="_blank" rel="noopener noreferrer">
                            <div className="visit-icon-flex">
                                <h1 className="visit-text">visit</h1>
                                <FaArrowUpRightFromSquare  className="visit-icon"/>
                            </div>
                        </Link>
                    </div>
                    <h1 className="jobDetails-description-title">{jobCardDetails.jobDescription}</h1>
                    <h1 className="skills-text">Skills</h1>
                    <ul className="skills-container">
                        {skillsDetails.map(eachSkill=>(
                            <Skills key={eachSkill.name} details={eachSkill}/>
                        ))}
                    </ul>
                    <div className="life-at-company-flex-large">
                        <h1 className="life-at-company-title">Life at company</h1>
                        <div className="life-at-company-flex-small">
                            <p className="life-at-description">{jobCardDetails.lifeAtCompanyDescription}</p>
                            <img src={jobCardDetails.lifeAtCompanyImageUrl} alt="company-life" className="life-at-com-image"/>
                        </div>
                        
                    </div>
                </div>
                <div className="similar-jobs-container-small">
                    <h1 className="simialar-jobs-title">Similar Jobs</h1>
                    <ul className="similar-jobs-container">
                        {similarJobsDetails.map(eachJob=>(
                            <JobCard key={eachJob.id} details={eachJob}/>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default JobCardDetails