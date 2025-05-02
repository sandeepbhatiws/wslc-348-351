import React from 'react'
import software from './assets/images/software-development-6523979_1280.jpg';

export default function Home() {

  let title = 'Home page';

  var status = 1;

  return (
    <>
    <div className="row" style={{ display: `${ (status) ? 'block' : 'none'  }` }}>
      { title }
    </div>
    <div>
      {/* <img src='/software-development-6523979_1280.jpg' width={500} height={500}/> */}


      <img src={ software } width={500} height={500}/>
    </div>
    </>

  )
}
