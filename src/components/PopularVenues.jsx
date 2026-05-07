

const popularPlaces = [
  "Admin",
  "Main Library",
  "Student Union",
  "Chemistry Building",
  "Maths",
  "Vet Science"
];

function PopularVenues({ onVenueClick }) {
  return (
    <div className="popular-venues">
      <h3>Popular Venues</h3>

      {popularPlaces.map((place) => (
        <button
          key={place}
          className="venue-btn"
          onClick={() => onVenueClick(place)}
        >
          {place}
        </button>
      ))}
    </div>
  );
}

export default PopularVenues;