import React from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "../Themed";

import CategoryCard from "../cards/CategoryCard";

import { useEvents } from "@/contexts/EventsContext";

import Colors from "@/constants/Colors";

export default function FeaturedCategories() {
  const { eventCategories } = useEvents();

  return (
    <View style={styles.componentWrapper}>
      <Text style={styles.header}>Featured Categories</Text>
      <View style={styles.categoriesContainer}>
        {eventCategories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  componentWrapper: {
    width: "100%",
    paddingTop: 15,

    paddingLeft: 20,
    paddingRight: 20,
   // paddingBottom: Colors["light"].bottomNavigationHeight + 30,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
});
