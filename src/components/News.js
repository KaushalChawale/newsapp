import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  
  
  const updateNews = async() => {
    props.setProgress(10)
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(60)
    console.log(parsedData);
    setArticles(parsedData.articles) 
    setTotalResults(parsedData.totalResults)
    
    console.log("Update",page)
    props.setProgress(100)
  }
  
  useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - News24`
      updateNews();
  }, [])
  


  // handlePrevClick = async()=>{
  //   console.log('Previous')
  //     //  let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1641b4b5bf984037b5e5af14b21a514a&page=${this.state.page-1}&pageSize=${props.pageSize}`;
  //     //  let data = await fetch(url);
  //     //  let parsedData = await data.json();
  //     //  console.log(parsedData);
  //     //  this.setState({
  //     //      page: this.state.page - 1,
  //     //      articles: parsedData.articles
  //     //  }); 
  //     //  console.log("Prev",this.state.page)
  //     this.setState({page: this.state.page - 1})
  //     this.updateNews()
  // }
  
  //  handleNextClick = async()=>{
  //   console.log('Next')
  //   // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)))
  //   // {
  //   //     let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1641b4b5bf984037b5e5af14b21a514a&page=${this.state.page+1}&pageSize=${props.pageSize}`;
  //   //     let data = await fetch(url);
  //   //     let parsedData = await data.json();
  //   //     console.log(parsedData);
  //   //     this.setState({
  //   //         page: this.state.page + 1,
  //   //         articles: parsedData.articles
  //   //     }); 
  //   // }
  //   // console.log("Next",this.state.page)

  //   this.setState({page: this.state.page + 1})
  //   this.updateNews()
  // }

  const fetchMoreData = async() => {
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=1641b4b5bf984037b5e5af14b21a514a&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
       let data = await fetch(url);
       let parsedData = await data.json();
       console.log(parsedData);
       setArticles(articles.concat(parsedData.articles))
       setTotalResults(parsedData.totalResults)
  };

    return (
      <>
        <h3 style={{textAlign:"center", marginTop: '80px'}}><b style={{color: 'red'}}>News24</b> - Top {capitalizeFirstLetter(props.category)} headlines</h3>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
        >
          
          <div className="container">
 
            <div className="row">
                  {articles.map((element)=>{
                      return  <div className="col-md-4" key={element.url} >
                      <NewsItem title={element.title} description= {element.description} 
                      imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div>
                  })}  
            </div>

                    
          </div>          
          </InfiniteScroll>
        
      </>
    )
  
}

News.defaultProps={
  country: "in",
  pageSize: 8,
  category: "general"
}

News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News

