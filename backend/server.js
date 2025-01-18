
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

let songs = [
    { id: 1, title: "Swans - Blood Promise (Live)", url: "https://youtu.be/XEpgmWCpmgs" },
    { id: 2, title: "Godspeed You! Black Emperor - Sleep", url: "https://youtu.be/7EGTD7azzWk" },
    { id: 3, title: "Duster - Capsule Losing Contact", url: "https://youtu.be/tN19CxHm1Yc" },
    { id: 4, title: "Current 93 - The Bloodbells Chime", url: "https://youtu.be/3e6D4mqpx9s" },
    { id: 5, title: "Slint - Washer", url: "https://youtu.be/6yEgcb167k4" },
    { id: 6, title: "Agalloch - Our Fortress Is Burning... II - Bloodbirds", url: "https://youtu.be/ikPNLmhHs0o" },
    { id: 7, title: "Hana - Shuumatsu no Bishou", url: "https://youtu.be/zCjxVXX-YLE" }
];

// Pobieranie listy utworów
app.get('/songs', (req, res) => {
    res.json(songs);
});

// Dodawanie nowego utworu
app.post('/songs', (req, res) => {
    const { title, url } = req.body;

    if (!title || !url) {
        return res.status(400).json({ message: "Title and URL are required." });
    }

    const newSong = {
        id: songs.length ? songs[songs.length - 1].id + 1 : 1,
        title,
        url,
    };

    songs.push(newSong);
    res.status(201).json(newSong);
});

// Usuwanie utworu
app.delete('/songs/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const songIndex = songs.findIndex((song) => song.id === id);
    if (songIndex === -1) {
        return res.status(404).json({ message: "Song not found." });
    }

    songs.splice(songIndex, 1);
    res.status(204).send();
});

// Uruchomienie serwera
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
