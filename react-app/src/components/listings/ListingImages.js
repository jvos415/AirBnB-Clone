import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImageCard from "../image_things/elements/ImageCard";
import backArrow from "../../images/chevron_left.png"
import { retrieveImage } from "../../store/images";
import { retrieveListings } from "../../store/listings";
import "./listingImages.css";

function ListingImages() {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();


  const images = Object.values(useSelector((state) => state.images)).filter(
    (image) => {
      return image.listing_id === +listingId;
    }
  );
  const listing = useSelector((state) => state.listings[listingId])

  useEffect(() => {
    dispatch(retrieveImage());
    dispatch(retrieveListings())
  }, [dispatch]);

  const backToListing = () => {
    history.push(`/listings/${listingId}`)
  }

  return (
    <main>
      <div>
        <button className="back-arrow" onClick={backToListing} type="button">
          <img id="back-arrow-img" src={backArrow} alt="back arrow"/>
        </button>
      </div>
      <div className="all-images-container">
        {images &&
          images.map((image) => {
            return (
             <ImageCard key={image.id} image={image} listing={listing}/>
            );
          })}
      </div>
    </main>
  );
}

export default ListingImages;
