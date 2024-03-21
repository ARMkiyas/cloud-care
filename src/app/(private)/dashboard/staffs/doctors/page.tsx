import React from 'react'

export default function page({params}:{params:{doctors:string}}) {
  return (
    <div>Doctor page {params.doctors}</div>
  )
}

