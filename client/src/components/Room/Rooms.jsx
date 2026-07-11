import { useEffect, useState } from "react";
import api from "../../lib/api";
import "./Rooms.css";
import { useNavigate } from "react-router-dom";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [typeFilter, setTypeFilter] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const navigate = useNavigate();
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await api.get(`room/rooms`);
      setRooms(response.data);
    } catch (error) {
      console.error("Error while fetching rooms Data, ", error);
      setError("Unable to load rooms right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const moveToBooking = (roomId) => {
    navigate(`/booking/${encodeURIComponent(roomId)}`)
  }

  const filteredRooms = rooms
    .filter((room) => (typeFilter === "all" ? true : room.roomType === typeFilter))
    .filter((room) => (availableOnly ? room.roomIsAvailable : true))
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.roomPrice - b.roomPrice;
      if (sortBy === "priceHigh") return b.roomPrice - a.roomPrice;
      return 0;
    });



  return (
    <div className="rooms-browse">
      <div className="rooms-browse__orb" />

      <div className="rooms-browse__inner">
        <div className="rooms-browse__eyebrow">
          <span className="rooms-browse__eyebrow-dot" />
          Stay With Us
        </div>

        <h1 className="rooms-browse__title">
          Explore Our <em>Rooms</em>
        </h1>

        <div className="rooms-browse__filters">
          <div className="rooms-browse__filter">
            <label htmlFor="typeFilter">Room Type</label>
            <select
              id="typeFilter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
              <option value="family">Family</option>
              <option value="deluxe">Deluxe</option>
            </select>
          </div>

          <div className="rooms-browse__filter">
            <label htmlFor="sortBy">Sort By</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>

          <label className="rooms-browse__check">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
            />
            Available only
          </label>
        </div>

        {loading && <div className="rooms-browse__status">Loading rooms...</div>}

        {error && <div className="rooms-browse__status rooms-browse__status--error">{error}</div>}

        {!loading && !error && filteredRooms.length === 0 && (
          <div className="rooms-browse__status">No rooms match your filters.</div>
        )}

        {!loading && !error && filteredRooms.length > 0 && (
          <div className="rooms-browse-grid">
            {filteredRooms.map((room) => (
              <div className="room-view-card" key={room._id}>
                <div className="room-view-card__image-wrap">
                  {room.roomImage ? (
                    <img
                      src={room.roomImage}
                      alt={room.roomName}
                      className="room-view-card__image"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="room-view-card__image-placeholder">No Image</div>
                  )}

                  <div
                    className={
                      room.roomIsAvailable
                        ? "room-view-card__badge room-view-card__badge--available"
                        : "room-view-card__badge room-view-card__badge--occupied"
                    }
                  >
                    {room.roomIsAvailable ? "Available" : "Occupied"}
                  </div>
                </div>

                <div className="room-view-card__body">
                  <div className="room-view-card__top">
                    <h3 className="room-view-card__name">{room.roomName}</h3>
                    <span className="room-view-card__number">#{room.roomNumber}</span>
                  </div>

                  <div className="room-view-card__type">
                    {room.roomType} · {room.bedType} bed · {room.view} view
                  </div>

                  {room.description && (
                    <p className="room-view-card__description">{room.description}</p>
                  )}

                  <div className="room-view-card__facts">
                    <span>Sleeps {room.maxOccupancy}</span>
                    <span>{room.roomSize} sq ft</span>
                  </div>

                  <div className="room-view-card__amenities">
                    {room.wifi && <span className="room-view-card__amenity">WiFi</span>}
                    {room.airConditioning && (
                      <span className="room-view-card__amenity">AC</span>
                    )}
                    {room.breakfastIncluded && (
                      <span className="room-view-card__amenity">Breakfast</span>
                    )}
                    {room.parkingIncluded && (
                      <span className="room-view-card__amenity">Parking</span>
                    )}
                    {room.balcony && (
                      <span className="room-view-card__amenity">Balcony</span>
                    )}
                    {room.workspace && (
                      <span className="room-view-card__amenity">Workspace</span>
                    )}
                  </div>

                  {room.tags?.length > 0 && (
                    <div className="room-view-card__tags">
                      {room.tags.map((tag) => (
                        <span key={tag} className="room-view-card__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="room-view-card__footer">
                    <div className="room-view-card__price">
                      ${room.roomPrice}
                      <span>/ night</span>
                    </div>
                    <button
                      className="room-view-card__book"
                      disabled={!room.roomIsAvailable}
                      onClick={() => moveToBooking(room._id)}
                    >
                      {room.roomIsAvailable ? "Book Now" : "Unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}