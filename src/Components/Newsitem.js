import React from "react";

const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, date, author} = props;
    return (
      <>
      <div className="my-3">
        <div className="card" style={{height:"29rem"}}>
          <img style={{height:"15rem",width:"auto"}} src={imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-title"><small className="text-muted">By {!author?"Unknown":author} On {new Date(date).toGMTString()}</small> </p>
            <p className="card-text">
              {description}...
            </p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
      </>
    );
}

export default Newsitem;
