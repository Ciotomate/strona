import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/songs';

type Song = {
    id: number;
    title: string;
    url: string;
};

// Typ dla nowego utworu (bez `id`, bo jeszcze go nie ma)
type NewSong = Omit<Song, 'id'>;

function App() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [newSong, setNewSong] = useState<NewSong>({ title: '', url: '' });

    useEffect(() => {
        axios
            .get<Song[]>(API_URL) // Dodano typowanie danych z API
            .then((response) => setSongs(response.data))
            .catch((error) => console.error('Error fetching songs:', error));
    }, []);

    const handleAddSong = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!newSong.title || !newSong.url) {
            alert('Please fill in both fields!');
            return;
        }

        axios
            .post<Song>(API_URL, newSong) // Dodano typowanie danych odpowiedzi
            .then((response) => {
                setSongs([...songs, response.data]);
                setNewSong({ title: '', url: '' });
            })
            .catch((error) => console.error('Error adding song:', error));
    };

    const handleDeleteSong = (id: number) => {
        axios
            .delete(`${API_URL}/${id}`)
            .then(() => setSongs(songs.filter((song) => song.id !== id)))
            .catch((error) => console.error('Error deleting song:', error));
    };

    return (
        <div className="App">
            <h1>My Favorite Songs</h1>

            <form onSubmit={handleAddSong}>
                <input
                    type="text"
                    placeholder="Song title"
                    value={newSong.title}
                    onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Song URL"
                    value={newSong.url}
                    onChange={(e) => setNewSong({ ...newSong, url: e.target.value })}
                />
                <button type="submit">Add Song</button>
            </form>

            <ul>
                {songs.map((song) => (
                    <li key={song.id}>
                        <a href={song.url} target="_blank" rel="noopener noreferrer">
                            {song.title}
                        </a>
                        <button onClick={() => handleDeleteSong(song.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

