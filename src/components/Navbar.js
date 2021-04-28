import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <h1>The weather and movie app</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/search-movies">Sök film</Link>
                <Link to="/my-movies">Mitt filmbibliotek</Link>
            </div>
        </nav>
    )
}
