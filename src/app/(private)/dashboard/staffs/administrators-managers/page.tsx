import React from 'react'

export default function page({params}:{params:{adminManage:string}}) {
  return (
    <div>admin page {params.adminManage}</div>
  )
}

