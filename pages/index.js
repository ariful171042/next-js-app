import { useRef, useState } from "react";
import useSWR from "swr";
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new error("Movies not fetched.");
  return res.json();
};
const Movies = () => {
  const [movie, setMovie] = useState("");
  const [rating, setRating] = useState("");
  const movieRef = useRef(null);
  const ratingRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const movieObj = {
      id: Date.now(),
      title: movie,
      rating: rating,
    };

    const res = await fetch("/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieObj),
    });
    const json = await res.json();

    //field clear
    e.target.querySelector("#mov").value = "";
    e.target.querySelector("#rat").value = "";
  };

  const { data, error, isValidating } = useSWR("/api/", fetcher);

  const isLoading = !data && !error && isValidating;

  if (isLoading) return <h2>Loading</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div>
      <h2>Movies</h2>
      <h2>Submit new Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          ref={movieRef}
          id="mov"
          type="text"
          placeholder="Write a movie name"
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
        />
        <input
          ref={ratingRef}
          id="rat"
          type="text"
          placeholder="Write a movie rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button type="submit">Submit Movie</button>
      </form>

      {data.map((mv) => (
        <div key={mv.id}>
          <h3>
            {mv.title}-{mv.rating}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Movies;
