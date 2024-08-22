# 🎮 Steam Kütüphane Yönetimi

📦 **Projeye Genel Bakış**

Bu proje, oyun indirme işlemlerini yönetmenizi sağlamak amacıyla yapılmış sadece front-end’ten oluşan bir uygulamadır. Ön yüz tasarımı için HTML, SCSS, JS ve React kullanılmıştır. Redux ile entegre edilmiş, kullanıcı dostu bir arayüz sunarak, oyunları sıralama, indirme kuyruğunu yönetme ve indirilmiş oyunları görüntüleme gibi işlemleri kolaylıkla yapmanıza imkan tanır.

---

## 🚀 Kurulum ve Başlatma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Projeyi Klonlayın

git clone https://github.com/Kocayilmaz/SteamClone
cd SteamClone
-
### 2.Gerekli Paketleri Yükleyin
Proje dizinine gidin ve bağımlılıkları yüklemek için aşağıdaki komutu çalıştırın:

npm install
-
React, Redux gibi diğer gerekli yazılımların kurulumu da gerekmektedir. Kurulumlar hakkında daha fazla bilgi için aşağıdaki linklere bakabilirsiniz:
https://react.dev/learn/installation
https://redux.js.org/introduction/installation

### 3. Projeyi Başlatın
   
Projeyi başlatmak için:

npm start
-
### 4. Tarayıcıda Açın

Proje çalıştığında, varsayılan tarayıcınızda http://localhost:3000 adresini ziyaret ederek uygulamayı görebilirsiniz.

---

## 📄 Sayfa Açıklamaları

### 📋 **Anasayfa (MainContainer)**
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



