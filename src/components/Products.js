import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React from "react";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../store/CartReducer";
import { decrementQty, incrementQty } from "../store/ProductReducer";
import { useDispatch, useSelector } from "react-redux";

const Products = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const addItemToCart = () => {
    dispatch(addToCart(item)); //cart
    dispatch(incrementQty(item)); //product
  };

  return (
    <View>
      <Pressable style={styles.contPress}>
        <View>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>

        <View>
          <Text style={styles.titleProducts}>{item.name}</Text>
          <Text style={styles.titlePrice}>${item.price}</Text>
        </View>

        {cart.some((c) => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item)); // cart
                dispatch(decrementQty(item)); // product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}>
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}>
                {item.quantity}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(item)); // cart
                dispatch(incrementQty(item)); //product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}>
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text
              style={{
                borderColor: "gray",
                borderRadius: 4,
                borderWidth: 0.8,
                marginVertical: 10,
                color: "#088F8F",
                textAlign: "center",
                padding: 5,
                fontSize: 17,
                fontWeight: "bold",
              }}>
              Add
            </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
  },
  contPress: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
  },
  txtAdd: {
    borderColor: "gray",
    borderRadius: 6,
    borderWidth: 0.8,
    marginVertical: 18,
    color: "#088F8F",
    textAlign: "center",
    padding: 5,
    fontSize: 15,
    fontWeight: "800",
  },
  titleProducts: {
    width: 80,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5,
  },
  titlePrice: {
    width: 60,
    color: "gray",
    fontSize: 15,
  },
});
