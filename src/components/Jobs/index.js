
import Header from "../Header"
import { FiSearch } from "react-icons/fi";
import JobCard from "../JobCard";
import { useEffect, useState } from "react";
import "./index.css"
import Cookies from "js-cookie";
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Jobs = ()=>{

    const [profileDetails, setProfileDetails] = useState({})
    const[availableJobDetails, setJobDetails] = useState([])
    const [selectedPackageOption, setSelectedPackageOption] = useState("")
    const[selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([])
    const [searchOption, setSearchOption] = useState("")
    const[isProfileLoading, setProfileLoadingStatus] = useState(false)
    const[isJobsLoading, setJobsLoadingStatus] = useState(false)
    const [profileStatus, setProfileStatus] = useState(false)


    useEffect(()=>{
        fetchProfile()
    },[]);

    useEffect(()=>{  
        const fetchJobs = async ()=>{
            try{
                console.log("s i am in")
                setJobsLoadingStatus(prevLoadingStatus=>!prevLoadingStatus)
                const cookie = Cookies.get('jwt_token')
                const employmentOptions = selectedEmploymentTypes.join()
                console.log("employment options:",employmentOptions)
                console.log("selected package option:",selectedPackageOption)
                const url = `https://apis.ccbp.in/jobs?employment_type=${employmentOptions}&minimum_package=${selectedPackageOption}&search=${searchOption}`
                const options = {
                    method:'GET',
                    headers:{
                        Authorization: `Bearer ${cookie}`
                    }
                }
                const response = await fetch(url, options)
                const data = await response.json()
                console.log(data)
                if(response.ok){
                    const{jobs} = data
                    const frontendCaseJobDetails = jobs.map(eachJob=>({
                        companyLogoUrl:eachJob.company_logo_url,
                        employmentType:eachJob.employment_type,
                        id:eachJob.id,
                        jobDescription:eachJob.job_description,
                        location:eachJob.location,
                        packagePerAnnum:eachJob.package_per_annum,
                        rating:eachJob.rating,
                        title:eachJob.title
                    }))
                    setJobDetails(frontendCaseJobDetails)
                    setJobsLoadingStatus(prevLoadingStatus=>!prevLoadingStatus)
                }
            }
            catch(error){
                setJobsLoadingStatus(false)
            }
        }


        fetchJobs()
    }, [selectedEmploymentTypes, selectedPackageOption, searchOption])

    const fetchProfile = async()=>{
        try{
            setProfileLoadingStatus(prevLoadingStatus=>!prevLoadingStatus)
            const cookie = Cookies.get('jwt_token')
            const url = "https://apis.ccbp.in/profile"
            const options = {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${cookie}`
                }
            }
            const response = await fetch(url, options)
            const data = await response.json()
            const {profile_details} = data
            if(response.ok){
                const frontendCaseProfileData = {
                    name:profile_details.name,
                    profileImageUrl:profile_details.profile_image_url,
                    shortBio:profile_details.short_bio
                }
                setProfileDetails(frontendCaseProfileData)
                setProfileStatus(true)
                setProfileLoadingStatus(prevLoadingStatus=>!prevLoadingStatus)
            }
            
        }
        catch(error){   
            setProfileStatus(false)
            setProfileLoadingStatus(false)
        }
    }

    const updatePackageOption=(event)=>{
        console.log("I am here packageoption")
        setSelectedPackageOption(event.target.value)
    }

    const updateEmploymentTypes = (event)=>{
        if(event.target.checked){
            const newSelectedOption = event.target.value
            const currentSelectedOptions = selectedEmploymentTypes
            const updatedSelectedOptions = [...currentSelectedOptions, newSelectedOption]
            setSelectedEmploymentTypes(updatedSelectedOptions)
        }
        else{
            const removeElement = event.target.value
            const filteredOptions = selectedEmploymentTypes.filter(element=>removeElement!==element)
            setSelectedEmploymentTypes(filteredOptions)
        }
    }

    
    function renderCheckBoxOptions(){
        return(
            <form>
                <div className="checkbox-selection">
                    <input type="checkbox" id="checkBox1" className="checkbox" name="employement1" value="FULLTIME" onChange={updateEmploymentTypes}/>
                    <label htmlFor="checkBox1" className="checkbox-options">Full Time</label>
                </div>
                <div className="checkbox-selection">
                    <input type="checkbox" id="checkBox2" className="checkbox" name="employement2" value="PARTTIME" onChange={updateEmploymentTypes}/>
                    <label htmlFor="checkBox2" className="checkbox-options">Part Time</label>
                </div>
                <div className="checkbox-selection"> 
                    <input type="checkbox" id="checkBox3" className="checkbox" name="employement3" value="FREELANCE" onChange={updateEmploymentTypes}/>
                    <label htmlFor="checkBox3" className="checkbox-options">Freelance</label>
                </div>
                <div className="checkbox-selection">
                    <input type="checkbox" id="checkBox4" className="checkbox" name="employement4" value="INTERNSHIP" onChange={updateEmploymentTypes}/>
                    <label htmlFor="checkBox4" className="checkbox-options">Internship</label>
                </div>
            </form>
        )
        
    }

    function renderRadioOptions(){
        return(
            <form>
                <div className="checkbox-selection">
                    <input type="radio" id="radio1" className="checkbox" name="salary" value="1000000" onChange={updatePackageOption}/>
                    <label htmlFor="radio1" className="checkbox-options">10LPA & more</label>
                </div>
                <div className="checkbox-selection">
                    <input type="radio" id="radio2" className="checkbox" name="salary" value="2000000" onChange={updatePackageOption}/>
                    <label htmlFor="radio2" className="checkbox-options">20LPA & more</label>
                </div>
                <div className="checkbox-selection">
                    <input type="radio" id="radio3" className="checkbox" name="salary" value="3000000" onChange={updatePackageOption}/>
                    <label htmlFor="radio3" className="checkbox-options">30LPA & more</label>
                </div>
                <div className="checkbox-selection">
                    <input type="radio" id="radio4" className="checkbox" name="salary" value="4000000" onChange={updatePackageOption}/>
                    <label htmlFor="radio4" className="checkbox-options">40LPA and more</label>
                </div>
            </form>
        )
    }

    function renderProfile(){
        if(profileStatus){
            return(
                <div className="profile-container">
                    <img src={profileDetails.profileImageUrl} alt="profile" className="profile-image"/>
                    <h1 className="profile-title">{profileDetails.name}</h1>
                    <p className="profile-description">{profileDetails.shortBio}</p>
                </div>
            )
        }
        else{
            return(
                <div className="retry-button-container">
                    <button className="retry-button" onClick={fetchProfile}>Retry</button>
                </div>
            ) 
        }
        
    }

    let searchInput = ""

    const updateSearchInput=(event)=>{
        searchInput = event.target.value
    }

    const updateSearchOption=()=>{
        setSearchOption(searchInput)
    }

    return(
        <>
        <Header/>
            <div className="jobs-main-container">
                <div className="profile-sortings-container-large">
                    <div className="search-container-small">
                        <input type="search" className="search-box-small" placeholder="search" onChange={updateSearchInput}/>
                        <div className="icon-container"><FiSearch  className="search-icon" onClick={updateSearchOption} /></div>
                    </div>
                    {isProfileLoading?<Loader type="ThreeDots" color="#00BFFF" height={50} width={50} className="spinner"/>:renderProfile()}
                    <p className="hr-line"></p>
                    <h1 className="typeof-employment-title">Type of employment</h1>
                    {renderCheckBoxOptions()}
                    <p className="hr-line"></p>
                    <h1 className="typeof-employment-title">Salary Range</h1>
                    {renderRadioOptions()}
                </div>

                <div>
                    <div className="search-container-large">
                        <input type="search" className="search-box-large" placeholder="search" onChange={updateSearchInput}/>
                        <div className="icon-container"><FiSearch  className="search-icon" onClick={updateSearchOption} /></div>
                    </div>
                    <ul className="job-cards-container">
                        {isJobsLoading?<Loader type="ThreeDots" color="#00BFFF" height={50} width={50} className="jobs-loading-spinner"/>:
                            availableJobDetails.length !==0?
                             availableJobDetails.map(eachJobDetails=>(
                                <JobCard key={eachJobDetails.id} details={eachJobDetails}/>
                            )):
                            <div>
                                <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="no-jobs" className="no-jobs-image"/>
                                <p className="no-jobs-text">We couldn`t find any jobs related to your search</p>
                            </div>
                        }
                    </ul>
                </div>
                

            </div>
        </>
    )

}
export default Jobs
