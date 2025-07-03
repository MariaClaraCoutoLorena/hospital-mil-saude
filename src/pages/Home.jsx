import { useEffect, useState } from 'react';
import { database } from '../config/firebase-config';
import { getDocs, collection } from 'firebase/firestore';

function Home() {
  const [medicos, setMedicos] = useState([]); // ✅ Fixed: initialized as an array

  const dbRef = collection(database, 'medicos');

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
      <h1>Hospital Mil Saude</h1>

      <div>
        {medicos.map((medico) => (
          <div key={medico.id}>
            <h1>{medico.nome}</h1>
            <h2>{medico.especialidade}</h2>
          <div>
              <p>{medico.email}</p>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}

export default Home;
