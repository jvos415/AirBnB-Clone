import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { makeWishlist, removeWishlist} from "../../../store/wishlists";
import "./listingCard.css";

function ListingCard({ listing, reviews, user, wishlists }) {
  const dispatch = useDispatch();

  if (!wishlists) {
    wishlists = [];
  } else {
    wishlists = wishlists.filter((wishlist) => wishlist.listing_id === listing.id);
  }

  const listingReviews = reviews.filter((review) => review.listing_id === listing.id)
  const ratings = listingReviews.map((rating) => (rating.rating))
  let rating = ((ratings.reduce((a, b) => a + b, 0))/(ratings.length)).toFixed(2);

  if (rating === "NaN") {
    rating = "New";
  }

  useEffect(() => {
    if (user && wishlists.length > 0) {
      let wishlistCSS = document.getElementById(`wishlist-${listing.id}`)
      wishlistCSS.classList.remove("heart-button")
      wishlistCSS.classList.add("heart-button-selected")
    } else {
      let wishlistCSS = document.getElementById(`wishlist-${listing.id}`)
      wishlistCSS?.classList.remove("heart-button-selected")
      wishlistCSS?.classList.add("heart-button")
    }

    if (user && (user.id === listing.user_id)) {
      let wishlistCSS = document.getElementById(`wishlist-${listing.id}`)
      wishlistCSS.classList.remove("heart-button")
          }
      
  }, [user, wishlists, listing.id]);

  const wishlistFunc = async () => {
    let wishlistCSS = document.getElementById(`wishlist-${listing.id}`)
    if (wishlistCSS.classList[0] === "heart-button") {
      wishlistCSS.classList.remove("heart-button")
      wishlistCSS.classList.add("heart-button-selected")

      await dispatch(
        makeWishlist(
          user.id,
          listing.id
        ));
    } else {
      wishlistCSS.classList.remove("heart-button-selected")
      wishlistCSS.classList.add("heart-button")

      await dispatch(
        removeWishlist(
          wishlists[0].id
        ));
    }
  }

  return (
    <div className="card-container">
      {user && listing && (<div id={`wishlist-${listing.id}`} className="heart-button" onClick={wishlistFunc}>
      </div>)}
      <Link className="listing-link" to={`/listings/${listing.id}`}>
        {listing.images[0] && (
          <img
            className="listing-img"
            src={listing.images[0].url}
            onError={(e)=>{e.target.onerror = null; e.target.src="https://images.unsplash.com/photo-1616555670626-09496d2eed9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJva2VuJTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"}}
            alt={listing.title}
          />
        )}
        {!listing.images[0] && (
          <img
            className="listing-img"
            src={`https://artprojectsforkids.org/wp-content/uploads/2021/11/How-to-Draw-a-House.jpg.webp`}
            onError={(e)=>{e.target.onerror = null; e.target.src="https://images.unsplash.com/photo-1616555670626-09496d2eed9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnJva2VuJTIwaG91c2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"}}
            alt="stock little house"
          />
        )}
        <div className="line-under-img">
          <div className="listing-location">
            <h3 id="location">{`${listing.city}, ${listing.state}, ${listing.country}`}</h3>
          </div>
          <div className="listing-rating">
            <h3 id="rating">⭑ {rating}</h3>
          </div>
        </div>
        <div className="listing-price">
          <h3 id="price">
            <span style={{ fontWeight: "700" }}>${listing.price}</span>
            <span> night</span>
          </h3>
        </div>
      </Link>
    </div>
  );
}

export default ListingCard;
