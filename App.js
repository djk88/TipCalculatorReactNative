import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';

export default function App() {

  const [tip, setTip] = useState(0.1);
  const [billAmount, setBillAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedTip, setSelectedTip] = useState(0);

  const tipAmounts = [
    {
      id: 0,
      name: "10%",
      value: 0.1,
    },
    {
      id: 1,
      name: "15%",
      value: 0.15,
    },
    {
      id: 2,
      name: "18%",
      value: 0.18,
    },
    {
      id: 3,
      name: "20%",
      value: 0.2,
    },
  ];

  const GenerateBillAmount = () => {
    setBillAmount(Math.floor(Math.random() * 100));
    setSelectedTip(tip);
  }

  useEffect(() => {
    const tipAmount = billAmount * tip;
    const totalAmount = parseFloat(billAmount) + parseFloat(tipAmount);
    setTotal(totalAmount.toFixed(2));
  }, [billAmount, tip]);

  const selectTip = (tipValue) => {
    setTip(tipValue);
    setSelectedTip(tipValue);
  };

  const ListItem = ({ item, backgroundColor, textColor }) => (
    <TouchableOpacity
      onPress={() => selectTip(item.value)}
      style={[
        styles.item,
        { backgroundColor: selectedTip === item.value ? '#FFC107' : backgroundColor },
      ]}
    >
      <Text style={[styles.itemText, { color: textColor }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Calculate Tip</Text>
      <Button onPress={GenerateBillAmount} title="Generate Random Bill"></Button>
      <TextInput
        placeholder="Enter a bill amount"
        style={styles.tipInput}
        keyboardType="numeric"
        value={billAmount.toString()}
        onChangeText={(billAmount) => {
          if (!isNaN(parseFloat(billAmount))) {
            setBillAmount(parseFloat(billAmount));
          } else {
            setBillAmount(0);
          }
        }}
      />
      <FlatList
        style={styles.tipList}
        data={tipAmounts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <ListItem item={item} textColor="black" />}
      />
      <Text style={styles.billAmount}>Bill Amount: ${billAmount.toFixed(2)}</Text>
      <Text style={styles.tipAmount}>Tip Amount: ${(billAmount * tip).toFixed(2)}</Text>
      <Text style={styles.line}/>
      <Text style={styles.totalAmount}>Total Amount: ${total}</Text>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
  heading:{
    fontSize: 34,
  },
  tipInput: {
    height: 40,
    width: 200,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    margin: 10,
  },
  tipList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  line:{
    height: 2,
    width: 220,
    marginRight: 50,
    backgroundColor: '#000',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  billAmount: {
    fontSize: 20,
    alignSelf: 'flex-end',
    marginTop: 80,
    marginRight: 50,
  },
  tipAmount: {
    fontSize: 20,
    alignSelf: 'flex-end',
    marginRight: 50,
  },
  totalAmount: {
    fontSize: 24,
    alignSelf: 'flex-end',
    marginRight: 50,
    borderTopWidth: 2,
  },
});
