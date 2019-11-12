import React from 'react'
import {Link} from 'react-router-dom'

const AllCategories = () => {
  return (
    <div>
      <h2>Shop By Category</h2>
      <div id="categories">
        <div className="">
          <Link to="/category/Tables">
            <h3>Tables</h3>
          </Link>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR9kxQQOXVjJas4QRQGwuZoJKukmohKNFvFAKwPUX7lDPfCQjb0Q&s" />
        </div>
        <div className="">
          <Link to="/category/Chairs">
            <h3>Chairs</h3>
          </Link>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR9kxQQOXVjJas4QRQGwuZoJKukmohKNFvFAKwPUX7lDPfCQjb0Q&s" />
        </div>
      </div>
    </div>
  )
}

export default AllCategories
