import React from 'react'

// // Method 1
// export default function Header(data) {

//     console.log(data);
//   return (
//     <>
//         <center>
//             <h1>{ data.heading }</h1>
//             <p>{ data.tagline }</p>
//             <p>{ data.children }</p>
//         </center>
//     </>
//   )
// }

// Method 2
export default function Header({ heading, tagline, children }) {

  return (
    <>
        <center>
            <h1>{ heading }</h1>
            <p>{ tagline }</p>
            <p>{ children }</p>
        </center>
    </>
  )
}
