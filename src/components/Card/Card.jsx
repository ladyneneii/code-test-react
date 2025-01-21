import React, { useState } from "react";
import Status from "../Status/Status";
import Button from "../Button/Button";

const Card = ({
  title,
  status,
  isoDate,
  imgSrc,
  text,
  videoLink,
  articleLink,
  className
}) => {
  const [isOpened, setisOpened] = useState(false);

  const getTimePosted = (isoDate) => {
    const now = new Date();
    const targetDate = new Date(isoDate);
    const diffTime = now - targetDate; // For past dates (negative difference)
    const diffInSeconds = Math.abs(Math.floor(diffTime / 1000)); // Make it positive to handle both directions
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30); // Approximate months
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffTime > 0) {
      // Past date
      if (diffInYears > 0) {
        return diffInYears === 1 ? "a year ago" : `${diffInYears} years ago`;
      }

      if (diffInMonths > 0) {
        return diffInMonths === 1
          ? "a month ago"
          : `${diffInMonths} months ago`;
      }

      if (diffInDays > 0) {
        return diffInDays === 1 ? "a day ago" : `${diffInDays} days ago`;
      }

      if (diffInHours > 0) {
        return diffInHours === 1 ? "an hour ago" : `${diffInHours} hours ago`;
      }

      if (diffInMinutes > 0) {
        return diffInMinutes === 1
          ? "a minute ago"
          : `${diffInMinutes} minutes ago`;
      }

      return "just now"; // If it's less than a minute ago
    } else {
      // Future date
      if (diffInYears > 0) {
        return diffInYears === 1 ? "in a year" : `in ${diffInYears} years`;
      }

      if (diffInMonths > 0) {
        return diffInMonths === 1 ? "in a month" : `in ${diffInMonths} months`;
      }

      if (diffInDays > 0) {
        return diffInDays === 1 ? "in a day" : `in ${diffInDays} days`;
      }

      if (diffInHours > 0) {
        return diffInHours === 1 ? "in an hour" : `in ${diffInHours} hours`;
      }

      if (diffInMinutes > 0) {
        return diffInMinutes === 1
          ? "in a minute"
          : `in ${diffInMinutes} minutes`;
      }

      return ""; // If it's less than a minute away
    }
  };

  return (
    <div className={`launch__item launch__body ${className}`}>
      <div className="launch__title-status">
        <h2>{title}</h2>
        <Status status={status} />
      </div>

      {isOpened && (
        <div className="">
          <div className="launch__meta">
            <p className="launch__meta-item">{getTimePosted(isoDate)}</p>
            {articleLink && (
              <a
                className="launch__meta-item"
                href={articleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Article
              </a>
            )}
            {videoLink && (
              <a
                className="launch__meta-item"
                href={videoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Video
              </a>
            )}
          </div>
          <div className="launch__details">
            {imgSrc ? (
              <img className="logo" src={imgSrc} width={100} height="auto" alt="" />
            ) : (
              <p className="no-content">No image yet.</p>
            )}
            {text ? (
              <p className="text">{text}</p>
            ) : (
              <p className="no-content">No image yet.</p>
            )}
          </div>
        </div>
      )}
      <Button onClick={() => setisOpened(!isOpened)} isOpened={isOpened} />
    </div>
  );
};

export default Card;
