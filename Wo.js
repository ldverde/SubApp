import React, { useEffect, useState,useActionState } from "react";
import {
  FlatList,
  Text,
  ActivityIndicator,
  View,
  Pressable,
} from "react-native";
import styles from "./styles";

export default function Wo() {
  const [slip, setSlip] = useState([]);
  const [isLoading, setLoading] = useState(true);

 
  const getMerc = async () => {
    try {
      setLoading(true);
      const caminhoApi = await fetch("https://api.adviceslip.com/advice", {
        method:'GET',
        cache:'no-store',
        headers: {
        'Pragma': 'no-cache',  
        'Expires': '0',        
      }
      });
      const dadosApi = await caminhoApi.json();
      setSlip(dadosApi.slip.advice);
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
  
  const Item = ({ slip }) => {
    return (
      <View>
        <Text>{slip}</Text>
      </View>
    )
  }
  console.log(slip)
  return (
    <View>
      <Text>Conselho:
      </Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Item slip={slip}/>
        </View>
      )}
      <View style={{ width: 200, height: 50 }}> 
        <Pressable
        onPress={() => getMerc()}
        style={styles.button} >
            <Text>Conselho Aleatorio</Text>
        </Pressable> 
      </View>
    </View>
  );
}