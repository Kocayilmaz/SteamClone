# 🎮 Steam Library Management

📦 **Project Overview**

This project is a front-end application designed to manage game downloading processes. It uses HTML, SCSS, JS, and React for the front-end design. Integrated with Redux, it provides a user-friendly interface allowing you to list games, manage download queues, and view downloaded games with ease.

---

## 🚀 Setup and Launch

To run the project on your local environment, follow these steps:

### 1. Clone the Repository

`git clone https://github.com/Kocayilmaz/SteamClone`  
`cd SteamClone`

### 2. Install Dependencies

Navigate to the project directory and install dependencies using:

`npm install`

You will also need to install other necessary software like React and Redux. For more information on installations, check the following links:  
[React Installation Guide](https://react.dev/learn/installation)  
[Redux Installation Guide](https://redux.js.org/introduction/installation)

### 3. Start the Project

To start the project:

`npm start`

### 4. Open in Browser

Once the project is running, visit [http://localhost:3000](http://localhost:3000) in your default browser to see the application.

---

## 📄 Page Descriptions

### 📋 **Main Page (MainContainer)**

![image](https://github.com/user-attachments/assets/c4a30271-1fea-46c4-8ff4-139a49ab654c)

This page serves as the main page of the application. It lists downloadable games and allows you to navigate to the details page of a selected game. It provides an appealing look with rich hover effects in the SCSS file.

- **Game List:** When the page loads, available games are fetched from the Redux store using the `fetchAndFilterGames` function and displayed as a list.
- **Game Selection:** When a user clicks on a game, the `handleGameClick` function is triggered, redirecting to the game details page.
- **Loading and Error States:** A spinner is shown while the page is loading, and relevant error messages are displayed in case of errors.

---

### 🔝 **Header Component**

The Header component of this application is inspired by the Steam interface. However, since this is a Steam library clone, not all buttons in the header are active. Currently, only the "Back" and "Forward" navigation buttons work, directing the user to previous or next pages. Other buttons are for visual purposes only.

---

### 🗂️ **Slidebar**

This section allows you to filter games by categories and search for specific games. You can return to the main page using the "Library Homepage" button located in the top left corner.

- **Features:**
  - Filter games by categories.
  - Search for games using the search bar.
  - Button to return to the main page.

---

### 🕹️ **Game Details Page**

![image](https://github.com/user-attachments/assets/a1273f80-56f9-45be-bd7a-d28468ad545c)

This page shows the details of the selected game. Users can access game visuals, descriptions, and other information here.

- **Game Details:** Detailed information about the selected game is displayed.
- **Download Option:** Users can download the game from this page.

---

### 📊 **Downloaded Games Page**

![image](https://github.com/user-attachments/assets/6ef2cb1b-84e0-4784-9326-eac133bd41ca)

This page shows previously downloaded games and allows users to manage their downloaded games.

- **Downloaded Games List:** Downloaded games are fetched from the Redux store and displayed as a list.
- **Game Removal:** Users can delete a game by clicking the trash icon next to it.

The downloaded games page features graphs and statistics related to download progress and network status, along with images and hover effects for a rich visual experience.


____
# 🎮 Steam Kütüphane Yönetimi

📦 **Projeye Genel Bakış**

Bu proje, oyun indirme işlemlerini yönetmenizi sağlamak amacıyla yapılmış sadece front-end’ten oluşan bir uygulamadır. Ön yüz tasarımı için HTML, SCSS, JS ve React kullanılmıştır. Redux ile entegre edilmiş, kullanıcı dostu bir arayüz sunarak, oyunları sıralama, indirme kuyruğunu yönetme ve indirilmiş oyunları görüntüleme gibi işlemleri kolaylıkla yapmanıza imkan tanır.

---

## 🚀 Kurulum ve Başlatma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Projeyi Klonlayın

`git clone https://github.com/Kocayilmaz/SteamClone`  
`cd SteamClone`

### 2. Gerekli Paketleri Yükleyin

Proje dizinine gidin ve bağımlılıkları yüklemek için:

`npm install`

React ve Redux gibi diğer gerekli yazılımların kurulumu da gerekmektedir. Kurulumlar hakkında daha fazla bilgi için aşağıdaki linklere bakabilirsiniz:  
[React Kurulum Kılavuzu](https://react.dev/learn/installation)  
[Redux Kurulum Kılavuzu](https://redux.js.org/introduction/installation)

### 3. Projeyi Başlatın

Projeyi başlatmak için:

`npm start`

### 4. Tarayıcıda Açın

Proje çalıştığında, varsayılan tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini ziyaret ederek uygulamayı görebilirsiniz.

---

## 📄 Sayfa Açıklamaları

### 📋 **Ana Sayfa (MainContainer)**

![image](https://github.com/user-attachments/assets/c4a30271-1fea-46c4-8ff4-139a49ab654c)

Bu sayfa, uygulamanın ana sayfasıdır. Sayfa, indirilebilir oyunları listeler ve seçilen bir oyunun detaylarına gitmenize imkan tanır. SCSS dosyasında sunduğu zengin hover'larla göze hitap eden bir görüntü sağlar.

- **Oyun Listesi:** Sayfa yüklendiğinde, mevcut oyunlar `fetchAndFilterGames` fonksiyonu ile Redux store'dan çekilir ve liste olarak gösterilir.
- **Oyun Seçimi:** Kullanıcı bir oyuna tıkladığında, `handleGameClick` fonksiyonu tetiklenir ve oyun detay sayfasına yönlendirilir.
- **Yükleniyor ve Hata Durumları:** Sayfa yüklenirken bir spinner gösterilir ve hata durumunda ilgili hata mesajı ekrana yansıtılır.

---

### 🔝 **Header Bileşeni**

Bu uygulamanın Header bileşeni, Steam arayüzünden esinlenerek tasarlanmıştır. Ancak, bu bir Steam kütüphanesi klonudur ve bu nedenle header'daki tüm butonlar aktif değildir. Şu an için sadece "Geri" ve "İleri" navigasyon tuşları çalışmaktadır, bu tuşlar kullanıcıyı önceki veya sonraki sayfalara yönlendirir. Diğer butonlar ise yalnızca görsel amaçlıdır.

---

### 🗂️ **Slidebar**

Bu kısım, oyunlarınızı kategorilere göre filtrelemenizi sağlar. Ayrıca, belirli oyunları aramanıza olanak tanır. Sol üst köşede bulunan "Kütüphane Ana Sayfası" butonu ile ana sayfaya geri dönebilirsiniz.

- **Özellikler:**
  - Kategorilere göre oyun filtreleme.
  - Arama çubuğu ile oyun arama.
  - Ana sayfaya dönme butonu.

---

### 🕹️ **Oyun Detay Sayfası**

![image](https://github.com/user-attachments/assets/a1273f80-56f9-45be-bd7a-d28468ad545c)

Bu sayfa, seçilen oyunun detaylarını gösterir. Kullanıcı, oyunun görsellerine, açıklamasına ve diğer bilgilere buradan ulaşabilir.

- **Oyun Detayları:** Seçilen oyun hakkında detaylı bilgi gösterilir.
- **İndirme Seçeneği:** Kullanıcı, bu sayfa üzerinden oyunu indirebilir.

---

### 📊 **İndirilen Oyunlar Sayfası**

![image](https://github.com/user-attachments/assets/6ef2cb1b-84e0-4784-9326-eac133bd41ca)

Bu sayfa, daha önce indirilmiş oyunları görüntüler ve kullanıcıya indirdiği oyunları yönetme imkanı sağlar.

- **İndirilen Oyunlar Listesi:** İndirilmiş oyunlar Redux store'dan alınır ve liste olarak ekrana yansıtılır.
- **Oyun Silme:** Kullanıcı, oyunların yanında bulunan çöp kutusu ikonuna tıklayarak oyunu silebilir.

İndirilenler oyun sayfasında indirilen oyunun ilerleme durumunu gösteren grafik ve ağ durumlarını gösteren bit sayılarının yanında üst konteynırdaki oyun resimleri ve hover'lar zengin bir görünüm sunmaktadır.

