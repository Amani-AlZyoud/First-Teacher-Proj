import React from 'react'
import MainForm from './MainForm'
import HeadForm from './HeadForm'
import TableOne from './TableOne'
import TableTwo from './TableTwo'

const LessonsPlan = () => {

  

  return (
    <>

<div  className="container px-4 pt-5 my-5 text-center border-bottom shadow-lg rounded"  id="form-container">
 <MainForm />
 <HeadForm />
 <TableOne />
 <TableTwo />

  <button className="btn btn-lg btn-dark my-5" id='createPlan'>إنهاء</button>
   
</div>
    
    
    </>
  )
}

export default LessonsPlan