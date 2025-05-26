import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Platform, Alert } from 'react-native';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

// !! IMPORTANTE: Ajuste esta URL para o IP local da sua máquina onde a API está rodando !!
// Exemplo: 'http://192.168.1.13:3000/location'
// Ou use a URL pública temporária se a API estiver exposta:
const API_URL = 'http://192.168.1.13:3000/location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Solicita permissão ao montar o componente
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada.');
        Alert.alert('Permissão Negada', 'Por favor, habilite a permissão de localização nas configurações do aplicativo.');
        return;
      }
    })();
  }, []);

  const handleGetLocation = async () => {
    setLoading(true);
    setErrorMsg(null);
    setLocation(null);
    setApiResponse(null);

    try {
      // Verifica permissão novamente antes de usar
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada.');
        Alert.alert('Permissão Negada', 'Por favor, habilite a permissão de localização nas configurações do aplicativo.');
        setLoading(false);
        return;
      }

      console.log('Obtendo localização atual...');
      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log('Localização obtida:', currentLocation);
      setLocation(currentLocation);

      // Chama a API com as coordenadas obtidas
      console.log(`Enviando coordenadas para ${API_URL}...`);
      const { latitude, longitude } = currentLocation.coords;

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Se a API retornar um erro (status não-2xx)
        throw new Error(responseData.error || `Erro na API: ${response.status}`);
      }

      console.log('Resposta da API:', responseData);
      setApiResponse(responseData); // Armazena a resposta completa da API

    } catch (error) {
      console.error("Erro no processo: ", error);
      setErrorMsg(`Erro: ${error.message}`);
      Alert.alert('Erro', `Ocorreu um erro: ${error.message}`);
    } finally {
      setLoading(false); // Garante que o loading termine mesmo com erro
    }
  };

  let locationText = 'Nenhuma localização obtida ainda.';
  if (errorMsg && !location) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Latitude: ${location.coords.latitude.toFixed(4)}, Longitude: ${location.coords.longitude.toFixed(4)}`;
  }

  let apiText = 'Aguardando envio para API...';
  if (errorMsg && !apiResponse) { // Mostra erro se a API falhou
     apiText = errorMsg;
  } else if (apiResponse) {
    apiText = `API: ${apiResponse.message}`;
    if (apiResponse.received_latitude !== undefined) { // Verifica se a propriedade existe
      apiText += `\nCoords Recebidas: Lat ${apiResponse.received_latitude}, Lon ${apiResponse.received_longitude}`;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Segundo App React Native</Text>

      <View style={styles.buttonContainer}>
        <Button title="Obter Localização e Enviar para API" onPress={handleGetLocation} disabled={loading} />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator}/>}

      <View style={styles.resultsContainer}>
        <Text style={styles.label}>Localização Atual:</Text>
        <Text style={styles.textResult}>{locationText}</Text>

        <Text style={styles.label}>Resposta da API:</Text>
        <Text style={styles.textResult}>{apiText}</Text>
      </View>

      {/* Mostra mensagem de erro geral se houver */} 
      {/* {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>} */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
    width: '90%', // Aumentar largura do botão
  },
  loadingIndicator: {
    marginVertical: 15,
  },
  resultsContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8, // Bordas mais arredondadas
    width: '90%',
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#555',
  },
  textResult: {
    fontSize: 14,
    marginTop: 5,
    color: '#333',
    lineHeight: 20, // Melhorar espaçamento
  },
  errorText: {
    marginTop: 15,
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
});

