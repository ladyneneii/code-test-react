import React, { useState } from "react";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import { fetchData } from "../../App";

const CardContainer = ({
  filteredData,
  isLoading,
  setIsLoading,
  // fetchData,
  // page,
  // setPage, 
  data,
  setData,
}) => {
  const [page, setPage] = useState(1)

  const handleScroll = async (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;

    const bottom = scrollHeight - scrollTop <= clientHeight + 50;

    if (bottom && !isLoading && data.length === 10) {
      setIsLoading(true);
      const newData = await fetchData(page);
      setPage(page + 1)
      setData(newData)
      setIsLoading(false);
    }
  };

  return (
    <div className="launch__wrapper" onScroll={handleScroll}>
      <div className="launch__list">
        {filteredData
          // .sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate))
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
        {data.length < 10 && "End of list."}
      </div>
    </div>
  );
};

export default CardContainer;
