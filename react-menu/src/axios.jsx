import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

// JAVÍTVA: A localhost helyett a te éles PHP backendedhez csatlakozunk!
const API_URL = 'api.php';

function AxiosCrudApp() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setCategories(response.data);
        } catch (err) {
            console.error("Hiba az adatok lekérésekor:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCategories(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (categoryName.trim() === "") { alert("A kategória neve nem lehet üres!"); return; }
        try {
            if (editId !== null) {
                // JAVÍTVA: A te PHP-d a body-ból várja az ID-t!
                await axios.put(API_URL, { id: editId, nev: categoryName.trim() });
                setEditId(null);
            } else {
                await axios.post(API_URL, { nev: categoryName.trim() });
            }
            setCategoryName("");
            fetchCategories(); 
        } catch (err) { alert("Hiba a mentés során!"); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Biztosan törölni szeretnéd ezt a kategóriát?")) return;
        try {
            // JAVÍTVA: A te PHP-d az URL paraméterből várja az ID-t törlésnél!
            await axios.delete(`${API_URL}?id=${id}`);
            fetchCategories(); 
        } catch (err) { alert("Hiba a törlés során!"); }
    };

    const handleEdit = (category) => {
        setCategoryName(category.nev);
        setEditId(category.id);
    };

    return (
        <div className="crud-container">
            <h2>Kategóriák kezelése (React & Axios)</h2>
            <p style={{fontSize: '0.9em', color: '#7f8c8d'}}>Megjegyzés: Ez a modul REST API szerverrel kommunikál Axios segítségével.</p>
            {loading && <div className="loading">Adatok betöltése folyamatban...</div>}
            <form onSubmit={handleSubmit} className="form-group">
                <input type="text" placeholder="Kategória neve (pl. Desszert)" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} disabled={loading} />
                <button type="submit" className={editId !== null ? "btn-update" : "btn-add"} disabled={loading}>
                    {editId !== null ? "Mentés" : "Hozzáadás"}
                </button>
            </form>
            <table>
                <thead><tr><th>ID</th><th>Kategória Név</th><th>Műveletek</th></tr></thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td><td>{cat.nev}</td>
                            <td>
                                <button className="btn-edit" onClick={() => handleEdit(cat)}>Szerkesztés</button>
                                <button className="btn-delete" onClick={() => handleDelete(cat.id)}>Törlés</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AxiosCrudApp />);