import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeBooking } from "../../../store/bookings";

function CreateBookingForm({ listing }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const listingId = listing.id;
  const userId = listing.user_id;
  const updated_at = new Date().toDateString();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guestNum, setGuestNum] = useState(1);
  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!userId) {
      setErrors(["You must be logged in to book a listing"]);
      return;
    }

    let booking = await dispatch(
      makeBooking(userId, listingId, startDate, endDate, guestNum, updated_at)
    );

    if (booking.id) {
      history.push(`/trips`);
      return;
    }

    if (Array.isArray(booking)) {
      setErrors(booking);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="start-date">CHECK-IN</label>
          <input name="start-date" type="date"></input>
        </div>
        <div>
          <label htmlFor="end-date">CHECKOUT</label>
          <input name="end-date" type="date"></input>
        </div>
        <div>
          <label htmlFor="guests">GUESTS</label>
          <select name="guests" type="range">
            <option value={1}>1 guest</option>
            <option value={2}>2 guests</option>
            <option value={3}>3 guests</option>
            <option value={4}>4 guests</option>
            <option value={5}>5 guests</option>
            <option value={6}>6 guests</option>
            <option value={7}>7 guests</option>
            <option value={8}>8 guests</option>
            <option value={9}>9 guests</option>
            <option value={10}>10 guests</option>
            <option value={11}>11 guests</option>
            <option value={12}>12 guests</option>
            <option value={13}>13 guests</option>
            <option value={14}>14 guests</option>
            <option value={15}>15 guests</option>
          </select>
        </div>
        <div className="error-container">
          {errorMessages.map((error, ind) => (
            <div className="errors" key={ind}>
              {error}
            </div>
          ))}
        </div>
        <div className="submit-flex">
          <button
            className="submit-button"
            id="create-booking-button"
            type="submit"
          >
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBookingForm;
