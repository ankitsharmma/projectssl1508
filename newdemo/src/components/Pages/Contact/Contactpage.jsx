import React from 'react'
import ContactBanner from './contactBaneer';
import ContactCards from './Contactcard';
import ContactForm from './Contactform';
import Googlemap from './Googlemap';

function Contactpage() {
  return (
<>
<ContactBanner/>

<ContactForm/>
<ContactCards/>
<Googlemap/>
</>
  )
}

export default Contactpage;
