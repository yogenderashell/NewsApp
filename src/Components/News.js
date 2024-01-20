import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
  render() {
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
        <div className="row">
          <div className="col-md-4">
              <Newsitem title="New title" description="hello this is a new description and i want to say that this is just a sample desc"/>
          </div>
          <div className="col-md-4">
              <Newsitem title="New title" description="hello this is a new description and i want to say that this is just a sample desc"/>
          </div>
          <div className="col-md-4">
              <Newsitem title="New title" description="hello this is a new description and i want to say that this is just a sample desc"/>
          </div>
        </div>
      </div>
    )
  }
}

export default News