import { AsyncStorage } from "react-native";

// const storeData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, value);
//     alert("Data stored Successfully!");
//   } catch (error) {
//     alert(error);
//   }
// };

const storeDataJSON = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    alert("Data stored Successfully!");
    //console.log(jsonValue)
  } catch (error) {
    alert(error);
  }
};

// const getData = async (key) => {
//   try {
//     let data = await AsyncStorage.getItem(key);
//     if (data != null) {
//       return data;
//     } else {
//       alert("No account found!");
//     }
//   } catch (error) {
//     alert(error);
//   }
// };
const getDataJSON = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      const jsonData = JSON.parse(data);
      return jsonData;
    } else {
      alert("No account matched!");
    }
  } catch (error) {
    alert(error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    alert("Data Removed Successfully");
  } catch (error) {
    alert(error);
  }
};

export { storeDataJSON, getDataJSON, removeData };
//[Math.floor(Math.random() * 200000)]