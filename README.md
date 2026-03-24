<img width="1169" height="685" alt="image" src="https://github.com/user-attachments/assets/99904683-b509-4f4b-8178-cf3dbee48776" />
# 📇 WiTech Contacts App

## 📌 Proje Hakkında

Bu proje, şirket içerisinde aktif olarak kullanılan bir **fihrist (contact management)** uygulamasında tespit edilen kullanıcı deneyimi (UX) problemlerini çözmek amacıyla geliştirilmiştir. Uygulamanın temel amacı; kullanıcıların kişi ekleme, silme ve görüntüleme işlemlerini **anlık, tutarlı ve sorunsuz** bir şekilde gerçekleştirmesini sağlamaktır.

Mevcut sistemde veri yönetimi klasik yöntemlerle (örneğin `useEffect` ve local state) yapıldığı için, uygulamada veri senkronizasyon problemleri ortaya çıkmaktaydı. Bu durum, özellikle kullanıcı etkileşimlerinden sonra arayüzün güncel veriyi yansıtmamasına neden oluyordu.

Bu projede, tüm bu problemler modern bir yaklaşım olan **server state management** ile çözülmüş ve uygulama baştan yapılandırılmıştır.

---

## 🚨 Tespit Edilen Problemler

Uygulama analiz edildiğinde aşağıdaki temel UX sorunları belirlenmiştir:

### 1. Yeni Kişi Ekleme Problemi

* Kullanıcı yeni bir kişi eklediğinde, bu kişi API’ye başarıyla kaydediliyordu.
* Ancak **sidebar (sol menü)** otomatik olarak güncellenmiyordu.
* Kullanıcı yeni kişiyi görebilmek için sayfayı manuel olarak yenilemek zorunda kalıyordu.

### 2. Kişi Silme Problemi

* Kullanıcı bir kişiyi sildiğinde backend tarafında işlem başarılı oluyordu.
* Fakat silinen kişi **arayüzden kaldırılmıyordu**.
* Bu durum kullanıcıya yanlış bilgi gösterilmesine neden oluyordu.

### 3. State Yönetimi Problemi

* Veri yönetimi `useEffect` ve manuel state ile yapılmaktaydı.
* Bu yaklaşım:

  * Gereksiz tekrar fetch işlemlerine
  * Karmaşık kod yapısına
  * Senkronizasyon hatalarına
    yol açıyordu.

---

## ✅ Uygulanan Çözüm

Bu problemlerin çözümü için uygulama tamamen **@tanstack/react-query (React Query)** kullanılarak yeniden yapılandırılmıştır.

### 🔄 Server State Yönetimi

React Query ile:

* API’den gelen veriler cache’lenir
* Gereksiz tekrar istekler engellenir
* Veri güncelliği otomatik sağlanır

---

## 🧠 Kullanılan Temel Yaklaşımlar

### 1. useQuery ile Veri Çekme

Tüm listeleme ve detay işlemleri `useQuery` ile yapılmıştır.

Örnek:

```js
useQuery({
  queryKey: ['contacts'],
  queryFn: fetchContacts
});
```

👉 Bu sayede:

* Veri cache’lenir
* Otomatik yeniden fetch edilir
* Loading ve error state’leri hazır gelir

---

### 2. useMutation ile Veri Değiştirme

Ekleme ve silme işlemleri `useMutation` ile yapılmıştır.

```js
useMutation({
  mutationFn: deleteContact,
  onSuccess: () => {
    queryClient.invalidateQueries(['contacts']);
  }
});
```

---

### 3. Cache Invalidation (EN KRİTİK NOKTA)

UX problemlerinin ana çözümü burasıdır:

```js
queryClient.invalidateQueries(['contacts']);
```

👉 Bu işlem:

* İlgili veriyi **geçersiz (stale)** yapar
* React Query otomatik olarak yeniden fetch eder
* UI anında güncellenir

---

### 4. useEffect’in Kaldırılması

Projede tüm `useEffect` kullanımları kaldırılmıştır.

Bunun yerine:

* React Query lifecycle yönetimi kullanıldı
* Kod daha sade ve okunabilir hale getirildi

---

## 🧩 Uygulama Mimarisi

### 📁 Ana Bileşenler

* **App.jsx**

  * Router ve QueryClientProvider içerir

* **SideBar.jsx**

  * Tüm kullanıcıları listeler
  * `useQuery` kullanır

* **Contact.jsx**

  * Kullanıcı detayını gösterir
  * Silme işlemini yönetir (`useMutation`)

* **Form.jsx**

  * Yeni kullanıcı ekleme işlemi

* **Home.jsx**

  * Ana karşılama ekranı

---

## 🔁 Veri Akışı (Adım Adım)

### ➕ Yeni Kişi Ekleme

1. Kullanıcı formu doldurur
2. POST isteği atılır
3. Başarılı olursa:

```js
queryClient.invalidateQueries(['contacts']);
```

4. Sidebar otomatik güncellenir
5. Kullanıcı ana sayfaya yönlendirilir

---

### ❌ Kişi Silme

1. Kullanıcı “Delete” butonuna basar
2. DELETE isteği atılır
3. Başarılı olursa:

```js
queryClient.invalidateQueries(['contacts']);
```

4. Sidebar güncellenir
5. Kullanıcı Home sayfasına yönlendirilir

---

## 🧪 Test Altyapısı

Projede aşağıdaki test araçları kullanılmıştır:

* Vitest
* React Testing Library
* MSW (Mock Service Worker)

### MSW Kullanımı

Gerçek API yerine mock server kullanılmıştır:

* GET → veri çekme
* POST → veri ekleme
* DELETE → veri silme

Bu sayede testler:

* Daha hızlı
* Daha stabil
* Bağımsız

hale getirilmiştir.

---

## ⚙️ Kullanılan Teknolojiler

* React
* React Router (v5)
* @tanstack/react-query
* Axios
* MSW
* Vitest
* Testing Library

---

## 🚀 Kurulum ve Çalıştırma

```bash
npm install
npm run dev
```

### Test çalıştırma:

```bash
npm run test
```

---

## 🎯 Proje Kazanımları

Bu proje ile:

* ✔ Modern state yönetimi uygulandı
* ✔ UX problemleri tamamen çözüldü
* ✔ Kod karmaşıklığı azaltıldı
* ✔ Performans artırıldı
* ✔ Gerçek dünya senaryosu simüle edildi

---

## 👨‍💻 Geliştirici

**Caner**

---

## 📌 Not

Bu proje, modern frontend geliştirme süreçlerinde **server state yönetiminin önemini** ve React Query’nin sağladığı avantajları göstermek amacıyla hazırlanmıştır.
