import { useEffect, useState } from "react";
import api from "../../lib/api";
import "./ManageRooms.css";

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);

  const [roomsForm, setRoomsForm] = useState({
    roomNumber: "",
    roomType: "single",
    roomPrice: "",
    roomIsAvailable: true,
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.get(`room/rooms`);
      setRooms(response.data);
    } catch (error) {
      console.error("Error while fetching rooms Data, ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setRoomsForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/room/update/${editingId}`, roomsForm);
      } else {
        await api.post(`/room/createRoom`, roomsForm);
      }
      setRoomsForm({
        roomNumber: "",
        roomType: "single",
        roomPrice: "",
        roomIsAvailable: true,
      });
      setEditingId(null);
      fetchRooms();
    } catch (error) {
      console.error("Error While Creating or Updating Room, ", error);
    }
  };

  const editRoom = (room) => {
    setEditingId(room._id);

    setRoomsForm({
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      roomPrice: room.roomPrice,
      roomIsAvailable: room.roomIsAvailable,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setRoomsForm({
      roomNumber: "",
      roomType: "single",
      roomPrice: "",
      roomIsAvailable: true,
    });
  };

  const deleteRoom = async (id) => {
    try {
      await api.delete(`/room/delete/${id}`);
      fetchRooms();
    } catch (error) {
      console.error("Error while deleting room, ", error);
    }
  };

  return (
    <div className="rooms-admin">
      <div className="rooms-admin__orb" />

      <div className="rooms-admin__inner">
        <div className="rooms-admin__eyebrow">
          <span className="rooms-admin__eyebrow-dot" />
          Front Desk
        </div>

        <h1 className="rooms-admin__title">
          Room <em>Inventory</em>
        </h1>

        <div className="rooms-admin__layout">
          <form className="rooms-form" onSubmit={handleSubmit}>
            <h2 className="rooms-form__heading">
              {editingId ? "Update Room" : "Create Room"}
            </h2>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="roomNumber">
                Room Number
              </label>
              <input
                id="roomNumber"
                className="rooms-form__input"
                type="number"
                name="roomNumber"
                placeholder="e.g. 204"
                value={roomsForm.roomNumber}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="roomType">
                Room Type
              </label>
              <select
                id="roomType"
                className="rooms-form__select"
                name="roomType"
                value={roomsForm.roomType}
                onChange={handleChange}
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="roomPrice">
                Price / Night
              </label>
              <input
                id="roomPrice"
                className="rooms-form__input"
                type="number"
                name="roomPrice"
                placeholder="e.g. 180"
                value={roomsForm.roomPrice}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__check">
                <input
                  type="checkbox"
                  name="roomIsAvailable"
                  checked={roomsForm.roomIsAvailable}
                  onChange={handleChange}
                />
                Available
              </label>
            </div>

            <button type="submit" className="rooms-form__submit">
              {editingId ? "Update Room" : "Create Room"}
            </button>

            {editingId && (
              <button
                type="button"
                className="rooms-form__cancel"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </form>

          <div className="rooms-grid">
            {rooms.map((room) => (
              <div className="room-card" key={room._id}>
                <div className="room-card__number">{room.roomNumber}</div>
                <div className="room-card__type">{room.roomType}</div>
                <div className="room-card__rule" />

                <div className="room-card__price">
                  ${room.roomPrice}
                  <span>/ night</span>
                </div>

                <div
                  className={
                    room.roomIsAvailable
                      ? "room-card__status room-card__status--available"
                      : "room-card__status room-card__status--occupied"
                  }
                >
                  {room.roomIsAvailable ? "Available" : "Occupied"}
                </div>

                <div className="room-card__actions">
                  <button
                    className="room-card__action"
                    onClick={() => editRoom(room)}
                  >
                    Edit
                  </button>
                  <button
                    className="room-card__action room-card__action--danger"
                    onClick={() => deleteRoom(room._id)}
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