import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import CardContainer from "./components/CardContainer/CardContainer";

export const fetchData = async (page) => {
  try {
    const response = await fetch(
      `https://api.spacexdata.com/v3/launches?limit=10&offset=${page * 10}&sort=launch_date_utc&order=desc`
    );
    const launchData = await response.json();

    const transformedData = launchData.map((launch) => ({
      id: launch.flight_number.toString(),
      title: launch.mission_name,
      status: launch.upcoming
        ? "upcoming"
        : launch.launch_success
        ? "success"
        : "failed",
      isoDate: launch.launch_date_utc,
      imgSrc: launch.links.mission_patch_small || "",
      text: launch.details || "",
      videoLink: launch.links.video_link || "",
      articleLink: launch.links.article_link || "",
    }));

    return transformedData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [page, setPage] = useState(1);

  // load first 10 data initially
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const fetchedData = await fetchData(0);
      // setData((prevData) => [...prevData, ...fetchedData]);
      // setPage(page + 1)
      setData(fetchedData)
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // console.log(data);
    setAllData((prevAllData) => [...prevAllData, ...data])
  }, [data])

  useEffect(() => {
    // console.log(allData);
  }, [allData])

  const filteredData = allData.filter((card) =>
    card.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="App">
      <div className="launch main__wrapper">
        <Search value={searchValue} setValue={setSearchValue} />
        <CardContainer
          filteredData={filteredData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          // fetchData={fetchData}
          // page={page}
          // setPage={setPage}
          data={data}
          setData={setData}
        />
      </div>
    </div>
  );
}

export default App;
