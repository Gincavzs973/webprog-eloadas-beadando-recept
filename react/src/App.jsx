import { useState } from 'react';
import './App.css';

function App() {
  // 1. ÁLLAPOT (State) INICIALIZÁLÁSA: Itt a "memória", amiben a tesztadatokat tároljuk.
  const [kategoriak, setKategoriak] = useState([
    { id: 1, nev: 'krumpli' },
    { id: 2, nev: 'liszt' },
    { id: 3, nev: 'tojás' },
    { id: 4, nev: 'olaj' },
    { id: 5, nev: 'só' }
  ]);
  
  // Állapot az új kategória beviteli mezőjéhez
  const [ujNev, setUjNev] = useState('');

  // 2. CREATE (Hozzáadás logikája)
  const hozzaad = () => {
    if (ujNev.trim() === '') return; // Ne engedjük az üres beküldést
    // Új ID generálása (a legnagyobb jelenlegi ID + 1)
    const ujId = kategoriak.length > 0 ? Math.max(...kategoriak.map(k => k.id)) + 1 : 1;
    // Új tömb létrehozása a régi adatokkal és az új elemmel
    setKategoriak([...kategoriak, { id: ujId, nev: ujNev }]);
    setUjNev(''); // Mező ürítése
  };

  // 3. UPDATE (Szerkesztés logikája - a JS promptot használjuk az egyszerűség miatt)
  const szerkeszt = (id, jelenlegiNev) => {
    const ujKategoriaNev = prompt("Új név:", jelenlegiNev);
    if (ujKategoriaNev && ujKategoriaNev.trim() !== jelenlegiNev) {
      // Végigmegyünk a tömbön, és ha egyezik az ID, felülírjuk a nevet
      setKategoriak(kategoriak.map(k => k.id === id ? { ...k, nev: ujKategoriaNev } : k));
    }
  };

  // 4. DELETE (Törlés logikája)
  const torol = (id) => {
    if (window.confirm("Biztosan törlöd?")) {
      // Kiszűrjük azt az elemet, aminek az ID-ja egyezik a törlendővel
      setKategoriak(kategoriak.filter(k => k.id !== id));
    }
  };

  // 5. READ (Megjelenítés / Render)
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Kategóriák Kezelése (React Memória)</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={ujNev}
          onChange={(e) => setUjNev(e.target.value)}
          placeholder="Új kategória neve"
          style={{ padding: '5px', marginRight: '5px' }}
        />
        <button onClick={hozzaad} style={{ padding: '5px 10px', cursor: 'pointer' }}>
          Hozzáadás
        </button>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {kategoriak.map(kategoria => (
          <li key={kategoria.id} style={{ margin: '5px 0', padding: '10px', background: '#eee', display: 'flex', justifyContent: 'space-between', width: '300px' }}>
            <span>{kategoria.nev}</span>
            <div>
              <button onClick={() => szerkeszt(kategoria.id, kategoria.nev)} style={{ marginLeft: '5px', cursor: 'pointer' }}>Szerkeszt</button>
              <button onClick={() => torol(kategoria.id)} style={{ marginLeft: '5px', cursor: 'pointer' }}>Töröl</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;