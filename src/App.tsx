import { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const InputCity = lazy(() => import("./components/InputCity"));
const Display = lazy(() => import("./components/Display"));

export default function App() {
  const [inputCity, setInputCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  const API_KEY_WEATHER = import.meta.env.VITE_API_KEY_WEATHER;
  const API_KEY_LOCATION = import.meta.env.VITE_API_KEY_LOCATION;

  const handleLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLon(position.coords.longitude);
        setLat(position.coords.latitude);
      },
      () => setError("Unable to fetch location. Please try again.")
    );
  };

  const fetchWeatherData = async () => {
    if (!inputCity) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/realtime?location=${inputCity}&apikey=${API_KEY_WEATHER}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCityFromCoordinates = async () => {
      if (lat && lon) {
        try {
          const { data } = await axios.get(
            `https://us1.locationiq.com/v1/reverse?key=${API_KEY_LOCATION}&lat=${lat}&lon=${lon}&format=json`
          );
          const city = data?.address?.city;
          if (city) setInputCity(city);
        } catch {
          setError("Failed to fetch city from coordinates. Please try again.");
        }
      }
    };

    fetchCityFromCoordinates();
  }, [lat, lon]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <InputCity
              inputCity={inputCity}
              setInputCity={setInputCity}
              fetchWeatherData={fetchWeatherData}
              handleLocation={handleLocation}
            />
          }
        >
          <Route
            path="display"
            element={
              <Display
                loading={loading}
                error={error}
                weatherData={weatherData}
              />
            }
          />
        </Route>
      </>
    )
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
