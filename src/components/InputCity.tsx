import { Container, TextField, Button, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Outlet, useNavigate } from "react-router-dom";
import image from "../assets/bg.jpg";
import styled from "styled-components";

interface Props {
  inputCity: string;
  setInputCity: (value: string) => void;
  fetchWeatherData: () => void;
}

const InputCity = ({ inputCity, setInputCity, fetchWeatherData }: Props) => {
  const navigate = useNavigate();

  const handleFetch = () => {
    fetchWeatherData();
    navigate("/display");
  };

  const Image = styled(Box)({
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
  });

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
        width: "80%",
        background: "linear-gradient(to right, #f0f0f0, #ece9e6)",
        borderRadius: "30px",
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Image />

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
          animation: "fadeIn 0.5s ease-in-out",
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

        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            padding: "1rem",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <TextField
            sx={{
              width: "75%",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#4F6272",
                },
                "&:hover fieldset": {
                  borderColor: "#333",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4F6272",
                },
              },
            }}
            label="Enter City"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />

          <Button
            onClick={handleFetch}
            sx={{
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
            }}
          >
            Search <SearchIcon />
          </Button>
        </Box>

        <Box
          sx={{
            mt: 4,
            borderRadius: "15px",
            backgroundColor: "#f9f9f9",
            padding: "2rem",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Container>
  );
};

export default InputCity;