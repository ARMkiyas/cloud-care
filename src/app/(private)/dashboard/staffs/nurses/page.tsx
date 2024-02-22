import React from 'react'

export default function page({params}:{params:{nurses:string}}) {
  return (
    <div>nurse page{params.nurses}</div>
  )
}

