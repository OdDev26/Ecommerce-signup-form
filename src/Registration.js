import React from "react"
// import {useState} from 'react'
// import axios from 'axios'

import {useFormik} from 'formik'
import * as yup from 'yup'

const validationSchema= yup.object({
    firstName:yup.string().required('Required'),
    lastName:yup.string().required('Required'),
    email:yup.string().email("Email must be valid").required("Required"),
    password:yup.string().min(6).required('Required'),
    confirmPassword: yup.string().test(
        "passwords-match",
        "Passwords must match",
        function (value) {
          return this.parent.password === value;
        }
  ).required('Required'),
    dateOfBirth:yup.string().required('Required'),
    gender: yup.string().required('Required'),
  
})


function Registration(){

const formik=useFormik({
    initialValues:{
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    dateOfBirth:"",
    gender:"",
    wantNewsLetters:false
   

},
onSubmit: values=>{
    console.log("Form value", values)
    fetch('http://localhost:8080/swagger-ui/#/jwt-authentication-controller/registerUserUsingPOST',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(values)
    })

    
},

validationSchema




})    


// console.log("Form value", formik.values)

// const [form, setForm] = useState({
//     firstName:"",
//     lastName:"",
//     email:"",
//     password:"",
//     confirmPassword:"",
//     dateOfBirth:"",
//     gender:"",
//     wantNewsLetters: false
// }
// )
// const changeHandler= (e) =>{
//    const{name,value, type,checked} =e.target
//     setForm((state)=>({
//         ...state,
//         [name]:type==='checkbox' ? checked: value
//     })
//     )}

   

// const submitHandler=  (e) =>{
//     e.preventDefault()
    // console.log(form)
    // axios.post("http://localhost:8080/swagger-ui/#/jwt-authentication-controller/registerUserUsingPOST",form)
    // .then(response=>{ console.log(response)})




const current = new Date().toISOString().split("T")[0]




return ( 
  
   <div className='App'>
    <h1 >CREATE ACCOUNT</h1>
    <br />
    <form className='form' onSubmit={formik.handleSubmit}>
        <div className='form-control'>
        <label>
          First name
        <input  name='firstName'  value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur}   type='text'/>
        {formik.touched.firstName && formik.errors.firstName ? <div className= 'error'>{formik.errors.firstName}</div> :  null}
      
        </label>
        
        </div>
        <br />
        <div className='form-control'>
        <label>
          Last name
        <input label='Last Name'   name='lastName' value={formik.values.lastName} onChange={formik.handleChange}   onBlur={formik.handleBlur}  type='text'/>
        {formik.touched.lastName && formik.errors.lastName ? <div className= 'error'>{formik.errors.lastName}</div> :  null}
        </label>
        </div>
        <br />

        
        <div className='form-control'>
          <label>
            Email
        <input id="email"  name='email'  value={formik.values.email} onChange={formik.handleChange}  onBlur={formik.handleBlur}   type='email'/>
        {formik.touched.email && formik.errors.email ? <div className= 'error'>{formik.errors.email}</div> :  null}
        </label>
        </div>
        <br />
       
        <div className='form-control'>
          <label>
            Create password
          <input   name='password' value={formik.values.password} onChange={formik.handleChange}   onBlur={formik.handleBlur}  type='password'/>
          {formik.touched.password && formik.errors.password ? <div className= 'error'>{formik.errors.password}</div> :  null}
          </label>
          
       </div>
       <br />
        
        <div className='form-control'>
          <label>
            Confirm password
          <input name='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange}  onBlur={formik.handleBlur}  type='password'/>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className= 'error'>{formik.errors.confirmPassword}</div> :  null}
          </label>
      </div>
      <br />

        <div className='form-control'>
          <label>
            Date of Birth
          <input type='date' label='Date of Birth' name='dateOfBirth' value={formik.values.dateOfBirth} onChange={formik.handleChange}  onBlur={formik.handleBlur}   max={current} />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? <div className= 'error'>{formik.errors.dateOfBirth}</div> :  null}
          </label>
        </div>
        <br />

        <label>
            Gender
              </label>
            <div>
            <input  type='radio'  name="gender" value={'Male'} onChange={formik.handleChange}  onBlur={formik.handleBlur} /> Male 
             <input type='radio'   name="gender" value={'Female'} onChange={formik.handleChange}  onBlur={formik.handleBlur} /> Female
             {formik.touched.gender && formik.errors.gender ? <div className= 'error'>{formik.errors.gender}</div> :  null}
            </div>
            <br />

            <div className='checkbox-wrapper'>
            <input  type='checkbox' id='checkbox' name="wantNewsLetters"  checked={formik.values.wantNewsLetters} onChange={formik.handleChange}/>
            <label htmlFor='checkbox' className='checkMark'>I want to receive safari newsletters with the best deals and offers</label>
            </div>
            <br />
            <br />
             <button type='submit'>CREATE ACCOUNT</button>
      </form>
      </div>
)
}

 
 export default Registration