import { useEffect, useState } from "react";
import api from "../../lib/api";
import LoginModal from "../Auth/Login/LognModal";
import "./Booking.css";

export default function Booking() {
  const [rooms, setRooms] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const [bookingForm, setBookingForm] = useState({
    room: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const fetchRooms = async () => {
    try {
      const response = await api.get("/room/rooms");
      setRooms(response.data.filter((room) => room.roomIsAvailable));
    } catch (error) {
      console.error("Error While Fetching Rooms, ", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setSubmitting(true);
    try {
      await api.get("/protected/protected-route");

      await api.post("/booking/createBooking", bookingForm);

      setBookingForm({
        room: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        checkInDate: "",
        checkOutDate: "",
      });
      setStatus({ type: "success", message: "Room booked successfully." });
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setShowLogin(true);
      } else {
        console.error("Error While Booking, ", error);
        setStatus({
          type: "error",
          message: "Something went wrong while booking. Please try again.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const selectedRoom = rooms.find((room) => room._id === bookingForm.room);

  return (
    <div className="rooms-admin">
      <div className="rooms-admin__orb" />

      <div className="rooms-admin__inner">
        <div className="rooms-admin__eyebrow">
          <span className="rooms-admin__eyebrow-dot" />
          Reservations
        </div>

        <h1 className="rooms-admin__title">
          Book Your <em>Stay</em>
        </h1>

        <div className="rooms-admin__layout">
          {/* ── Booking form ─────────────────────── */}
          <form className="rooms-form" onSubmit={handleSubmit}>
            <h2 className="rooms-form__heading">Reservation Details</h2>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="room">
                Room
              </label>
              <select
                id="room"
                name="room"
                className="rooms-form__select"
                value={bookingForm.room}
                onChange={handleChange}
              >
                <option value="">Select Room</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    #{room.roomNumber} — {room.roomName} (${room.roomPrice}/night)
                  </option>
                ))}
              </select>
            </div>

            {/* ── Selected room summary ────────────── */}
            {selectedRoom && (
              <div className="booking-summary">
                {selectedRoom.roomImage && (
                  <img
                    src={selectedRoom.roomImage}
                    alt={selectedRoom.roomName}
                    className="booking-summary__image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <div className="booking-summary__name">{selectedRoom.roomName}</div>
                <div className="booking-summary__meta">
                  {selectedRoom.bedType} bed · {selectedRoom.view} view · Sleeps{" "}
                  {selectedRoom.maxOccupancy}
                </div>
                <div className="booking-summary__price">
                  ${selectedRoom.roomPrice}
                  <span>/ night</span>
                </div>
              </div>
            )}

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="customerName">
                Full Name
              </label>
              <input
                id="customerName"
                className="rooms-form__input"
                name="customerName"
                placeholder="Jane Doe"
                value={bookingForm.customerName}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="customerEmail">
                Email
              </label>
              <input
                id="customerEmail"
                className="rooms-form__input"
                name="customerEmail"
                type="email"
                placeholder="jane@example.com"
                value={bookingForm.customerEmail}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="customerPhone">
                Phone
              </label>
              <input
                id="customerPhone"
                className="rooms-form__input"
                name="customerPhone"
                placeholder="+1 (555) 000-0000"
                value={bookingForm.customerPhone}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="checkInDate">
                Check-in
              </label>
              <input
                id="checkInDate"
                className="rooms-form__input"
                type="date"
                name="checkInDate"
                value={bookingForm.checkInDate}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="checkOutDate">
                Check-out
              </label>
              <input
                id="checkOutDate"
                className="rooms-form__input"
                type="date"
                name="checkOutDate"
                value={bookingForm.checkOutDate}
                onChange={handleChange}
              />
            </div>

            <button className="rooms-form__submit" type="submit" disabled={submitting}>
              {submitting ? "Booking…" : "Book Room"}
            </button>

            {status.message && (
              <p
                className={
                  status.type === "success"
                    ? "rooms-form__status rooms-form__status--success"
                    : "rooms-form__status rooms-form__status--error"
                }
              >
                {status.message}
              </p>
            )}
          </form>

          {/* ── Available rooms grid ─────────────── */}
          <div className="rooms-grid">
            {rooms.length === 0 && (
              <p className="rooms-grid__empty">No rooms available right now.</p>
            )}

            {rooms.map((room) => (
              <div
                key={room._id}
                className={`room-card ${
                  bookingForm.room === room._id ? "room-card--selected" : ""
                }`}
                onClick={() =>
                  setBookingForm((prev) => ({ ...prev, room: room._id }))
                }
              >
                {room.roomImage && (
                  <img
                    src={room.roomImage}
                    alt={room.roomName}
                    className="room-card__image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}

                <div className="room-card__number">
                  #{room.roomNumber} — {room.roomName}
                </div>
                <div className="room-card__type">
                  {room.roomType} · {room.bedType} bed · {room.view} view
                </div>
                <div className="room-card__rule" />

                <div className="room-card__meta">
                  Sleeps {room.maxOccupancy} · {room.roomSize} sq ft
                </div>

                <div className="room-card__amenities">
                  {room.wifi && <span className="room-card__amenity">WiFi</span>}
                  {room.airConditioning && (
                    <span className="room-card__amenity">AC</span>
                  )}
                  {room.breakfastIncluded && (
                    <span className="room-card__amenity">Breakfast</span>
                  )}
                  {room.parkingIncluded && (
                    <span className="room-card__amenity">Parking</span>
                  )}
                  {room.balcony && <span className="room-card__amenity">Balcony</span>}
                  {room.workspace && (
                    <span className="room-card__amenity">Workspace</span>
                  )}
                </div>

                {room.tags?.length > 0 && (
                  <div className="room-card__tags">
                    {room.tags.map((tag) => (
                      <span key={tag} className="room-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {room.roomPrice && (
                  <div className="room-card__price">
                    ${room.roomPrice}
                    <span>/ night</span>
                  </div>
                )}

                <span className="room-card__status room-card__status--available">
                  Available
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
    </div>
  );
}