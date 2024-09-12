import React from 'react'
import { Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom'

export  function Header() {
  return (
    <Navbar>
      <Link to="/">
        <span>Comrade</span>
        Trends
      </Link>
    </Navbar>
  )
}
