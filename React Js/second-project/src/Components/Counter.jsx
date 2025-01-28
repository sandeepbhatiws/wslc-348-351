import React, { useState } from 'react'

export default function Counter() {

    // var counter = 5;
    var [counter, setCounter] = useState(15);

    const minus = () => {
        counter--;
        setCounter(counter);
    }

    const plus = () => {
        counter++;
        setCounter(counter);
    }

  return (
    <>
        <div className="card">
            <button onClick={ minus }>
                -
            </button>

            <button>
              {counter}
            </button>

            <button onClick={ plus }>
               +
            </button>
        </div>
    </>
  )
}
