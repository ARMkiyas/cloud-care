import React from 'react'

export default function page({params}:{params:{specialists:string}}) {
  return (
    <div>specialists page{params.specialists}</div>
  )
}

