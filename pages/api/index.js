import { movies } from "@/data/movies";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(movies);
  }

  if (req.method === "POST") {
    const movieObj = req.body;

    movies.push(movieObj);

    res.status(200).json(movieObj);
  }
}
