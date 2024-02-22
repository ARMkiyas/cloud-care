import React from 'react'

export default function page({params}:{params:{allStaff:string}}) {
  return (
    <div>all staff  page{params.allStaff}</div>
  )
}

