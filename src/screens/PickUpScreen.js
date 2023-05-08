import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "3",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert("Empty Or Invalid", "Please Selecet The Fields", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    if (selectedDate && selectedTime && delivery) {
      navigation.replace("Cart", {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
        no_Of_days: delivery,
      });
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.txtAddress}>Enter Address</Text>
        <TextInput style={styles.txtInput} />

        <Text style={styles.txtAddress}>Pick Up Data</Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-08-20")}
          endDate={new Date("2023-08-31")}
          initialSelectedDate={new Date("2020-08-22")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          x
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />
        <Text style={styles.txtAddress}>Selected Time</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      borderRadius: 10,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.8,
                    }
                  : {
                      margin: 10,
                      borderRadius: 10,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.8,
                    }
              }
              onPress={() => setSelectedTime(item.time)}>
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.txtAddress}>Delivery Time</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, i) => (
            <Pressable
              key={i}
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      borderRadius: 10,
                      padding: 15,
                      borderColor: "red",
                      borderWidth: 0.8,
                    }
                  : {
                      margin: 10,
                      borderRadius: 10,
                      padding: 15,
                      borderColor: "gray",
                      borderWidth: 0.8,
                    }
              }
              onPress={() => setDelivery(item.name)}>
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {total === 0 ? null : (
        <Pressable style={styles.btnPickup}>
          <View>
            <Text style={styles.txtItems}>
              {cart.length} items | $ {total}
            </Text>
            <Text style={styles.txtExtra}>Extra Charges Might Apply</Text>
          </View>

          <Pressable onPress={proceedToCart}>
            <Text style={styles.txtPickup}>Procced To Cart</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  txtAddress: {
    fontSize: 18,
    fontWeight: "400",
    marginHorizontal: 10,
  },
  txtInput: {
    padding: 40,
    borderColor: "gray",
    borderWidth: 0.6,
    paddingVertical: 60,
    borderRadius: 10,
    margin: 10,
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
    marginTop: "auto",
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
