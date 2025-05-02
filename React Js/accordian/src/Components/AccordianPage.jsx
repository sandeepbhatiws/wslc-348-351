import React, { useState } from 'react'
import FaqSection from './FaqSection'
import faqdata from '../faqdata'

export default function AccordianPage() {

    const [allFaqData, setAllFaqData] = useState((faqdata.length > 0) ? faqdata : []);

    const [currentFaq, setCurrentFaq] = useState(allFaqData[0]['id']);

  return (
    <>
        <div class="main">
            <div class="row">
                <h1>Frequently Asked Questions</h1>
            </div>

            <div class="row">
                {
                    allFaqData.map((v,i) => {
                        return(
                            <FaqSection faqData={v} key={i} currentFaq={currentFaq} setCurrentFaq ={setCurrentFaq}/>
                        )
                    })
                }
                
            </div>
        </div>
    </>
  )
}
