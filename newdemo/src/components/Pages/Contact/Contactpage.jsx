import React from 'react'
import Contactbanneer from './Contactbaneer';
import ContactCards from './Contactcard';
import ContactForm from './Contactform';
import Googlemap from './Googlemap';

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