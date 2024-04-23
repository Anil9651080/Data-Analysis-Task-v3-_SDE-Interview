// import React, { useState, useEffect } from 'react';
// import './App.css';

// function App() {
//   const [maxMinProductionData, setMaxMinProductionData] = useState([]);
//   const [averageYieldAndAreaData, setAverageYieldAndAreaData] = useState([]);

//   useEffect(() => {
//     fetch('../data.json')
//       .then(response => response.json())
//       .then(jsonData => {
//         setMaxMinProductionData(jsonData.maxMinProduction);
//         setAverageYieldAndAreaData(jsonData.averageYieldAndArea);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Agriculture Data --- {`Data Analysis Task (v3)`}</h2>

//       <h4>Max Min Production</h4>
//       <div className="tablebox">
//         <table>
//           <thead>
//             <tr>
//               <th>Year</th>
//               <th>Crop with Maximum <br />
//                 Production in that Year</th>
//               <th>Crop with Minimum<br />
//                 Production in that Year</th>
//             </tr>
//           </thead>
//           <tbody>
//             {maxMinProductionData.map(({ Year, maxCrop, minCrop }) => (
//               <tr key={Year}>
//                 <td>{Year}</td>
//                 <td>{maxCrop}</td>
//                 <td>{minCrop}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <h4>Average Yield and Area</h4>
//       <div className="tablebox">
//         <table>
//           <thead>
//             <tr>
//               <th>Crop</th>
//               <th>Average Yield of the
//                 <br />
//                 Crop between<br />
//                 1950-2020</th>
//               <th>Average Cultivation Area<br />
//                 of the Crop between<br />
//                 1950-2020</th>
//             </tr>
//           </thead>
//           <tbody>
//             {averageYieldAndAreaData.map(({ crop, averageYield, averageArea }) => (
//               <tr key={crop}>
//                 <td>{crop}</td>
//                 <td>{averageYield}</td>
//                 <td>{averageArea}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import './App.css';

interface AgricultureData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": string | number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": string | number;
  "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
}

function App() {
  const [maxMinProductionData, setMaxMinProductionData] = useState<AgricultureData[]>([]);
  const [averageYieldAndAreaData, setAverageYieldAndAreaData] = useState<AgricultureData[]>([]);

  useEffect(() => {
    fetch('../data.json')
      .then(response => response.json())
      .then((jsonData: AgricultureData[]) => {
        const maxMinProduction = jsonData.filter(entry => entry.Year.includes("2020"));
        const averageYieldAndArea = jsonData.filter(entry => entry.Year.includes("1950-2020"));
        setMaxMinProductionData(maxMinProduction);
        setAverageYieldAndAreaData(averageYieldAndArea);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Agriculture Data --- Data Analysis Task (v3)</h2>

      <h4>Max Min Production</h4>
      <div className="tablebox">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Crop Name</th>
              <th>Crop Production (Tonnes)</th>
              <th>Yield (Kg/Ha)</th>
              <th>Area Under Cultivation (Ha)</th>
            </tr>
          </thead>
          <tbody>
            {maxMinProductionData.map(({ Year, "Crop Name": crop, "Crop Production (UOM:t(Tonnes))": production, "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": yieldValue, "Area Under Cultivation (UOM:Ha(Hectares))": area }) => (
              <tr key={`${Year}-${crop}`}>
                <td>{Year}</td>
                <td>{crop}</td>
                <td>{production}</td>
                <td>{yieldValue}</td>
                <td>{area}</td>
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
              <th>Crop Name</th>
              <th>Average Yield (Kg/Ha)</th>
              <th>Average Area (Ha)</th>
            </tr>
          </thead>
          <tbody>
            {averageYieldAndAreaData.map(({ "Crop Name": crop, "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": averageYield, "Area Under Cultivation (UOM:Ha(Hectares))": averageArea }) => (
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



