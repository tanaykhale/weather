import { lazy, Suspense, useState } from "react";
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

  const apiKey = "8bNErOkA9bUF9Vx1z1DVE3YlzQe1tW97";

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
