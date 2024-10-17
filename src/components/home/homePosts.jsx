import { useEffect } from "react"
import { fetchPosts } from "../../store/utils/thunk"
import { useSelector,useDispatch } from "react-redux"
import { Button, Spinner } from "react-bootstrap"
import Masonry from "react-masonry-css"
import { LinkContainer } from "react-router-bootstrap"
import Moment from "react-moment"

const HomePost=()=>{

  const postSelector=useSelector((state)=>state.posts)
  const dispatch=useDispatch()

  useEffect(()=>{
    if(postSelector.articles.items.length <= 0){
      dispatch(fetchPosts({page:1,limit:6,order:"desc"}))
    }
    
  },[])

  const loadMorePost=()=>{
    const page=postSelector.articles.page+1;
    dispatch(fetchPosts({page,order:"desc",limit:6}));
  }


  return(
    <>
      <Masonry
        breakpointCols={{default:3,800:2,400:1}}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >

        {postSelector.loading ? 
          <div style={{textAlign:"center"}}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        : null}

        {postSelector.articles
          ? postSelector.articles.items.map((item) => (
              <div key={item.id}>
                <img
                  style={{ width: "100%", height: "200px" }}
                  src={`${item.image}?${item.id}`}
                  alt="some pic"
                /><div className="author">
                  <span>{item.author} - </span>
                  <Moment format="DD MMMM">{item.createdAt}</Moment>
                </div>
                <div className="content">
                  <div className="title">{item.title}</div>
                  <div className="excerpt">{item.excerpt}</div>
                  <LinkContainer to={`/article/${item.id}`} className="mt-3">
                    <Button variant="light">Read more</Button>
                  </LinkContainer>
                </div>
              </div>
            ))
          : null}
      </Masonry>

      {!postSelector.articles.end && !postSelector.loading ? (
        <Button variant="outline-dark" onClick={() => loadMorePost()}>
          Load More
        </Button>
      ) : null}
    </>
  );
};
export default HomePost