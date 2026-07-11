import { useState, useEffect } from "react";
import api from "../../lib/api";
import './MyBookings.css';

const STATUS_CLASS = {
  Booked: "pending",
  CheckedIn: "confirmed",
  CheckedOut: "occupied",
  Cancelled: "cancelled",
};

export default function MyBookings() {
  const [bookingData, setBookingData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [bookingForm, setBookingForm] = useState({
    room: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    checkInDate: "",
    checkOutDate: "",
    status: "Booked",
  });

  const fetchBookings = async () => {
    try {
      const response = await api.get(`/booking/myBookings`);
      setBookingData(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setStatus({ type: "error", message: "Couldn't load your bookings." });
    }
  };

  const startEditing = (booking) => {
    setEditingId(booking._id || booking.id);
    setBookingForm({
      room: booking.room?._id || booking.room || "",
      customerName: booking.customerName || "",
      customerEmail: booking.customerEmail || "",
      customerPhone: booking.customerPhone || "",
      checkInDate: booking.checkInDate?.slice(0, 10) || "",
      checkOutDate: booking.checkOutDate?.slice(0, 10) || "",
      status: booking.status || "Booked",
    });
    setStatus({ type: "", message: "" });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setStatus({ type: "", message: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateBooking = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/booking/update/${editingId}`, bookingForm);
      setStatus({ type: "success", message: "Booking updated." });
      setEditingId(null);
      fetchBookings();
    } catch (error) {
      console.error("Failed to update booking:", error);
      setStatus({ type: "error", message: "Update failed. Try again." });
    }
  };

  const cancelBooking = async (id) => {
    try {
      await api.put(`/booking/${id}`, { status: "Cancelled" });
      fetchBookings();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      setStatus({ type: "error", message: "Couldn't cancel that booking." });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="my-bookings">
      <div className="my-bookings__orb" />
      <div className="my-bookings__inner">
        <div className="my-bookings__eyebrow">
          <span className="my-bookings__eyebrow-dot" />
          Your Stays
        </div>
        <h1 className="my-bookings__title">
          My <em>Bookings</em>
        </h1>

        <div className="my-bookings__layout">
          {editingId && (
            <div className="booking-form">
              <h2 className="booking-form__heading">Edit Booking</h2>
              <form onSubmit={updateBooking}>
                <div className="booking-form__field">
                  <label className="booking-form__label">Full Name</label>
                  <input
                    className="booking-form__input"
                    name="customerName"
                    value={bookingForm.customerName}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div className="booking-form__field">
                  <label className="booking-form__label">Email</label>
                  <input
                    className="booking-form__input"
                    type="email"
                    name="customerEmail"
                    value={bookingForm.customerEmail}
                    onChange={handleChange}
                    placeholder="jane@email.com"
                    required
                  />
                </div>

                <div className="booking-form__field">
                  <label className="booking-form__label">Phone</label>
                  <input
                    className="booking-form__input"
                    name="customerPhone"
                    value={bookingForm.customerPhone}
                    onChange={handleChange}
                    placeholder="+1 555 000 0000"
                    required
                  />
                </div>

                <div className="booking-form__field">
                  <label className="booking-form__label">Check-in</label>
                  <input
                    className="booking-form__input"
                    type="date"
                    name="checkInDate"
                    value={bookingForm.checkInDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="booking-form__field">
                  <label className="booking-form__label">Check-out</label>
                  <input
                    className="booking-form__input"
                    type="date"
                    name="checkOutDate"
                    value={bookingForm.checkOutDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="booking-form__field">
                  <label className="booking-form__label">Status</label>
                  <select
                    className="booking-form__select"
                    name="status"
                    value={bookingForm.status}
                    onChange={handleChange}
                  >
                    <option value="Booked">Booked</option>
                    <option value="CheckedIn">Checked In</option>
                    <option value="CheckedOut">Checked Out</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <button type="submit" className="booking-form__submit">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="booking-form__cancel"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>

                {status.message && (
                  <p
                    className={`booking-form__status booking-form__status--${status.type}`}
                  >
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          )}

          <div className="bookings-grid">
            {bookingData.length === 0 && (
              <div className="bookings-grid__empty">No bookings yet.</div>
            )}

            {bookingData.map((booking) => {
              const id = booking._id || booking.id;
              const statusValue = booking.status || "Booked";
              return (
                <div
                  key={id}
                  className={`booking-card ${
                    editingId === id ? "booking-card--editing" : ""
                  }`}
                >
                  <div className="booking-card__top">
                    <div className="booking-card__number">
                      {booking.room?.number || "—"}
                    </div>
                  </div>
                  <div className="booking-card__type">
                    {booking.room?.type || "Room"}
                  </div>
                  <div className="booking-card__rule" />

                  <div className="booking-card__dates">
                    {booking.checkInDate?.slice(0, 10)}
                    <span className="booking-card__dates-arrow">→</span>
                    {booking.checkOutDate?.slice(0, 10)}
                  </div>

                  <div className="booking-card__contact">
                    {booking.customerName}
                    <br />
                    {booking.customerEmail}
                    <br />
                    {booking.customerPhone}
                  </div>

                  <span
                    className={`booking-card__status booking-card__status--${
                      STATUS_CLASS[statusValue] || "pending"
                    }`}
                  >
                    {statusValue}
                  </span>

                  <div className="booking-card__actions">
                    <button
                      className="booking-card__action"
                      onClick={() => startEditing(booking)}
                    >
                      Edit
                    </button>
                    {statusValue !== "Cancelled" && (
                      <button
                        className="booking-card__action booking-card__action--danger"
                        onClick={() => cancelBooking(id)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}