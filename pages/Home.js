import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import User from "../assets/user.svg";
import Card from "../components/Card";
import Loading from "./Loading";
import axios from "axios"; // this helps to make http request to fetch from api.
import { URL } from "../services";

const renderItem = ({ item }) => {
  const passedData = {};

  passedData.Place = item.primary_details?.Place
    ? item.primary_details.Place
    : "Not Defined";
  passedData.title = item.title ? item.title : "Not Defined";
  passedData.number = item.whatsapp_no ? item.whatsapp_no : "Not defined";
  passedData.openings = item.openings_count ? item.openings_count : "-";
  passedData.views = item.views ? item.views : "-";
  passedData.salary = {
    min: item.salary_min ? item.salary_min : "-",
    max: item.salary_max ? item.salary_max : "-",
  };
  passedData.description = item.other_details
    ? item.other_details
    : "Not available";
  passedData.id = item.id ? item.id : `${Math.random()}${Date.now()}`;

  return <Card key={passedData.id} passedData={passedData}></Card>;
};

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Loads the data using API
  const getData = async () => {
    if (!hasMore || isLoading) return; // Avoid duplicate calls
    setIsLoading(true);

    try {
      const response = await axios.get(`${URL}?page=${page}`);
      const newData = response.data.results;

      if (newData.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setData((prevData) => [...prevData, ...newData]); // Append new data
        setPage((prevPage) => prevPage + 1); // Increment page for next request
      }
    } catch (err) {
      setIsError(true);
      console.log("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(); // Initial data fetch
  }, []);

  const renderFooter = () => {
    if (!isLoading) return null;
    return <Loading />;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <View>
          <User height={45} width={45}></User>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Poppins_600SemiBold",
              marginBottom: -8,
            }}
          >
            Hello👋
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "grey",
              fontFamily: "Poppins_300Light",
            }}
          >
            All job updates covered here
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontFamily: "Poppins_600SemiBold", fontSize: 20 }}>
          Trending jobs near you
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        {isError && (
          <Text>
            Something went wrong while fetching data. But you can view your
            BookMarks
          </Text>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.id ? item.id : `${Math.random()}${Date.now()}`
          }
          onEndReached={getData} // Trigger data fetch on scroll end
          onEndReachedThreshold={0.5} // Trigger when 50% from bottom
          ListFooterComponent={renderFooter} // Show loading indicator
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 38,
    paddingBottom: 108,
    backgroundColor: "#F9F9F9",
  },
  headerContainer: {
    flexDirection: "row",
    gap: 5,
    marginVertical: 12,
  },
});
