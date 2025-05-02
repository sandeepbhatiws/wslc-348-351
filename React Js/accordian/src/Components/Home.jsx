import React from 'react'
import Header from './Header';

export default function Home() {

    var title = "Don’t Just Upskill, Get Career-ready, Get Hired";
    var description = 'Top Mentorship Programs in Tech, Marketing, & Data- Designed and Delivered by industry maestros.';

  return (
    <div>
        
        <Header heading={ title } tagline={ description }/>

        <Header heading={ title } tagline={ description }>
            {title} { description }
        </Header>
    </div>
  )
}
