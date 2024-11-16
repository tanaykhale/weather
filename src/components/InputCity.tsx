import {
  Container,
  Button,
  Box,
  Typography,
  Tooltip,
  styled,
} from "@mui/material";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { Outlet, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import image from "../assets/bg.jpg";
import { useRef } from "react";
import "./InputCity.css";

interface Props {
  inputCity: string;
  setInputCity: (value: string) => void;
  fetchWeatherData: () => void;
  handleLocation: () => void;
}

const ImageBox = styled(Box)(() => ({
  backgroundImage: `url(${image})`,
  width: "40%",
  height: "100%",
  backgroundSize: "cover",
  borderRadius: "20px 0 0 20px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const SearchBoxContainer = styled(Box)(() => ({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
  padding: "1rem",
  borderRadius: "15px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
}));

const StyledButton = styled(Button)(() => ({
  backgroundColor: "#4F6272",
  color: "#ffffff",
  padding: "0.8rem 1.5rem",
  borderRadius: "50px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  transition: "background-color 0.3s ease-in-out, transform 0.2s",
  "&:hover": {
    backgroundColor: "#394350",
    transform: "translateY(-2px)",
  },
}));

const InputCity: React.FC<Props> = ({
  inputCity,
  setInputCity,
  fetchWeatherData,
  handleLocation,
}) => {
  const navigate = useNavigate();
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);

  const handleFetch = () => {
    fetchWeatherData();
    navigate("/display");
  };

  const handlePlaceChange = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (places?.length) {
        setInputCity(places[0].formatted_address || "");
      }
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        margin: "0 auto",
        background: "linear-gradient(to right, #f0f0f0, #ece9e6)",
        borderRadius: "30px",
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <ImageBox />

      <Box
        sx={{
          width: "60%",
          height: "90%",
          paddingLeft: "4%",
          backgroundColor: "#ffffff",
          borderRadius: "0 30px 30px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          padding: "2rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
            mb: 4,
            letterSpacing: "0.5px",
          }}
        >
          Weather App
        </Typography>

        <SearchBoxContainer>
          <LoadScript
            googleMapsApiKey="AIzaSyBtAY7_uB_rluew7nbk65v3SMAXQRZm03k"
            libraries={["places"]}
          >
            <StandaloneSearchBox
              onLoad={(ref) => (inputRef.current = ref)}
              onPlacesChanged={handlePlaceChange}
            >
              <input
                className="custom-input"
                type="text"
                placeholder="Enter the place"
              />
            </StandaloneSearchBox>
          </LoadScript>

          <Tooltip title="Get current location" onClick={handleLocation}>
            <GpsFixedIcon />
          </Tooltip>

          <StyledButton onClick={handleFetch}>
            Search <SearchIcon />
          </StyledButton>
        </SearchBoxContainer>
        <Outlet />
      </Box>
    </Container>
  );
};

export default InputCity;
