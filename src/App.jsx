import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { database } from './config/firebase-config';
import { getDocs, collection } from 'firebase/firestore';

function App() {
  const [medicos, setMedicos] = useState([]); // ✅ Fixed: initialized as an array

  const dbRef = collection(database, 'doctors');

  useEffect(() => {
    const getDoctors = async () => {
      const data = await getDocs(dbRef);
      const filter = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMedicos(filter); // ✅ Set state correctly
    };
    getDoctors();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div>
        {medicos.map((medico) => (
          <div key={medico.id}>
            <h1>{medico.name}</h1>
            <h2>{medico.especialidade}</h2>
          <div>
              <p>{medico.email}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <button onClick={() => console.log("Replace with real logic")}>
          count is 25
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
