import React from 'react'
import Contactbanner from './contactbaneer';
import ContactCards from './Contactcard';
// import ContactForm from './Contactform';
import Googlemap from './Googlemap';
import Contactbanneer from './contactbaneer';


function Contactpage() {
  return (
<>
<Contactbanneer/>

{/* <ContactForm/> */}
<ContactCards/>
<Googlemap/>
</>
  )
}

export default Contactpage;
