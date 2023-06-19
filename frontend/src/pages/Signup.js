import {useState} from'react'
import { useSignup } from '../hooks/useSignup'
import "./Signup.css"
//multistep-imports
import SignupInfo from '../components/subComponents/SignupInfo'
import PersonalInfo from '../components/subComponents/PersonalInfo'
import AdditionalInfo from '../components/subComponents/AdditionalInfo'
import { Link } from 'react-router-dom';
const Signup=()=>{
// const[email,setEmail]=useState('')
// const[password,setPassword]=useState('')
const{signup,error,isLoading}=useSignup()

//multistep form

const [page, setPage] = useState(0);
const [formData, setFormData] = useState({
  username:"",
  email:"",
  password:"",
  confirmPassword:"",
  first_name:"",
  last_name:"",
  age:0,
  job:"",
  phone_number:0,
  city: "",
  region: ""
  
});

const FormTitles = ["Sign Up ", "Personal Info", "Additional Info"];

const PageDisplay = () => {
  if (page === 0) {
    return <SignupInfo formData={formData} setFormData={setFormData} />;
  } else if (page === 1) {
    return <PersonalInfo formData={formData} setFormData={setFormData} />;
  } else {
    return <AdditionalInfo formData={formData} setFormData={setFormData} />;
  }
};


/////DATA SENDING TO BE REGISTERED

const handleSubmit=async(e)=>{
  e.preventDefault();
    // Check if age is within valid range
    if (formData.age < 18 || formData.age > 90) {
      alert("Age must be between 18 and 90.");
      return;
    }

    
  // Check if password and confirm password match
  if (  formData.password !==  formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }
    console.log(formData.email,formData.password)
    await signup(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.first_name,
      formData.last_name,
      formData.age,
      formData.job,
      formData.phone_number,
      formData.city,
      formData.region
  )
  alert(error)
}

return(
  <form className='signup' onSubmit={handleSubmit}>
          {/* <h3>SignUp</h3>
          <label htmlFor='email'>Email:</label>
          <input 
          type='email'
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          id='email'
          />
          <label htmlFor='pwd'>Password:</label>
          <input 
          type='password'
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          id='pwd'
          />
          <button disabled={isLoading}>Signup</button>
          {error && <div className='error'>{error}</div>} */}

<div className="progressbar ">
        <div className='bg-lime-500'
          style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
          type='button'
            disabled={page === 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
          }}
          className='bg-lime-500'
          >
            Prev
          </button>
          <button
          type='button'
          disabled={isLoading}
        //   type={page=== FormTitles.length -1 ? 'submit':'button'}
          onClick={(e) => {
            console.log(page)
              if (page === FormTitles.length-1) {
                  e.currentTarget.setAttribute('type','submit')
                  console.log(formData);
                } else {
                    setPage((currPage) => currPage+1);
                }
            }}
        className='bg-lime-500'    
        >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
        {error && <div className='error'>{error}</div>}
    </div>
    <p className='mt-4'>
        Already have an account? <Link to="/login"className='text-lg font-semibold text-fuchsia-800'>Sign in</Link>
      </p>
    </form>
)

}

export default Signup