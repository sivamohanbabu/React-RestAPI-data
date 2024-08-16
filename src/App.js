import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "X10rc6knRE3c8cug3NUY0hpzAHY4aD2WzE5W4lNJ"; // Replace with your NASA API key

const App = () => {
  const [apod, setApod] = useState(null);
  const [loadingApod, setLoadingApod] = useState(true);
  const [error, setError] = useState("");

  // Fetch Astronomy Picture of the Day (APOD)
  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/planetary/apod",
          {
            params: {
              api_key: API_KEY,
            },
          }
        );
        setApod(response.data);
        setLoadingApod(false);
      } catch (error) {
        console.error("Error fetching APOD:", error.message);
        setError("Failed to fetch APOD");
        setLoadingApod(false);
      }
    };

    fetchApod();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>NASA API Example</h1>
      {loadingApod ? (
        <p>Loading Astronomy Picture of the Day...</p>
      ) : (
        apod && (
          <div>
            <h2>Astronomy Picture of the Day</h2>
            <h3>{apod.title}</h3>
            <img
              src={apod.url}
              alt={apod.title}
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
            <p>{apod.explanation}</p>
          </div>
        )
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
