import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Bookstore</h1>
            </header>
            <main>
                <div className="book-list">
                    <h2>ТОП-50 деловой литературы</h2>
                    <ul>
                        {books.map((book, index) => (
                            <li key={index}>
                                <img src={book.img} alt={book.info} />
                                <h3>{book.price}</h3>
                                <p>{book.info}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default App;