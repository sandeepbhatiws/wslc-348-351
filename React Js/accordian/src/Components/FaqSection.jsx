import React from 'react'

export default function FaqSection({ faqData, currentFaq, setCurrentFaq }) {
    
    const showFaq = (id) => {
        setCurrentFaq(id)
    }

  return (
    <>
        <div class="outerQuestion">
            <div class="question" onClick={ () => showFaq(faqData.id) }>
                { faqData.question }
                <span>{ (faqData.id == currentFaq) ? '-' : '+' }</span>
            </div>
            <div class={ (faqData.id == currentFaq) ? 'answer' : 'answer hide' }>
                { faqData.answer }
            </div>
        </div>
    </>
  )
}
