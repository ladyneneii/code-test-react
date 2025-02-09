import React, { useState } from "react";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";

const CardContainer = ({
  data,
  isLoading,
  setIsLoading,
  fetchData,
  page,
  setData,
}) => {
  const [scrollTimes, setScrollTimes] = useState(1);
  const handleScroll = async (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;

    const bottom = scrollHeight - scrollTop <= clientHeight + 50;

    if (bottom && !isLoading && scrollTimes <= 10) {
      console.log("Fetching more data...");
      setIsLoading(true);
      const newData = await fetchData(page);
      setData((prevData) => [...prevData, ...newData]);
      setIsLoading(false);
      setScrollTimes(scrollTimes + 1);
    }
  };

  return (
    <div className="launch__wrapper" onScroll={handleScroll}>
      <div className="launch__list">
        {data
          .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate))
          .map(
            ({
              id,
              title,
              status,
              isoDate,
              imgSrc,
              text,
              videoLink,
              articleLink,
            }) => (
              <Card
                key={`${id}__${title}__${isoDate}`}
                title={title}
                status={status}
                isoDate={isoDate}
                imgSrc={imgSrc}
                text={text}
                videoLink={videoLink}
                articleLink={articleLink}
              />
            )
          )}
      </div>
      <div className="max-reached">
        {isLoading && <Spinner />}
        {scrollTimes > 10 && "End of list."}
      </div>
    </div>
  );
};

export default CardContainer;
