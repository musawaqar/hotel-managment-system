import { useEffect, useState } from "react";
import api from "../../lib/api";
import "./ManageRooms.css";

const initialFormState = {
  roomNumber: "",
  roomName: "",
  roomImage: "",
  roomType: "single",
  roomPrice: "",
  roomIsAvailable: true,
  maxOccupancy: "",
  bedType: "queen",
  roomSize: "",
  view: "city",
  wifi: true,
  airConditioning: true,
  breakfastIncluded: false,
  parkingIncluded: false,
  balcony: false,
  workspace: false,
  tags: "",
  description: "",
};

export default function ManageRooms() {
  const [rooms, setRooms] = useState([]);

  const [roomsForm, setRoomsForm] = useState(initialFormState);

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
      // Convert comma-separated tags string into an array before sending
      const payload = {
        ...roomsForm,
        tags: roomsForm.tags
          ? roomsForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          : [],
      };

      if (editingId) {
        await api.put(`/room/update/${editingId}`, payload);
      } else {
        await api.post(`/room/createRoom`, payload);
      }
      setRoomsForm(initialFormState);
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
      roomName: room.roomName || "",
      roomImage: room.roomImage || "",
      roomType: room.roomType,
      roomPrice: room.roomPrice,
      roomIsAvailable: room.roomIsAvailable,
      maxOccupancy: room.maxOccupancy || "",
      bedType: room.bedType || "queen",
      roomSize: room.roomSize || "",
      view: room.view || "city",
      wifi: room.wifi ?? true,
      airConditioning: room.airConditioning ?? true,
      breakfastIncluded: room.breakfastIncluded ?? false,
      parkingIncluded: room.parkingIncluded ?? false,
      balcony: room.balcony ?? false,
      workspace: room.workspace ?? false,
      tags: Array.isArray(room.tags) ? room.tags.join(", ") : "",
      description: room.description || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setRoomsForm(initialFormState);
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
              <label className="rooms-form__label" htmlFor="roomName">
                Room Name
              </label>
              <input
                id="roomName"
                className="rooms-form__input"
                type="text"
                name="roomName"
                placeholder="e.g. Ocean Deluxe Suite"
                value={roomsForm.roomName}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="roomImage">
                Image Path (from public folder)
              </label>
              <input
                id="roomImage"
                className="rooms-form__input"
                type="text"
                name="roomImage"
                placeholder="/rooms/deluxe1.jpg"
                value={roomsForm.roomImage}
                onChange={handleChange}
              />
              {roomsForm.roomImage && (
                <img
                  src={roomsForm.roomImage}
                  alt="Room preview"
                  className="rooms-form__image-preview"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.target.style.display = "block";
                  }}
                />
              )}
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
                <option value="family">Family</option>
                <option value="deluxe">Deluxe</option>
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
              <label className="rooms-form__label" htmlFor="maxOccupancy">
                Max Occupancy
              </label>
              <input
                id="maxOccupancy"
                className="rooms-form__input"
                type="number"
                name="maxOccupancy"
                placeholder="e.g. 2"
                min="1"
                value={roomsForm.maxOccupancy}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="bedType">
                Bed Type
              </label>
              <select
                id="bedType"
                className="rooms-form__select"
                name="bedType"
                value={roomsForm.bedType}
                onChange={handleChange}
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="queen">Queen</option>
                <option value="king">King</option>
              </select>
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="roomSize">
                Room Size (sq ft)
              </label>
              <input
                id="roomSize"
                className="rooms-form__input"
                type="number"
                name="roomSize"
                placeholder="e.g. 350"
                value={roomsForm.roomSize}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="view">
                View
              </label>
              <select
                id="view"
                className="rooms-form__select"
                name="view"
                value={roomsForm.view}
                onChange={handleChange}
              >
                <option value="city">City</option>
                <option value="garden">Garden</option>
                <option value="pool">Pool</option>
                <option value="sea">Sea</option>
                <option value="mountain">Mountain</option>
              </select>
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="tags">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                className="rooms-form__input"
                type="text"
                name="tags"
                placeholder="e.g. honeymoon, pet-friendly, top-floor"
                value={roomsForm.tags}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__field">
              <label className="rooms-form__label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className="rooms-form__input"
                name="description"
                rows={3}
                placeholder="Short description of the room"
                value={roomsForm.description}
                onChange={handleChange}
              />
            </div>

            <div className="rooms-form__amenities">
              <label className="rooms-form__check">
                <input
                  type="checkbox"
                  name="roomIsAvailable"
                  checked={roomsForm.roomIsAvailable}
                  onChange={handleChange}
                />
                Available
              </label>

              <label className="rooms-form__check">
                <input
                  type="checkbox"
                  name="wifi"
                  checked={roomsForm.wifi}
                  onChange={handleChange}
                />
                WiFi
              </label>

              <label className="rooms-form__check">
                <input
                  type="checkbox"
                  name="airConditioning"
                  checked={roomsForm.airConditioning}
                  onChange={handleChange}
                />
                Air Conditioning
              </label>

              <label className="rooms-form__check">
                <input
                  type="checkbox"
                  name="breakfastIncluded"
                  checked={roomsForm.breakfastIncluded}
                  onChange={handleChange}
                />
                Breakfast Included
              </label>

              <label className="rooms-form__check">
                <input
                  type="checkbox"
                  name="parkingIncluded"
                  checked={roomsForm.parkingIncluded}
                  onChange={handleChange}
                />
                Parking Included
              </label>

              <label className="rooms-form__check">
                <input
                  type="checkbox"
                  name="balcony"
                  checked={roomsForm.balcony}
                  onChange={handleChange}
                />
                Balcony
              </label>

              <label className="rooms-form__check">
                <input
                  type="checkbox"
                  name="workspace"
                  checked={roomsForm.workspace}
                  onChange={handleChange}
                />
                Workspace
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
                {room.roomImage && (
                  <img
                    src={room.roomImage}
                    alt={room.roomName}
                    className="room-card__image"
                  />
                )}
                <div className="room-card__number">
                  #{room.roomNumber} — {room.roomName}
                </div>
                <div className="room-card__type">
                  {room.roomType} · {room.bedType} bed · {room.view} view
                </div>
                <div className="room-card__rule" />

                <div className="room-card__price">
                  ${room.roomPrice}
                  <span>/ night</span>
                </div>

                <div className="room-card__meta">
                  Sleeps {room.maxOccupancy} · {room.roomSize} sq ft
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