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
  const [locationapi, setLocationapi] = useState<boolean>(false);

  const apiKey = "8bNErOkA9bUF9Vx1z1DVE3YlzQe1tW97";
  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLon(position.coords.longitude);
      setLat(position.coords.latitude);
      setLocationapi(true);
    });
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
        `https://api.tomorrow.io/v4/weather/realtime?location=${inputCity}&apikey=${apiKey}`
      );
      setWeatherData(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      setLoading(false);
    }
  };
  // const [search,setSearch]=useState(false)
  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     if (!inputCity) {
  //       setError("Please enter a city name");
  //       return;
  //     }

  //     setError("");
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `https://api.tomorrow.io/v4/weather/realtime?location=${inputCity}&apikey=${apiKey}`
  //       );
  //       setWeatherData(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to fetch weather data. Please try again.");
  //       setLoading(false);
  //     }
  //   };

  //   // Call API only when inputCity is not empty
  //   if (inputCity) {
  //     fetchWeatherData();
  //   }
  // }, [search]);

  useEffect(() => {
    if (locationapi && lat && lon) {
      //pk.8726f34fa6e08015f900fd0a94f63076
      axios
        .get(
          `https://us1.locationiq.com/v1/reverse?key=pk.8726f34fa6e08015f900fd0a94f63076&lat=${lat}&lon=${lon}&format=json&`
        )
        .then((data) => {
          setInputCity(data.data.address.city);
        });
    }
  }, [locationapi, lat, lon]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <InputCity
              inputCity={inputCity}
              // setSearch={setSearch}
              setInputCity={setInputCity}
              fetchWeatherData={fetchWeatherData}
              handleLocation={handleLocation}
            ></InputCity>
          }
        >
          <Route
            path="display"
            element={
              <Display
                loading={loading}
                error={error}
                weatherData={weatherData}
              ></Display>
            }
          ></Route>
        </Route>
      </>
    )
  );

  return (
    <Suspense fallback={<div>Loading............</div>}>
      <RouterProvider router={router} />;
    </Suspense>
  );
}
