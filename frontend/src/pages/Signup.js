import {useState} from'react'
import { useSignup } from '../hooks/useSignup'
import "./Signup.css"
//multistep-imports
import SignupInfo from '../components/subComponents/SignupInfo'
import PersonalInfo from '../components/subComponents/PersonalInfo'
import AdditionalInfo from '../components/subComponents/AdditionalInfo'

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
  city:"",
  region:""
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
      formData.region)
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

<div className="progressbar">
        <div
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
            >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
        {error && <div className='error'>{error}</div>}
      </div>
    </form>
)

}

export default Signup