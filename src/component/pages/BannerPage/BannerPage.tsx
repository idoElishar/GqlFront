import { useState } from "react";
import Button from '@mui/material/Button';
interface Banner {
  _id?: string;
  id: number;
  image: {
    url: string;
    alt: string;
  };
  text: string;
  createdAt: Date;
  author: string;
  category: string;
  rating: number;
  sale?: number;
}

export default function BannerPage() {
  const [banner, setBanner] = useState<Banner | undefined>({
    id: 1,
    image: {
      url: "https://ksp.co.il/m_action_libs/img/topCategory/22.png?v=2029",
      alt: "breck pest",
    },
    text: "lihkjgk",
    createdAt: new Date(),
    author: "Author 1",
    category: "food",
    rating: 4.5,
    sale: 20,
  });

  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        margin: "2rem 2rem 6rem 2rem",
      }}
    >
      <div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <h1> Banner Details </h1>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
              alignItems: "flex-start",
            }}
          >
              <h3>category:</h3>
              {banner?.category}

              <h3>rating:</h3>
              {banner?.rating}  
  
              <h3>sale:</h3>
              {banner?.sale}
          </div>
          <div style={{ width: "60%", marginLeft: "20px" }}>
            {banner?.image && (
              <div>
                <img
                  src={banner?.image.url}
                  alt={banner?.image.alt}
                  style={{
                    width: "100%",
                    height: "auto",
                    marginBottom: "10px",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
          <Button variant="contained">Return to categories</Button>
    </div>
  );
  
}
