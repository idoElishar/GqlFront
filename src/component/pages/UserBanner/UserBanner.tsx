import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Button,
  CardActions,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Banner } from "../../interface";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";





export default function UserBanners() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token')?.replace(/^"|"$/g, '');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    async function fetchBanners() {
      try {
        const response = await axios.get<Banner[]>("http://localhost:8008/api/banners", options);
        // const response = await axios.get(`${api}/api/banners`);
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }

    fetchBanners();
  }, []);

  const deleteBanner = async (id: string) => {
    const token = localStorage.getItem('token')?.replace(/^"|"$/g, '');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    try {
      await axios.delete(`http://localhost:8008/api/banners/${id}`, options);
      // await axios.delete(`${api}/api/banners/${id}`);
      setBanners(banners.filter((banner) => banner._id !== id));
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  return (
    <Container sx={{ padding: "2rem", maxWidth: "1200px", marginTop: "8px", backgroundColor: '#f4f4f4' }}>
      <Header />
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: "2rem",
          textAlign: "center",
          color: "#00796b", // Dark teal color for the title
          marginTop: "20px"
        }}
      >
        User Banners
      </Typography>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: "3rem"
        }}
      >
        {banners.map((card: Banner) => (
          <CardActionArea onClick={() => navigate(`/bannerPage/${card._id}`)} style={{ width: '300px', transition: 'transform 0.3s ease' }}>
            <Card
              sx={{
                width: '300px',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                borderRadius: "10px",
                border: '1px solid #ccc', // Lighter grey border
                backgroundColor: '#ffffff', // White background for card
                '&:hover': {
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
                  border: '1px solid #00796b', // Dark teal border on hover
                  transform: 'scale(1.03)' // Slightly scaling up the card on hover
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: '340px',
                  objectFit: 'contain'
                }}
                image={card.image.url}
                title={card.image.alt}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#005662' }}> {/* Darker teal for text */}
                  {card.image.alt}
                </Typography>
                {/* Additional content here */}
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/editBanner/${card._id}`);
                  }}
                  size="small"
                  sx={{ backgroundColor: '#009688', color: 'white', '&:hover': { backgroundColor: '#00796b' } }} // Teal buttons
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  sx={{ backgroundColor: '#e57373', color: 'white', '&:hover': { backgroundColor: '#ef5350' } }} // Light red for delete button
                  onClick={(e) => {
                    deleteBanner(card._id);
                    e.stopPropagation();
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </CardActionArea>
        ))}
      </div>
      <Footer />
    </Container>
  );





}
