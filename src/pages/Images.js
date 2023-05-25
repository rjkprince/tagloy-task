import {
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Images() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("https://picsum.photos/v2/list").then((res) => {
      setData(res.data);
    });
  }, []);
  console.log(data);

  return (
    <>
      <Grid container spacing={1}>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <img
                src={item.download_url}
                alt={item.author + item.id}
                style={{
                    width: '100%',
                    height: '250px',
                }}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
}
