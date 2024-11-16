import { Box, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import AirIcon from "@mui/icons-material/Air";

interface DisplayProps {
  loading: boolean;
  error: string;
  weatherData: any | null;
}

const Display = ({ loading, error, weatherData }: DisplayProps) => {
  return (
    <>
      <Box
        sx={{
          mt: 4,
          borderRadius: "15px",
          backgroundColor: "#f9f9f9",
          padding: "2rem",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {loading && (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#4F6272",
            }}
          >
            Loading...
          </Typography>
        )}

        {error && (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "1.2rem",
              color: "red",
              mt: 2,
            }}
          >
            {error}
          </Typography>
        )}

        {weatherData && weatherData.location && weatherData.data && (
          <Box
            sx={{
              mt: 4,
              p: 3,
              backgroundColor: "#ffffff",
              borderRadius: "15px",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              width: "80%",
              margin: "0 auto",
              animation: "fadeIn 0.5s ease-in-out",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                gap: "0.5rem",
              }}
            >
              <LocationOnIcon sx={{ fontSize: "2.5rem", color: "#4F6272" }} />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                Weather in {weatherData.location.name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                backgroundColor: "#F7FAFC",
                borderRadius: "10px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                "& .MuiSvgIcon-root": {
                  fontSize: "2rem",
                  color: "#4F6272",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1.2rem",
                  color: "#333",
                }}
              >
                <CloudQueueIcon />
                <Typography>
                  Temperature: {weatherData.data.values.temperature}°C
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1.2rem",
                  color: "#333",
                }}
              >
                <DeviceThermostatIcon />
                <Typography>
                  Humidity: {weatherData.data.values.humidity}%
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1.2rem",
                  color: "#333",
                }}
              >
                <AirIcon />
                <Typography>
                  Wind Speed: {weatherData.data.values.windSpeed} km/h
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Display;
