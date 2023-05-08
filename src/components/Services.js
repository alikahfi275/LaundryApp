import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { style } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes";

const Services = () => {
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Washing",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Laundry",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Wash & Iron",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Cleaning",
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.titleService}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable key={index} style={styles.contItem}>
            <Image source={{ uri: service.image }} style={styles.image} />
            <Text style={styles.txtName}>{service.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  contItem: {
    margin: 10,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  titleService: {
    fontSize: 16,
    fontWeight: "500",
  },
  image: {
    height: 70,
    width: 70,
  },
  txtName: {
    textAlign: "center",
    marginTop: 10,
  },
});
