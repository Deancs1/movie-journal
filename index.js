const apiKey = "3f6b049e861ccde82e9b1542a2e96169";
const baseUrl = "https://api.themoviedb.org/3";
const bearerToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjZiMDQ5ZTg2MWNjZGU4MmU5YjE1NDJhMmU5NjE2OSIsIm5iZiI6MTcyMTIxNjUxNy43MzY3NTUsInN1YiI6IjY2OTdhOWM2ZTdhYWMzZjJiMDdhODRiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fTpKTeLFa8VCzqwHVDieNfZlSlWLIqY9zy6MU5mL1-Y";

const imageBaseUrl = "https://image.tmdb.org/t/p/w200";

async function fetchAuthenticatedData(numMovies, targetElementId) {
  const url = `${baseUrl}/movie/popular`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: bearerToken,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }

    const data = await response.json();

    // Select the target element by ID
    const targetElement = document.getElementById(targetElementId);

    // Clear existing content
    targetElement.innerHTML = "";

    // Iterate over the movies and create movie cards based on numMovies parameter
    for (let i = 0; i < Math.min(data.results.length, numMovies); i++) {
      const movie = data.results[i];
      const movieCard = document.createElement("div");

      movieCard.classList.add(
        "max-w-sm",
        "bg-gray-300",
        "border",
        "border-gray-200",
        "rounded-lg",
        "shadow",
        "dark:bg-gray-800",
        "dark:border-gray-700"
      );

      movieCard.innerHTML = `
            <div class="relative">
              <img src="${imageBaseUrl}${movie.poster_path}" alt="${movie.title}" class="rounded-t-lg w-full h-full p-2" />
              <button class="absolute top-2 right-2 bg-red-500 rounded-full p-2" onclick="toggleHeart(this)">
                <svg class="w-6 h-6 text-white heart-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            </div>
            <div class="p-5">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${movie.title}</h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${movie.overview}</p>
            </div>
          `;

      // Append the movie card to the target element
      targetElement.appendChild(movieCard);
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
    // Handle error scenario, if needed
  }
}

// Fetch popular movies and top rated movies
fetchAuthenticatedData(8, "movies");
fetchAuthenticatedData(4, "topRatedMovies");

// Function to toggle heart icon
function toggleHeart(button) {
  const heartIcon = button.querySelector(".heart-icon");
  heartIcon.classList.toggle("text-white");
  heartIcon.classList.toggle("text-secondary");
}
