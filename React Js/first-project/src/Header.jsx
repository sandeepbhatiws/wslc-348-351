import React from 'react'

export default function Header() {

  var title = 'Welcome To WsCube Tech';
  var tagline = 'Top Mentorship Programs in Tech, Marketing, & Data- Designed and Delivered by industry maestros.';

  var status = 1;

  return (
    <>
        <div>
            {
              (status == 1)
              ?
                title
              :
              ''
            }
        </div>
        <div style={{ backgroundColor: 'red', color : 'white' }}>
          { tagline }
        </div>
    </>
    
  )
}
