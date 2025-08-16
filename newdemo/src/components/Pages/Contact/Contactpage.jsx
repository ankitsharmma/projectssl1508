import React from 'react'

import ContactCards from './Contactcard';
import ContactForm from './Contactform';
import Googlemap from './Googlemap';
import ContactBanner from './Contactbaneer';

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
