import { fetchfromTMDB } from "../services/moviedbservice.js";

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchfromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTv = data.results[Math.floor(Math.random() * data.results.length)];
        res.json({ success: true, content: randomTv });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "internal error" });
    }
}

export async function getTvtrailers(req, res) {
    const { id } = req.params;
    try {

        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({ success: true, trailers: data });
    } catch (error) {
        if (error.response.status === 404) {
            res.status(404).json({ success: false, message: "Tv not found" });

        }

        res.status(500).json({ success: false, message: "internal error" });

    }
}

export async function getTvdetails(req, res) {
    try {
        const { id } = req.params;
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.json({ success: true, details: data });

    }
    catch (error) {
        if (error.response.status === 404) {
            res.status(404).json({ success: false, message: "Tv not found" });

        }

        res.status(500).json({ success: false, message: "internal error" });

    }

}

export async function getSimilarTvs(req, res) {
const { id } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.json({ success: true, similar: data.results });
    }
    catch (error) {

        res.status(500).json({ success: false, message: "internal error" });

    }

}

export async function getTvsbyCategory(req, res) {    
    const { category } = req.params;
    try {
        const data = await fetchfromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.json({ success: true, content: data.results });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "internal error" });
    }
}