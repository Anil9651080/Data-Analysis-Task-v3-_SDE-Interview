import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [maxMinProductionData, setMaxMinProductionData] = useState([]);
  const [averageYieldAndAreaData, setAverageYieldAndAreaData] = useState([]);

  useEffect(() => {
    fetch('../data.json')
      .then(response => response.json())
      .then(jsonData => {
        setMaxMinProductionData(jsonData.maxMinProduction);
        setAverageYieldAndAreaData(jsonData.averageYieldAndArea);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Agriculture Data --- {`Data Analysis Task (v3)`}</h2>

      <h4>Max Min Production</h4>
      <div className="tablebox">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Crop with Maximum <br />
                Production in that Year</th>
              <th>Crop with Minimum<br />
                Production in that Year</th>
            </tr>
          </thead>
          <tbody>
            {maxMinProductionData.map(({ year, maxCrop, minCrop }) => (
              <tr key={year}>
                <td>{year}</td>
                <td>{maxCrop}</td>
                <td>{minCrop}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4>Average Yield and Area</h4>
      <div className="tablebox">
        <table>
          <thead>
            <tr>
              <th>Crop</th>
              <th>Average Yield of the
                <br />
                Crop between<br />
                1950-2020</th>
              <th>Average Cultivation Area<br />
                of the Crop between<br />
                1950-2020</th>
            </tr>
          </thead>
          <tbody>
            {averageYieldAndAreaData.map(({ crop, averageYield, averageArea }) => (
              <tr key={crop}>
                <td>{crop}</td>
                <td>{averageYield}</td>
                <td>{averageArea}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
