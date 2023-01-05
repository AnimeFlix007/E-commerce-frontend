import React from 'react'
import MainCarousel from './MainCarousal'
import ItemsLists from './ItemsLists'
import Subscribe from './Subscribe'

const Home = () => {
  return (
    <div className="home">
      <MainCarousel />
      <ItemsLists />
      <Subscribe />
    </div>
  )
}

export default Home