import React from 'react'
import { PropTypes } from 'prop-types';

const NewsItem = (props) => {

  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-3 ' style={{ padding: "10px" }}>
      <div className="card h-100">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: '1', left: '95%' }}>
          {source}
        </span>
        <img src={imageUrl ? imageUrl : "https://cdn.ndtv.com/common/images/ogndtv.png"} className="card-img-top" alt="..." height={200} />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a href={newsUrl} target='noreffer' className="btn btn-sm btn-dark">Read more</a>
          <div className="container my-3">
            <div className="card-footer">
              <small className="text-body-secondary">By {author} on {date}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default NewsItem

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  source: PropTypes.string
}