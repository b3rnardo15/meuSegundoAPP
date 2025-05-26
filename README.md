# Meu Segundo App React Native - Geolocalização e API

Este projeto demonstra um aplicativo simples em React Native, desenvolvido com Expo, que utiliza o recurso de geolocalização do dispositivo para obter as coordenadas (latitude e longitude) do usuário e as envia para uma API básica criada em Node.js com Express. A API, por sua vez, apenas recebe as coordenadas e as retorna como confirmação.

## Estrutura do Projeto

O projeto está organizado em duas pastas principais para separar o frontend do backend:

*   **`/App-expo`**: Contém o código-fonte do aplicativo React Native (frontend) desenvolvido com Expo.
*   **`/server-meusegundoAPP`**: Contém o código-fonte da API Node.js (backend) desenvolvida com Express.

## Funcionalidades

*   **Aplicativo (Frontend):**
    *   Solicita permissão para acessar a localização do dispositivo.
    *   Possui um botão para "Obter Localização e Enviar para API".
    *   Ao clicar no botão, obtém as coordenadas atuais do usuário usando `expo-location`.
    *   Envia as coordenadas obtidas via requisição POST para a API Node.js.
    *   Exibe a localização obtida (latitude e longitude) na tela.
    *   Exibe a resposta recebida da API na tela.
    *   Mostra indicadores de carregamento e mensagens de erro.
*   **API (Backend):**
    *   Possui um endpoint `/location` que aceita requisições POST.
    *   Espera receber `latitude` e `longitude` no corpo da requisição (JSON).
    *   Valida se as coordenadas foram recebidas.
    *   Retorna uma resposta JSON confirmando o recebimento e devolvendo as coordenadas recebidas.

## Como Executar

Você precisará de dois terminais abertos para executar o frontend e o backend separadamente.

### 1. Executando a API (Backend - Node.js)

1.  **Navegue até a pasta da API:**
    ```bash
    cd path/to/your/repository/server-meusegundoAPP
    ```
2.  **Instale as dependências (apenas na primeira vez):**
    ```bash
    npm install
    ```
3.  **Inicie o servidor da API:**
    ```bash
    node server.js
    ```
    O terminal deverá exibir a mensagem `API rodando em http://0.0.0.0:3000`. A API estará pronta para receber requisições na porta 3000.

### 2. Executando o Aplicativo (Frontend - React Native Expo)

1.  **Navegue até a pasta do aplicativo:**
    ```bash
    cd path/to/your/repository/App-expo
    ```
2.  **Instale as dependências (apenas na primeira vez ou se modificadas):**
    ```bash
    npm install
    ```
3.  **Configure a URL da API:**
    *   Abra o arquivo `App.js` dentro da pasta `App-expo`.
    *   Encontre a linha `const API_URL = ...`.
    *   **Importante:** Altere a URL para o endereço IP local da máquina onde a API Node.js está rodando, seguido da porta 3000 e do endpoint. Exemplo:
        ```javascript
        const API_URL = 'http://192.168.1.83:3000/location'; // Substitua pelo SEU IP local!
        ```
        *Dica: Você pode encontrar seu IP local usando `ipconfig` (Windows) ou `ifconfig`/`ip addr` (Linux/macOS).*
4.  **Inicie o aplicativo com Expo:**
    ```bash
    npx expo start
    ```
5.  **Abra o aplicativo:**
    *   O comando acima abrirá o Metro Bundler e o Expo Dev Tools.
    *   Use o aplicativo **Expo Go** no seu celular (Android ou iOS, conectado na mesma rede Wi-Fi que o computador) para escanear o QR code exibido no terminal ou no Dev Tools.
    *   Alternativamente, use as opções do terminal para tentar abrir em emuladores (Android Studio / Xcode) ou na web.

## Tecnologias Utilizadas

*   **Frontend:**
    *   React Native
    *   Expo SDK
    *   `expo-location`
*   **Backend:**
    *   Node.js
    *   Express.js

