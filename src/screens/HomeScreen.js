import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Coursel from "../components/Coursel";
import Services from "../components/Services";
import Products from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store/ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

const HomeScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const [items, setItems] = useState([]);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Sedang Memuat Lokasi ...."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      "Location Services Not Enabled",
        "Plase Enable The location Services",
        [
          {
            text: "Cencel",
            onPress: () => console.log("Cencel Pressed"),
            style: "cencel",
          },
          { text: "OK", onPress: () => console.log("Oke Pressed") },
        ],
        { cancelable: false };
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      "Permission Denied",
        "Allow The App To Use the Location Services",
        [
          {
            text: "Cencel",
            onPress: () => console.log("Cencel Pressed"),
            style: "cencel",
          },
          { text: "OK", onPress: () => console.log("Oke Pressed") },
        ],
        { cancelable: false };
    }

    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProduct = async () => {
      const colRef = collection(db, "types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProduct();
  }, []);

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.contHeader}>
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={styles.titleLocation}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable
            style={styles.logoAccount}
            onPress={() => navigation.navigate("Profile")}>
            <Image
              style={styles.image}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AAEL6sgva_i4Hw7PWitGS1PmJhh8L6azxLgj9daKUSfBCw=s64-c-mo",
              }}
            />
          </Pressable>
        </View>

        <View style={styles.contSearch}>
          <TextInput placeholder="Search ...." />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>
        {/* Image Courosel */}
        <Coursel />
        {/* List Services */}
        <Services />
        {/* List Products */}
        {product.map((item, index) => (
          <Products key={index} item={item} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable style={styles.btnPickup}>
          <View>
            <Text style={styles.txtItems}>
              {cart.length} items | $ {total}
            </Text>
            <Text style={styles.txtExtra}>Extra Charges Might Apply</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text style={styles.txtPickup}>Procced To Pickup</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    marginTop: 30,
  },
  contHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  titleLocation: {
    fontSize: 18,
    fontWeight: "600",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  logoAccount: {
    marginLeft: "auto",
    marginRight: 10,
  },
  contSearch: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.8,
    borderColor: "#c0c0c0c0",
    borderRadius: 10,
  },
  btnPickup: {
    backgroundColor: "#088f8f",
    padding: 10,
    marginBottom: 30,
    margin: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtItems: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.2,
  },
  txtExtra: {
    fontSize: 13,
    fontWeight: "400",
    letterSpacing: 0.8,
    marginVertical: 5,
    color: "white",
  },
  txtPickup: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
});
