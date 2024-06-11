import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  ActivityIndicator,
  View,
  Button,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <Wo />
    </SafeAreaView>
  );
}
function Wo() {
  const [slip, setSlip] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getMerc = async () => {
    try {
      setLoading(true);
      const caminhoApi = await fetch("https://api.adviceslip.com/advice");
      const dadosApi = await caminhoApi.json();
      setSlip(dadosApi.slip);
    } catch (error) {
      setSlip([]);
      alert("Houve um erro ao carregar o conselho");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMerc();
  }, []);
  const Item = (props) => {
    return (
      <View>
        <Text>{props.item.slip}</Text>
      </View>
    )
  }
  return (
    <View>
      <Text>Conselho: </Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <FlatList data={slip} renderItem={({ item }) => <Item item={item} />} keyExtractor={(item) => "#" + item.id}></FlatList>
        </View>
      )}
      <View style={{ width: 200, height: 50 }}>
        <Button onPress={() => { Item }} title="Conselho Aleatorio"></Button>
      </View>
    </View>
  );
}
