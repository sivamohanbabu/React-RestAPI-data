// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "oCdnLRqEH1aalhaTkJU11tErTINhBSqiSUkYtSGx"; // Replace with your NASA API key

const App = () => {
  const [apod, setApod] = useState(null);
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [loadingApod, setLoadingApod] = useState(true);
  const [loadingRover, setLoadingRover] = useState(true);
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

  // Fetch Mars Rover Photos
  useEffect(() => {
    const fetchRoverPhotos = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
          {
            params: {
              sol: 1000, // Martian sol (day), you can change this to a different value
              api_key: API_KEY,
            },
          }
        );
        setRoverPhotos(response.data.photos);
        setLoadingRover(false);
      } catch (error) {
        console.error("Error fetching Rover photos:", error.message);
        setError("Failed to fetch Rover photos");
        setLoadingRover(false);
      }
    };

    fetchRoverPhotos();
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
      {loadingRover ? (
        <p>Loading Mars Rover Photos...</p>
      ) : (
        <div>
          <h2>Mars Rover Photos</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {roverPhotos.map((photo) => (
              <div key={photo.id} style={{ margin: "10px" }}>
                <img
                  src={photo.img_src}
                  alt={`Mars Rover ${photo.id}`}
                  style={{ width: "200px", borderRadius: "8px" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
