//Impoprtaciones:
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTitle } from '../../../store/titleSlice';

//JSX:
const Blog = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle('Blog'));
  }, [dispatch]);

  return (
    <div style={{height: "650px", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <h1>Blog</h1>
    </div>
  );
};

export default Blog;