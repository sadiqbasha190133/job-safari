
import "./index.css"

const Skills = (props)=>{
    const {details} = props
    const {name, imageUrl} = details
    return(
        <li className="skills-logo-title-flex">
            <img src={imageUrl} alt="skill-logo" className="skill-image"/>
            <h1 className="skills-title">{name}</h1>
        </li>
    )
}

export default Skills