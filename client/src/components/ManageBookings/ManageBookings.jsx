import { useEffect, useState } from "react";
import api from "../../lib/api";
import "./ManageBookings.css";

const initialFormState = {
  room: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  checkInDate: "",
  checkOutDate: "",
  status: "Booked",
};

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [bookingsForm, setBookingsForm] = useState(initialFormState);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get(`/booking/all`);
      setBookings(response.data);
    } catch (error) {
      console.error("Error while fetching bookings Data, ", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await api.get(`room/rooms`);
      setRooms(response.data);
    } catch (error) {
      console.error("Error while fetching rooms Data, ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingsForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...bookingsForm };

      if (editingId) {
        await api.put(`/booking/update/${editingId}`, payload);
      } else {
        await api.post(`/booking/createBooking`, payload);
      }
      setBookingsForm(initialFormState);
      setEditingId(null);
      fetchBookings();
    } catch (error) {
      console.error("Error While Creating or Updating Booking, ", error);
    }
  };

  const editBooking = (booking) => {
    setEditingId(booking._id);

    setBookingsForm({
      room: booking.room?._id || booking.room || "",
      customerName: booking.customerName || "",
      customerEmail: booking.customerEmail || "",
      customerPhone: booking.customerPhone || "",
      checkInDate: booking.checkInDate
        ? booking.checkInDate.slice(0, 10)
        : "",
      checkOutDate: booking.checkOutDate
        ? booking.checkOutDate.slice(0, 10)
        : "",
      status: booking.status || "Booked",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setBookingsForm(initialFormState);
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/booking/delete/${id}`);
      fetchBookings();
    } catch (error) {
      console.error("Error while deleting booking, ", error);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const roomLabel = (room) => {
    if (!room) return "Unassigned";
    if (typeof room === "object") {
      return `#${room.roomNumber}${
        room.roomName ? ` — ${room.roomName}` : ""
      }`;
    }
    const match = rooms.find((r) => r._id === room);
    return match
      ? `#${match.roomNumber}${match.roomName ? ` — ${match.roomName}` : ""}`
      : "Unknown room";
  };

  return (
    <div className="bookings-admin">
      <div className="bookings-admin__orb" />

      <div className="bookings-admin__inner">
        <div className="bookings-admin__eyebrow">
          <span className="bookings-admin__eyebrow-dot" />
          Reservations
        </div>

        <h1 className="bookings-admin__title">
          Guest <em>Ledger</em>
        </h1>

        <div className="bookings-admin__layout">
          <form className="bookings-form" onSubmit={handleSubmit}>
            <h2 className="bookings-form__heading">
              {editingId ? "Update Booking" : "Create Booking"}
            </h2>

            <div className="bookings-form__field">
              <label className="bookings-form__label" htmlFor="room">
                Room
              </label>
              <select
                id="room"
                className="bookings-form__select"
                name="room"
                value={bookingsForm.room}
                onChange={handleChange}
              >
                <option value="">Select a room</option>
                {rooms.map((room) => (
                  <option key={room._id} value={room._id}>
                    #{room.roomNumber} — {room.roomName || room.roomType}
                  </option>
                ))}
              </select>
            </div>

            <div className="bookings-form__field">
              <label className="bookings-form__label" htmlFor="customerName">
                Customer Name
              </label>
              <input
                id="customerName"
                className="bookings-form__input"
                type="text"
                name="customerName"
                placeholder="e.g. Amina Raza"
                value={bookingsForm.customerName}
                onChange={handleChange}
              />
            </div>

            <div className="bookings-form__field">
              <label
                className="bookings-form__label"
                htmlFor="customerEmail"
              >
                Customer Email
              </label>
              <input
                id="customerEmail"
                className="bookings-form__input"
                type="email"
                name="customerEmail"
                placeholder="e.g. amina@example.com"
                value={bookingsForm.customerEmail}
                onChange={handleChange}
              />
            </div>

            <div className="bookings-form__field">
              <label
                className="bookings-form__label"
                htmlFor="customerPhone"
              >
                Customer Phone
              </label>
              <input
                id="customerPhone"
                className="bookings-form__input"
                type="text"
                name="customerPhone"
                placeholder="e.g. 0300 1234567"
                value={bookingsForm.customerPhone}
                onChange={handleChange}
              />
            </div>

            <div className="bookings-form__field bookings-form__field--split">
              <div>
                <label
                  className="bookings-form__label"
                  htmlFor="checkInDate"
                >
                  Check-in
                </label>
                <input
                  id="checkInDate"
                  className="bookings-form__input"
                  type="date"
                  name="checkInDate"
                  value={bookingsForm.checkInDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="bookings-form__label"
                  htmlFor="checkOutDate"
                >
                  Check-out
                </label>
                <input
                  id="checkOutDate"
                  className="bookings-form__input"
                  type="date"
                  name="checkOutDate"
                  value={bookingsForm.checkOutDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="bookings-form__field">
              <label className="bookings-form__label" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                className="bookings-form__select"
                name="status"
                value={bookingsForm.status}
                onChange={handleChange}
              >
                <option value="Booked">Booked</option>
                <option value="CheckedIn">Checked In</option>
                <option value="CheckedOut">Checked Out</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button type="submit" className="bookings-form__submit">
              {editingId ? "Update Booking" : "Create Booking"}
            </button>

            {editingId && (
              <button
                type="button"
                className="bookings-form__cancel"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </form>

          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking._id}>
                <div className="booking-card__header">
                  <div className="booking-card__guest">
                    {booking.customerName}
                  </div>
                  <div
                    className={`booking-card__status booking-card__status--${booking.status}`}
                  >
                    {booking.status}
                  </div>
                </div>

                <div className="booking-card__room">
                  {roomLabel(booking.room)}
                </div>

                <div className="booking-card__rule" />

                <div className="booking-card__dates">
                  <span>{formatDate(booking.checkInDate)}</span>
                  <span className="booking-card__dates-arrow">→</span>
                  <span>{formatDate(booking.checkOutDate)}</span>
                </div>

                <div className="booking-card__contact">
                  {booking.customerEmail && (
                    <div>{booking.customerEmail}</div>
                  )}
                  {booking.customerPhone && (
                    <div>{booking.customerPhone}</div>
                  )}
                </div>

                <div className="booking-card__actions">
                  <button
                    className="booking-card__action"
                    onClick={() => editBooking(booking)}
                  >
                    Edit
                  </button>
                  <button
                    className="booking-card__action booking-card__action--danger"
                    onClick={() => deleteBooking(booking._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}