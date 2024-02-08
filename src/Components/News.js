import React, { useEffect,useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// api key: ea736a70b5c84d19bdd3918ca48c06b4
const News =(props) => {
  const [articles, setarticles] = useState([])
  //eslint-disable-next-line
  const [loading, setloading] = useState(true)
  //eslint-disable-next-line
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const im =
  "https://imgs.search.brave.com/TdusGZHGJLewSXwMLMal8qu7QNkUdxFbOneVD8TlXVI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9ob3Vz/ZS1uZXdzLXBhcGVy/LTM5MjA0NDUuanBn";
  const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70)
    // console.log(parsedData)
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `Top ${capitalizeString(props.category)} Headlines - Quick News`;
    updateNews();
    //eslint-disable-next-line
  }, [])
  // const handlePreviousClick = async () => {
  //   setpage(page-1)
  //   updateNews();
  // };
  // const handleNextClick = async () => {
  //   setpage(page+1)
  //   updateNews();
  // };
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    setloading(false)
  };

    return (
      <div className="container my-5">
        <div className="d-inline-flex align-items-baseline my-4">
          <h1 style={{ color: "#5e807fff" }}>Top Headlines - </h1>
          <h2
            style={{ paddingLeft: "8px" }}
          >{`Showing Recent ${capitalizeString(
            props.category
          )} News`}</h2>
        </div>
        {/* {loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length <= totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element,index) => {
                return (
                  <div className="col-md-4 mx-auto px-auto" key={index}>
                    <Newsitem
                      author={element.author}
                      date={element.publishedAt}
                      newsUrl={element.url}
                      imageUrl={
                        element.urlToImage ? element.urlToImage : im
                      }
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
  apiKey:"ea736a70b5c84d19bdd3918ca48c06b4",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string
};
export default News;
