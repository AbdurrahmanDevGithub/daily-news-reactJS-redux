import { useSelector, useDispatch } from "react-redux";
import { fetchPostById } from "../../store/utils/thunk";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Moment from "react-moment";
import { clearPostById } from "../../store/reducers/posts";

const PostComponents = () => {
  const post = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  let params = useParams();

  useEffect(() => {
    dispatch(fetchPostById(params.id));
  }, []);

  useEffect(()=>{
    return()=>{
      dispatch(clearPostById())
    }
  },[])

  return (
    <>
      {post.postById ? (
        <div className="article_container">
          <h1>{post.postById.title}</h1>
          <div
            style={{ background: `url(${post.postById.imagexl})` }}
            className="image"
          ></div>
          <div className="author">
            created by: <span>{post.postById.author} - </span>
            <Moment format="DD MMMM">{post.postById.createdAt}</Moment>
          </div>
          <div className="mt3 content">
            <div
              dangerouslySetInnerHTML={{
                __html: post.postById.content,
              }}
            ></div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default PostComponents;
