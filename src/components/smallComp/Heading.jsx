import React from 'react'
import { Rowdies} from 'next/font/google'

const rowdies = Rowdies({
  weight:["700"],
  subsets:["latin"]
})

function Heading({heading}) {
  return (
    <h1 className={`text-5xl text-white ${rowdies.className}`}>{heading}</h1>
  )
}

export default Heading
