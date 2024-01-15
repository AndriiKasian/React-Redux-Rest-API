import { useEffect } from "react";
import List from "@mui/material/List/List";
import ListItem from "@mui/material/ListItem/ListItem";
import Box from "@mui/material/Box/Box";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Typography from "@mui/material/Typography/Typography";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux-hooks";
import { loadPosts, postsSelector } from "../../store/posts/postsSlice";

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(postsSelector);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h2" sx={{ p: 2 }}>
        Posts
      </Typography>
      <Box sx={{ maxWidth: "50%" }}>
        <List>
          {posts.map((post) => (
            <ListItem key={post.id} divider dense>
              <ListItemText primary={post.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Posts;
