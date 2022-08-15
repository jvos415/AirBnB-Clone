import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeListing } from "../../../store/listings";

function CreateListingForm({ user, setShowCreateListingModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const updated_at = new Date().toDateString();

  if (!user) {
    history.push(`/`);
  }

  const userId = user.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    // Setting error messages
    if (errors.length > 0) {
      let errorMsgs = errors.map((error) => {
        return error.split(":");
      });
      errorMsgs = errorMsgs.map((error) => {
        return error[1];
      });
      setErrorMessages(errorMsgs);

      // Parsing out error titles
      if (errors.length > 0) {
        let errorTitles = errors.map((error) => {
          return error.split(":");
        });
        errorTitles = errorTitles.map((error) => {
          return error[0];
        });

        // Clear all CSS errors styles on each submit
        let titleClassRemove = document.getElementById("title-error-box");
        titleClassRemove.classList.remove("input-field-error");
        let titleLabelClassRemove = document.getElementById(
          "title-label-create-listing"
        );
        titleLabelClassRemove.classList.remove("input-label-error");
        let descriptionClassRemove = document.getElementById(
          "description-error-box"
        );
        descriptionClassRemove.classList.remove("input-field-error");
        let descriptionLabelClassRemove = document.getElementById(
          "description-label-create-listing"
        );
        descriptionLabelClassRemove.classList.remove("input-label-error");
        let addressClassRemove = document.getElementById("address-error-box");
        addressClassRemove.classList.remove("input-field-error");
        let addressLabelClassRemove = document.getElementById(
          "address-label-create-listing"
        );
        addressLabelClassRemove.classList.remove("input-label-error");
        let cityClassRemove = document.getElementById("city-error-box");
        cityClassRemove.classList.remove("input-field-error");
        let cityLabelClassRemove = document.getElementById(
          "city-label-create-listing"
        );
        cityLabelClassRemove.classList.remove("input-label-error");
        let stateClassRemove = document.getElementById("state-error-box");
        stateClassRemove.classList.remove("input-field-error");
        let stateLabelClassRemove = document.getElementById(
          "state-label-create-listing"
        );
        stateLabelClassRemove.classList.remove("input-label-error");
        let countryClassRemove = document.getElementById("country-error-box");
        countryClassRemove.classList.remove("input-field-error");
        let countryLabelClassRemove = document.getElementById(
          "country-label-create-listing"
        );
        countryLabelClassRemove.classList.remove("input-label-error");
        let priceClassRemove = document.getElementById("price-error-box");
        priceClassRemove.classList.remove("input-field-error");
        let priceLabelClassRemove = document.getElementById(
          "price-label-create-listing"
        );
        priceLabelClassRemove.classList.remove("input-label-error");

        // Set and/or Reset error CSS styles
        for (const errorTitle of errorTitles) {
          if (errorTitle === "Title") {
            let titleClassAdd = document.getElementById("title-error-box");
            titleClassAdd.classList.add("input-field-error");
            let titleLabelClassAdd = document.getElementById(
              "title-label-create-listing"
            );
            titleLabelClassAdd.classList.add("input-label-error");
          } else if (errorTitle === "Description") {
            let descriptionClassAdd = document.getElementById(
              "description-error-box"
            );
            descriptionClassAdd.classList.add("input-field-error");
            let descriptionLabelClassAdd = document.getElementById(
              "description-label-create-listing"
            );
            descriptionLabelClassAdd.classList.add("input-label-error");
          } else if (errorTitle === "Address") {
            let addressClassAdd = document.getElementById("address-error-box");
            addressClassAdd.classList.add("input-field-error");
            let addressLabelClassAdd = document.getElementById(
              "address-label-create-listing"
            );
            addressLabelClassAdd.classList.add("input-label-error");
          } else if (errorTitle === "City") {
            let cityClassAdd = document.getElementById("city-error-box");
            cityClassAdd.classList.add("input-field-error");
            let cityLabelClassAdd = document.getElementById(
              "city-label-create-listing"
            );
            cityLabelClassAdd.classList.add("input-label-error");
          } else if (errorTitle === "State") {
            let stateClassAdd = document.getElementById("state-error-box");
            stateClassAdd.classList.add("input-field-error");
            let stateLabelClassAdd = document.getElementById(
              "state-label-create-listing"
            );
            stateLabelClassAdd.classList.add("input-label-error");
          } else if (errorTitle === "Country") {
            let countryClassAdd = document.getElementById("country-error-box");
            countryClassAdd.classList.add("input-field-error");
            let countryLabelClassAdd = document.getElementById(
              "country-label-create-listing"
            );
            countryLabelClassAdd.classList.add("input-label-error");
          } else if (errorTitle === "Price") {
            let priceClassAdd = document.getElementById("price-error-box");
            priceClassAdd.classList.add("input-field-error");
            let priceLabelClassAdd = document.getElementById(
              "price-label-create-listing"
            );
            priceLabelClassAdd.classList.add("input-label-error");
          }
        }
      }
    }
  }, [errors]);

  const submit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!userId) {
      setErrors(["You must be logged in to create a listing."]);
      return;
    }

    let listing = await dispatch(
      makeListing(
        userId,
        title,
        description,
        address,
        city,
        state,
        country,
        price,
        updated_at
      )
    );

    if (listing.id) {
      history.push(`listings/${listing.id}`);
      setShowCreateListingModal(false);
      return;
    }

    if (Array.isArray(listing)) {
      setErrors(listing);
    }
  };

  const cancelNewListing = () => {
    setShowCreateListingModal(false);
  };

  return (
    <main>
      <div>
        <form onSubmit={submit}>
          <div className="modal-top">
            <h3 className="modal-title">Create A Listing</h3>
            <button
              className="modal-cancel"
              onClick={cancelNewListing}
              type="button"
            >
              X
            </button>
          </div>
          <div>
            <div className="input-label">
              <label id="title-label-create-listing">Title (Required)</label>
            </div>
            <input
              id="title-error-box"
              className="input-field"
              placeholder="Title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <div className="input-label">
              <label id="description-label-create-listing">
                Description (Required)
              </label>
            </div>
            <textarea
              id="description-error-box"
              className="input-field"
              placeholder="Listing Description"
              rows="4"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <div className="input-label">
              <label id="address-label-create-listing">
                Address (Required)
              </label>
            </div>
            <input
              id="address-error-box"
              className="input-field"
              placeholder="Address"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <div className="input-label">
              <label id="city-label-create-listing">City (Required)</label>
            </div>
            <input
              id="city-error-box"
              className="input-field"
              placeholder="City"
              name="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <div className="input-label">
              <label id="state-label-create-listing">State (Required)</label>
            </div>
            <input
              id="state-error-box"
              className="input-field"
              placeholder="State"
              name="state"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div>
            <div className="input-label">
              <label id="country-label-create-listing">
                Country (Required)
              </label>
            </div>
            <input
              id="country-error-box"
              className="input-field"
              placeholder="Country"
              name="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <div className="input-label">
              <label id="price-label-create-listing">Price (Required)</label>
            </div>
            <input
              id="price-error-box"
              className="input-field"
              placeholder="Price"
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
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
              id="create-listing-button"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateListingForm;
