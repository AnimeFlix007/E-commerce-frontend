import React from 'react'
import MainCarousel from './MainCarousal'
import ItemsLists from './ItemsLists'

const Home = () => {
  return (
    <div className="home">
      <MainCarousel />
      <ItemsLists />
    </div>
  )
}

export default Home