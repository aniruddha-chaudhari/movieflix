import { fetchfromTMDB } from "../services/moviedbservice.js";

export async function getTrendingmovie(req, res) {
    try {
        const data = await fetchfromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        res.json({ success: true, content: randomMovie });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "internal error" });
    }
}

export async function getMovietrailers(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.json({ success: true, trailers: data });
    } catch (error) {
        if (error.response.status === 404) {
            res.status(404).json({ success: false, message: "Movie not found" });

        }

        res.status(500).json({ success: false, message: "internal error" });

    }
}

export async function getMoviedetails(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.json({ success: true, details: data });

    }
    catch (error) {
        if (error.response.status === 404) {
            res.status(404).json({ success: false, message: "Movie not found" });

        }

        res.status(500).json({ success: false, message: "internal error" });

    }

}

export async function getSimilarMovies(req, res) {
const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.json({ success: true, similar: data.results });
        console.log(data);
    }
    catch (error) {

        res.status(500).json({ success: false, message: "internal error" });

    }

}

export async function getMoviesbyCategory(req, res) {    
    const { category } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.json({ success: true, content: data.results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "internal error" });
    }
}