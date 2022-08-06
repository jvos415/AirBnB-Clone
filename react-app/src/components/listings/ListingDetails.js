import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { removeListing, retrieveListings } from "../../store/listings";
import { retrieveReviews } from "../../store/reviews";
import UpdateListingForm from "./forms/UpdateListingForm";
import ReviewCard from "../reviews/elements/ReviewCard";
import { Modal } from "../modal/modal";
import CreateReviewModal from "../reviews/elements/CreateReviewModal";
import CreateImageModal from "../image_things/CreateImageModal";

function ListingDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const images = useSelector((state) => state.images)
  const user = useSelector((state) => state.session.user);
  const reviews = Object.values(useSelector((state) => state.reviews)).filter(
    (review) => review.listing_id === +listingId);

  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);
  const [showCreateImageModal, setShowCreateImageModal] = useState(false);
  const [userCheck, setUserCheck] = useState(false);

  useEffect(() => {
    dispatch(retrieveListings());
  }, [dispatch, reviews.length, images]);

  useEffect(() => {
    dispatch(retrieveReviews());
  }, [dispatch, reviews.length]);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (listing) {
      if (user.id === listing.user_id) {
        setShowUpdateButton(true);
        setShowDeleteButton(true);
        setUserCheck(true);
      }
    }
  }, [listing, user]);

  const updateListing = () => {
    setShowUpdateForm(true);
  };

  const deleteListing = () => {
    dispatch(removeListing(listingId));
    history.push(`/`);
  };

  const createReview = () => {
    setShowCreateReviewModal(true);
  };

  const createImage = () => {
    setShowCreateImageModal(true);
  };


  return (
    <main>
      {!showUpdateForm && (
        <div>
          {listing && (
            <div>
              <h1>{listing.title}</h1>
              <p>{listing.city}</p>
              <p>{listing.state}</p>
              <p>{listing.country}</p>
              {listing.images[0] && (
                <img src={listing.images[0].url} alt={listing.title} />
              )}
              {listing.images[1] && (
                <img src={listing.images[0].url} alt={listing.title} />
              )}
              {listing.images[2] && (
                <img src={listing.images[0].url} alt={listing.title} />
              )}
              {listing.images[3] && (
                <img src={listing.images[0].url} alt={listing.title} />
              )}
              {listing.images[4] && (
                <img src={listing.images[0].url} alt={listing.title} />
              )}
              <p>{listing.description}</p>
              <p>
                $<span>{listing.price}</span>night
              </p>
            </div>
          )}
          {!listing && <h1>This Listing Does Not Exist</h1>}
          {showUpdateButton && user && listing && (
            <button onClick={updateListing}>Update Listing</button>
          )}
          {showDeleteButton && user && listing && (
            <button onClick={deleteListing}>Delete Listing</button>
          )}
          {user && <button onClick={createReview}>Add Review</button>}
          {showCreateReviewModal && user && (
            <Modal onClose={() => setShowCreateReviewModal(false)}>
              <CreateReviewModal
                setShowCreateReviewModal={setShowCreateReviewModal}
              />
            </Modal>
          )}
          {user && userCheck && <button onClick={createImage}>Add an Image</button>}
          {showCreateImageModal && user && userCheck && (
            <Modal onClose={() => setShowCreateImageModal(false)}>
              <CreateImageModal
                setShowCreateImageModal={setShowCreateImageModal}
              />
            </Modal>
          )}
          <div>
            {reviews.length > 0 &&
              reviews.map((review) => {
                return <ReviewCard key={review.id} review={review} />;
              })}
          </div>
        </div>
      )}
      {showUpdateForm && (
        <UpdateListingForm
          setShowUpdateForm={setShowUpdateForm}
          listing={listing}
        />
      )}
    </main>
  );
}

export default ListingDetails;