1. session
   Kurulum, Nodemon, Express

-npm init ile projeyi kuruyoruz.
-Öncelikle express framework ünü install yapıyoruz. (npm install express)
-app.js dosyamızı oluşturup (veya index.js proje kurulurken belirtiyoruz. Default index.js) app 'i express'e eşitliyoruz. ve çalıştıracağımız port'u belirtiyoruz.
-app.listen() diyerek içerisine parametre olarak port'umuzu geçiyoruz. ve devamında listren içinde callback function olarak clg geçiyoruz.
-app.get() İLE REQ VE RES İ CALL BACK OLARAK ALIYORUZ.
-teminalde node app diyerek server'ımızı başlatıyoruz.
-yaptığımız değişiklikler sonrası sunucuyu kapat aç yapmamak için nodemon paketini kullanıyoruz.Bunu kurmak için (npm install -D nodemon) dev dep olarak kullanıyoruz.
-ardından package.json dosyamızda
"scripts": {
"start": "nodemon app.js"
},
script'i test yerine "start": "nodemon app.js" olarak düzenliyoruz. Artık uygulamamız npm start ile başlatılacak ve başlarken nodemon kullanarak app.js i çalıştır demiş olduk.

2.session
Template Engine, Static, View -http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express
dokümantasyona gidip static dosyalarımızın public klasörü altındaki dosyalar olduğunu belirtmek için kullanımı alıyoruz ve app imize ekliyoruz.
(app.use(express.static('public')))

-node.js te middleware kavramı: Gelen isteklere karşı cevaplar vereceğimiz ve ek işlemler yapacağımız ara yazılımlardır.

-template engine: views altındaki html dosyalarını render etmek için kullanacağız. bu html dosyaları içine js ile müdahale etmek istediğimizde template engine vasıtasıyla bu işlemi yapacağız. Bunun için ejs paketini kullanacağız
(npm i ejs)

-ejs kurduktan sonra render etmek istediğimiz html dosyasını örneğin index.html i index.ejs olarak değiştiriyoruz. app.js dosyasına da view engine olarak ejs set ettiğimiz için
app.get('/', (req, res)=>{
res.render('index')
})
render edilecek anasayfa yı index.ejs dosyası olarak localhost:3000 de render ettiriyoruz.
-Aynı şekilde diğer sayfaları da .html kısmını .ejs olarak güncelliyoruz ve
app.get('/about', (req, res)=>{
res.render('about')
})
bu şekilde url ve render edilecek sayfayı tanımlıyoruz.

-Sayfalarda mükerrer olan kısımları örneğin her sayfadakı head kısmı gibi, header gibi, footer gibi kısımları component mantığını oluşturmak için views altında partial adında klasör açıp \_header.ejs, \_menu.ejs gibi dosyalar oluşturup içerisinde topluyoruz. Ardından sayfalardan kestiğimiz yerlere bu \_header.ejs yi veya component neyse alttaki gibi çağıtıyoruz.
<%- include("partials/\_header") %>

-3. session
MongoDb Atlas, Mongoose
-Mongodb adresinde hesabımıza giriş yapıp project içine giriyoruz ve Build a Database diyerek free olandan devam ediyoruz cloudlardan birisini seçiyoruz örn: aws sunucu adresi seçiyoruz örn:frankfurt ardundan create cluster diyoruz. Ve database oluşturuyoruz. Ardından gelen ekranda db ye ulaşacak user ın userName ve password belirliyoruz. myLocal env ve ip adres girmek istersek girip (örn: 0.0.0.0/0)add entry ve ardından finish diyerek Database cluster'ımızı görüyoruz.
-Burada connect diyerek veri tabanına ulaşmak için gereken connection string e ulaşmak için Connect your application seçiyoruz ve connection string'i copyalayıp projemizde .env oluşturup bir key ile env dosyamıza ekliyoruz. Connection stringdeki Kullanıcı adı ve şifreyi güncelliyoruz.
örn: DB_URI=mongodb+srv://<userName>:<password>@cluster0.vvkqftq.mongodb.net/?retryWrites=true&w=majority

- Mongo DB de DB Cluster oluşturduktan sonra dotenv paketini projemize yüklüyoruz. Bu paket uygulamamızda oluşturduğumuz çevre değişkenlerine (environment variable) ulaşabilmemizi sağlıyor. (npm i dotenv)

-Ayrıca mongoose paketini de yüklüyoruz. Mongoose genel olarak modeller içerisinde oluşturacağımız şema yapılayla doküman tabanlı mongodb verilerimizin kolaylıkla oluşturmamıza yarar. (npm i mongoose)

-Ardından app.js dosyamıza gidiyoruz ve öncelikle dotenv import edip config methodunu çalıştırmak için kodumuzu ekliyoruz. dotenv.config();
Ardık env dosyasında oluşturduğumuz variable lara erişebiliriz.

-Şimdi ise veri tabanı bağlantımızı oluşturacağız.
Bunun için bir db.js dosyası oluşturuyoruz.
Burada mongoose ile db ye connect func yazıyoruz. Bu arrow func öncelikle connection str olduğu string bağlantısını vereceğiz. ikinci olarak ta configuration objesi açıyoruz.
Onje içerisinde db veri tabanı ismimizi veriyoruz. Tabi önce Bu aşamada MongoDb sayfamıza DB mize gidip,
Db cluster ımızda Browse Collections tabına gidip Add my Ownd Data diyoruz ve Db name'i ve collection name i (collection rastgele girebilirsin) girip create diyoruz veri tabanımızı oluşturuyoruz.

-Ardından tekrar db.js imize girip configurasyon objesinde dbNameden sonra ikinci parametre olarak
useNewUrlParser: true ve
useUnifiedTopology: true veriyoruz.
Burada mongoose.connect bize bir promise döner o yüzden .then catch ile bu promise i yakalıyoruz.
app.js te bu bağlantı dosyasını ve func kullanmak için de bu dosyayı export ediyoruz.

- Mongoose connect func tamamladıktan sonra app.js te bu connection fonksiyoununu import edip fonksiyonu çağırıyoruz. örn: conn() ve DB bağlantımızın gerçekleştiğini terminalimmizde görürüz.

-Bundan sonra artık modellerimizi oluşturup mongo db veri tabanımıza düküman girişinde bulunabiliriz.

-Burada unutmadan app dosyamızda belirttiğimiz port bilgisini de .env dosyamıza alabiliriz. .env dosyamıza PORT=3000 diyerek port u env e ekliyoruz ve app.js imizde
const port = process.env.PORT; şeklinde güncelliyoruz.
Not:.env dosyasıyla ilgili unutmamamız gereken husus .env de bir değişiklik yapıldığında sunucuyu durdurup tekrar çalıştırmak gerekir.

-4.session
Model View Controller
Seperation of Concern

--Veri tabanında işlemleri yapan oluşturmayı sağlayan dosyalarımız modellerimizdir.
Uygulamanın görünen yüzleri viewlarımızdır.
Modeller ve viewlar arasındaki bağlantıyı ise controllerlarımız ile sağlarız.
<img align="left" alt="postman" height="50px" src="https://github.com/enes9103/enes9103/blob/main/MVC.png" />

-- Controllers klasörü açıp burada bir pageController.js dosyası oluşturuyoruz.
App.js imizde yaptğımız controller işlemlerini buraya taşıyacağız.

örn: const getIndexPage = (req, res) => {
res.render("index");
};
burda ne yapıyoruz. getIndexPage func 'a gelen res isteğini index dosyasına render et demiş olduk.
Şidmi bu render'ı gelen isteğe göre routerda çalıştırmamız lazım.

--Bu yönlendirmeleri yapmak için ise routing yapmamız lazım. Bunun için routes adında bir klasör oluşturup pageRoute adında bir dosya açıyoruz.
örn:
const router = express.Router();

router.route("/").get(pageController.getIndexPage);

route sana "/" get isteği geldiğinde beni pageController içindeki getIndexPage fonksiyonunu çalıştır diyoruz. aynı şekilde diğer sayfalar içinde bu route işlemlerini yapıyoruz.

Özet olarak döngü şu şekilde:
app.js sayfasındaki kök adresimize ("/" a) bir istek geldiğinde bizi pageRoute a gönderir.
pageRoute a geldiğimizde ise isteğin türüne ve nereye istek geldiğine bakar. Örneğin "/about" a bir get isteği geldi. O zaman bizi pageController.getAboutPage fonksiyonuna yönlendirir.
pageController 'a gelip getAboutPage fonksiyonumuza geldiğimizde gelen res 'e bakar ve fonksiyonun dediği "about" template ini render eder.
about sayfası ise views içindeki about template imi render etmiş oluruz.

-5.session
Model / Mongoose / Schema Yapısı

Mongo db de dokümanları oluşturmak için önce bir verinin Schema sı çizilecek, Schema da yapılmak saklanmak istenen verinin bir haritası şeması oluşturulur. Ardından bu şemadan ilgili modeli oluşturuyoruz. Ve son olarak bu modeller yardımıyla da veri tabanımızda dokümanları oluşturacağız.

bkz: https://mongoosejs.com/docs/guide.html

-6.session
Postman Kullanımı, Document-Collection, Request-Response

-Controller da oluşturduğumuz createPhotos işlemini çalıştırmamız lazım bunun için Route da yazdığımız post isteğini yapmamız lazım.
-Bunun için istekleri atıp kontrol edeceğimiz postman'ı kullanıyoruz. Postmanda post isteği için http://localhost:3000/photos adresine post istek atmalıyız ve body içinde raw kısmına model de oluşturduğumuz isterlere göre göndereceğimiz object'i eklememiz lazım.
örn: {
"name": "Solidity",
"description": "Web3 Landuage"
}
-İsteği atabilmemiz içinde app dosyamızda static files middleware lere app.use(express.json()) diyerek body de gönderilen json formatının okunabilmesini sağlıyoruz.

- Postmanda photos'a baktımınızda boş object olduğunu görürüz. Bunun nedeni controllerdaki createPhotos fonksiyonunu async await yapısında yapmamız lazım. Aynı şekilde errorları yakalayabilmek için de try catch içinde yazmalıyız.

örn:
const createPhoto = async (req, res) => {
try {
const photo = await Photo.create(req.body);
res.status(201).json({
succeded: true,
photo,
});
} catch (error) {
res.status(500).json({
succeded: false,
error,
});
}
};

-Create yaptıktan sonra create yapılan verileri almak için de aynı create yapısı gibi bir de get yapısı oluşturuyoruz. Fark olarak get kullanıyoruz ve create yerine find methodu kullanıyoruz.

örn:const getAllPhotos = async (req, res) => {
try {
const photos = await Photo.find({});
res.status(200).json({
succeded: true,
photos,
});
} catch (error) {
res.status(500).json({
succeded: false,
error,
});
}
};

- router2ı ise gelen istekleri controllerda yönlendireceğimiz fonksiyonlara yönlendiriyoruz. aynı gelen istekleri arka arkaya ekleyerek yapabiliriz.
  örn:
  router
  .route("/")
  .post(photoController.createPhoto)
  .get(photoController.getAllPhotos);

-7. session
Veri Listeleme, Render ve Aktif Link

-App imizde menüden photos'a tıkladığımızda fson onjesi dönüyor. Bunun nedeni controller da biz hala photos.ejs dosyamızı render ettirmedik. Bunun için photosController.js dosyamıza gidiyoruz.
-photosController.js dosyasındaki getAllPhotos fonsiyonunda biz status 200 dçndüğünde json döndürmesini istemiştik. Bunun yerine photos u render etmesini istiyoruz. Bunun için fonksiyonu alttaki gibi düzenliyoruz;

const getAllPhotos = async (req, res) => {
try {
const photos = await Photo.find({});
res.status(200).render("photos");
} catch (error) {
res.status(500).json({
succeded: false,
error,
});
}
};

-photos.ejs dosyamız render edilmiş oldu ama statik şekilde bizim data dan gelen verileri alıp bu sayfada dinamik bir şekilde listelememiz lazım. Bunun için yukarıda render için düzenlediğimiz getAllPhotos fonksiyonunda render photos kısmına konfigürasyon objesi ile ilgili photos template engine e alttaki gibi göndermemiz laızm.

const getAllPhotos = async (req, res) => {
try {
const photos = await Photo.find({});
res.status(200).render("photos", {
photos,
});
} catch (error) {
res.status(500).json({
succeded: false,
error,
});
}
};

-Ardından photo.ejs dosyasına gidip bu gönderdiğimiz photos datasını template'imizde yakalıyoruz. Ve photo divlerinin sadece bir tanesini bırakıp diğerlerini siliyoruz. Ve bu photo cart ına for döngüsü ile (for of, foreach for vs kullanılabilir) datadaki fotoğrafları dinamik bir şekilde for ile dönüyoruz.
Ve kart içindeki dinamik olmasını istediğimiz yerleri datadan gelen veriler olarak düzenliyoruz.

örnek dinamik kullanım:

          <% for (photo of photos) { %>
          <div class="col-lg-4 col-md-6 ma_bottom30">
            <div class="lightbox">
              <img src="images/g1.jpg" alt="Bridge" />
              <div class="view_main">
                <div class="pose">
                  <a class="read_more" href="images/g1.jpg"
                    ><img src="images/ga.png" alt="#"
                  /></a>
                  <h3 style="padding-top: 10px; padding-bottom: 10px">
                    <%= photo.name %>
                  </h3>
                  <p style="padding-top: 10px"><%= photo.description %></p>
                </div>
              </div>
            </div>
          </div>
          <% } %>

          - Son olarak menüdeki aktif olan sayfanın menüsünü renkli olarak dinamik yapmak için
          _menu.ejs dosyasında linklerin bulunduğu li leri dinamik yapmak için önce pageController.js dosyamızda getAbout ve getIndexPage fonksiyonlarımıza configürasyon objesi ekliyoruz ve link parametresi gönderiyoruz.

          örn:
          const getAboutPage = (req, res) => {

res.render("about", {
link: "about",
});
};

Ardından \_menu.ejs dosyamızda linkleri alttaki gibi dinamik hale getiriyoruz.

<li>
                <a class="<%= link === 'about' && 'active' %>" href="/about"
                  >About</a
                >
              </li>

-8.session
Router Route, URL Param, Tekil Fotoğraf Sayfası

-Fotoğraflara tıklandığında fotoğraf detay sayasına id ile gitmek için views in altında bir photo.ejs dosyası açtık.

Ardından getAPhoto adında bir controller fonksiyonu yazıyoruz ve \_id ile bulup photo yu render etmesini sağlıyoruz.
Aslında url ile giderken photos/ ardına id eklemiş oluyoruz.

örn:
const getAPhoto = async (req, res) => {
try {
const photo = await Photo.findById({ \_id: req.params.id });
res.status(200).render("photo", {
photo,
link: "photos",
});
} catch (error) {
res.status(500).json({
succeded: false,
error,
});
}
};

Controller daki bu getAPhoto fonksiyonun yönlendirmesini de router dan yapıyoruz.

örn: router.route("/:id").get(photoController.getAPhoto);

Ardından photos sayfasındaki fotoğraflardan tıklananın url ini dinamik şekilde düzenliyoruz. Bunun için
photos.ejs içerisindeki fotoğrafın a tag ını  
<a class="read_more" href="/photos/<%= photo._id %>"
                    ><img src="images/ga.png" alt="#"
                  /></a>
şeklinde düzenleyerek url i id ile dinamik hale getiriyoruz.
Browser yenilediğimizde css lerin düğştüğünü görürüz çünkü js ve css linkleri bir içteki sayfayadan ulaşamadığımız için \_header.ejs \_footer.ejs ve page.ejs teki linklemelerin başına / ekliyoruz.
örn:
<img src="/images/loading.gif" alt="#" />

<link rel="stylesheet" href="/css/bootstrap.min.css">  vs.

Ardından photo.ejs içerisini düzenliyoruz.

 <h2><%= photo.name %></h2>
            <p>
              <%= photo.description %>
            </p>

vs. dinamik yapıyoruz.

Fotoğrafların genelinin göründüğü photos.ejs sayfasında fotoğrafların üstündeki description tamamı görünmesin detayda tamamı görünsün istediğimiz için description ı bastığımız dinamik p tagını substring ile güncelliyoruz.

örn:

<p style="padding-top: 10px">
                    <%= photo.description.substring(0, 80) + "..." %>
                  </p>

- session 09
  Kayıt Sayfası, Form İşlemleri, User Model

-Kayıt sayfası için öncelikle user model dosyamızı oluşturuyoruz ve photoModel deki şablonu kullanıp userName, email ve password field larını ekliyoruz.

-Ardından default bir şekilde mongoose un create and update date leri oluşturması için schema içinde ikinci bir obje açıp timestamps: true, yapıyoruz.

Sayfamızda register için bir yapı oluşturuyoruz. Bunun için
bir pageController içerisine registerPage adında bir fonksiyon oluşturuyoruz.

örn:
const getRegisterPage = (req, res) => {
res.render("register", {
link: "register",
});
};

- ardından register template'imiz olmadığı için bir html template'İni (contact) kopyalayıp yeni bir register.ejs oluşturuyoruz. Ardından öncelikle register.ejs dosyasında kullanacağımız partial ları düzenliyoruz.

-Ardından register sayfamıza gitmek içim menu.ejs partial 'ımızda register menu müzü ve linkini oluşturuyoruz.

-Routerdosyamızda route işlemini de yapıyoruz.
router.route("/register").get(pageController.getRegisterPage);
-register.ejs dosyasını istediğimiz gibi düzenliyoruz.
-Sayfamızda register işlemini post yapmak için;
userController.js oluşturuyoruz.
Ve createUser fonksiyonumuzu düzenliyoruz.,
örn:
const createUser = async (req, res) => {
try {
const user = await User.create(req.body);
res.status(201).json({
succeded: true,
user,
});
} catch (error) {
res.status(500).json({
succeded: false,
error,
});
}
};

-Ardından yönlendirme için rute içerisinde userRoute.js dosyası oluşturup route işlemlerini yapıyoruz.
router.route("/register").post(userController.createUser);

-Sonra app.js e gidip app.use("/users", userRoute); kullan diyoruz.
-register.ejs te form submit işlemini yapıyoruz.

<form id="request" class="main_form" action="users/register" method="POST">

-Son olarak app.js içinde middleware eklememiz laızm
app.use(express.urlencoded({ extended: true }));

- session 10
  Giriş Sayfası, gİRİŞ iŞLEMLERİ, bcrypt.js

-Kullanıcı şifrelerinin database de görünmemesi için şifrelerin hash lenmesi ardından kodumuzda hash lanen fonksiyonların compare edilmesi karşılanması gerekir. Bunun için bcrypt.js paketini kullanacağız. npm i bcrypt diyerek install yapıyoruz.

-userModel.js içinde schema objectinin altında bir pre kullanımı açıp iki parametre veriyoruz ilk parametre 'save' ikinci parametre ise function. Function içinde next parametresi veriyoruz bu da işlem tamamlandığında sonraki işleme geçmesi için next veriyoruz. fonksiyon içinde de üzerinde çalıştığımız object'in User olması belirtip password hash işlemini yapıyoruz. hash yaparken bcrypt.hash içinde ilk önce user.password ü al belirtilen derecede güvenlikli hash karakter oluştur (bizde 10) ardından arrow func açıp user.password'e hash lenen pass atıyoruz.

örn:
userSchema.pre("save", function (next) {
const user = this;
bcrypt.hash(user.password, 10, (err, hash) => {
user.password = hash;
next;
});
});

-Ardından login page imizi oluşturuyoruz. pageController.js te get login fonksiyonumuzu oluşturuyoruz.
const getLoginPage = (req, res) => {
res.render("login", {
link: "login",
});
};

-\_menu.ejs imize gidip login sayfa link ve url imizi düzenliyoruz.

- <li>
                <a class="<%= link === 'login' && 'active' %>" href="/login"
                  >Login</a
                >
              </li>

  -login template'imizi düzenliyoruz. register.ejs i kopyalayıp user ve password inputları kalıyor ve login' sayfası olarak düzenliyoruz.

- Artık login butonuna tıklandığı zaman auth giriş post işlemini düzenleyeceğiz.

- Bunun için önce:
  userRouter.js e gidip
  router.route("/login").post(userController.loginUser); //localhost/users/login

- userController a gidip loginUser fonksiyonumuzu hazırlıyoruz.

Burada form gönderildiği zaman (login) veri tabanındaki user'ı bulup ardından user'a ait şifreleri karşılaştırmamız lazım.
Veri tabanında artık ahsh lenmiş şifreyi tuttuğumuz için şifreyi bcrypt ile compage edip karşılaştırmalıyız.

-Önce body den kullanıcı adı ve şifreyi alacağız.
const { username, password } = req.body;

buradaki username yardımıyla da veri tabanından username i bulacağız.
const user = await User.findOne({ username });
burada await yapmamız lazım yoksa kullanıcıyı bulmadan işlemlere devam eder ve diğer işlemlere geçtiği için user bulunamaz ve hata döner.

şimdi veri tabanında gelen kullanıcı varsa işlemlere başlıyoruz.

if else kullanıp veri tabanındaki kullanıcı varsa elimizdeki şifre ile databasedeki şifre aynı mı karşılaştırmasını yapacağız. user yoksa da else ile 401 status dönüp kullanıcı yok hatası fırlatacağız.
if (user) {
same = await bcrypt.compare(password, user.password);
} else {
res.status(401).json({
succeded: false,
error: "There is no such user.",
});
}

tukarıdaki if içinde formdan gelen password ile user.password karşılaştırıldı. compare methodu içinde hashten çözülmüş pass ler karşılaştırılmış oldu. compare methodu true false döndüğü içinde ikinci if'e bool göndermemiz için same değişkeine atadık true yaparsak password doğru olduğunda ikinci if i çalıştırmış olduk.
let same = false;

-Ardından same true olduğunda yani şifre doğru olduğunda ve kullanıcı da varsa if çalıştırdık. Ve kullanıcıyı logged in yaptık. ve status 200 dönüp req fırlattık. else durumunda da passwordler eşleşmedi diye 401 hata mesajı gönderdik.
if (same) {
res.status(200).send("You are logged in");
} else {
return res.status(401).json({
succeded: false,
error: "Password are not matched",
});
}

- session 11
  Authentication, Authorization, JSON WEB TOKEN (JWT)
  Authentication: kimlik doğrulama
  Authorization: yetkilendirme

- Token işlemleri için json web token paketini yüklüyoruz. Ardından userController.js içinde createToken adında yeni bir fonksiyon oluşturuyoruz. Bu fonksiyon gönderdiğimiz userId için bir token oluşturacak.
  jwt.sign methodu üç parametre alacak ilki userId İkincisi oluşturduğumuz bir secret key (bunu .env dosyasında oluşturup oradan çekebilriz) üçüncüsü ise token geçerlilik süresini gösteren expiresIn.
  örn:
  const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
  expiresIn: "1d",
  });
  };

  -Ardından createToken fonksiyonumuzu kullanıcı başarılı bir şekilde login olduğunda token oluşturması için login success durumunda kullanyıoruz.
  success durumunda bir json dönüp içerisinde user bilgilerini ve token'ı gönderiyoruz. token'ı da createToken fonksiyonumuza user.\_id gönderip oluşturtuyoruz.
  örn:
  if (same) {
  res.status(200).json({
  user,
  token: createToken(user.\_id),
  });
  }

- Giriş yapan kullanıcı için artık token'ımız oluşuyor.
- Şimdi örneğin ana sayfada bir authorization yetkilendirme yapıp sadece giriş yapan yani token olan kullanıcının görmesini istiyorum.
  Bunun için ana dizinde bir middlewares klasörü açıp authMiddleware.js dosyası açıyorum.
  İçerisinde ise bu yetkilendirme işlemini sayfayı render etmeden kontrol edecek fonksiyonu oluşturuyoruz.

const authenticateToken = (req, res, next) => {
const authHeader = req.headers["authorization"];
console.log("authHeader", authHeader);
};

- Bu fonksiyonu sayfaya yönlendirmeden çalıştırıp token kontrolü yapmak için de pageRouter.js dosyasındadaki;

router.route("/").get(authMiddleware.authenticateToken, pageController.getIndexPage);

kısmına ekliyoruz. Yani pageController.getIndexPage çalışmadan önce authMiddleware.authenticateToken kontrolü yap ona göre get işlemini gerçekleştir diyoruz.

- authenticateToken fonksiyonundaki console.log("authHeader", authHeader); kontrol ediyoruz. Postmandan login post isteği gönderiyoruz. Ardından login userdan dönen token'ı kopyalayıp postmandan birde ana sayfaya localhost:300 e get isteği atıyoruz. Bu isteği atarken postmanda bearer token eklememiz gerekiyor. Az önce user token kopyalamıştık o token'ı ekleyip get isteğini atıyoruz. Bu yaptığımız işlemin amacı authenticate olan user'ın token'ı ile ana sayfaya gidebiliyor muyuz onu görmek istiyoruz. Ardından console ile yazdırdığımız Resp terminalde baktığımızda authHeader'ın: Bearer eyHJnsd......token olarak geldiğini görürüz. buradan token'ı almak için de authMiddleware.js te const authHeader = req.headers["authorization"]; buradan dönen Bearer ve token kısmını split ile ayırıp 1. indexteki token'ı token değişkenine alıyoruz. Ardından authHeader'ı ekstra değişkene atamamıza gerek olmadığı için tek satırda yazıyoruz.
  örn: const token =
  req.headers["authorization"] &&
  req.headers["authorization"].split(" ")[1];

- Ardından da token kontrolü yapıp token olmadığı durumda error dönüyoruz.
  if (!token) {
  return res.status(401).json({
  succeeded: false,
  error: "No token available",
  });
  }

  devamında token olduğu durumda; fonksiyonu async await yapıp veri tabanından gelen (req ile) user'ı token içindeki user ıd ile eşitliyoruz. Tabi ki token'ı verify yapmamız lazım yanı token'ı parçalayıp user id sini aslında buluyoruz.
  ÖRN.:
  req.user = await User.findById(
  jwt.verify(token, process.env.JWT_SECRET).userId
  );

Son olarak ta bir sonraki işleme devam etmesi için next() çalıştırıyoruz. Bu da aslında routerdaki
router
.route("/")
.get(authMiddleware.authenticateToken, pageController.getIndexPage); buradaki authMiddleware.authenticateToken işlemlerini tamamladıktan sonra bir sonraki işlem olan pageController.getIndexPage işlemini yani sayfayı render etme işlemine geç demek oluyor.

    next();

- Session 12
  Cookie Parser, Token Kayıt

- Elimizdeki jwt token'ı cookies te tutmak için cookie-parser kütüphanesini yüklüyoruz.
  npm i cookie-parser

- cookie-parser'ı kullanmak için app.js içinde middleware lerin olduğu kısma;
  app.use(cookieParser()); ekliyoruz.

- userController.js içerisinde if (same) içinde token oluşturduğumuz yeri güncelliyoruz.

Biz status 200 döndükten sonra user'ı gönderirken token'ı da oluşturup gönderiyorduk buradan bu createtOKEN'I KALDIRIYORUZ. if(same) in hemen altında;
const token = createToken(user.\_id);
res.cookie("jsonwebtoken", token, {
httpOnly: true,
maxAge: 1000 _ 60 _ 60 \* 24, // max 1 day
});

token'ı oluşturup bu token'ı cookie ye kaydediyoruz. httpOnly:true bu cookie ye frontend tarafından da ulaşılması için maxAge ise token geçerlilik süresi için ekliyoruz.

- Ardından authMiddleware.js e geliyoruz. Biz burada token'ı header dan alıyorduk artık header dan değil direk cookie den alacağız.

  const token = req.cookies.jwt;

  if (token) {
  jwt.verify(token, process.env_JWT_SECRET, (err) => {
  if (err) {
  console.log(err.message);
  res.redirect("/login");
  } else {
  next();
  }
  });
  } else {
  res.redirect("/login");
  }
  Burada token'ı cookie den aldık ardından token varsa token'ı verify yapıyoruz ve error durumu için bi if yazıyoruz. Error varsa login'e gönder diyoruz. err yoksa next() yapıp ilerle diyoruz.
  Aynı şekilde token yoksa if 'i içinde else de login'e yönlendir dedik.

  - userController.js e tekrar gidiyoruz ve if içinde same true olması durumunda token üretip cookie ye atıyorduk. Ardıdnan da status 200 dönüp user'ı json res olarak gönderiyorduk. Bu yapıyı da değiştiriyoruz.
    Burada same true olduğunda token oluştur cookie ye at ve beni redirect yapıp dashboard'a yönlendir diyoruz.
    res.redirect("/users/dashboard");

  - Ardından dashboard'A yönlendirdiğimiz için userRoute.js e gidip dashboard için bir route oluşturuyoruz. /users/dashboard a bir get isteği geldiğinde userControllerdaki getDashboardPage 'i çalıştır diyoruz. Şimdi userController a gidip getDashboardPage fonksiyonunu yapacağız.

  router.route("/dashboard").get(userController.getDashboardPage);

- Şimdi userController da getDashboardPage fonksiyonumuzu oluşturuyoruz.

const getDashboardPage = (req, res) => {
res.render("dashboard", {
link: "dashboard",
});
};

- Son olarakta views klasöründe dashboard.ejs dosyası oluşturuyoruz. Şimdi login olduğumuzda kullanıcı direk dashboard page e yönlendiriliyor.

- Şimdi cookie ye girip baktığımızda login olan kullanıcının jwt bilgisi cookie de mevcut. Ve kullanıcı login olduğu için dashboard sayfasında. Biz cookie den jwt yi silersek dashboard a ulaşamamamız lazım ama sildiğimizde refresh yapıyoruz hala user dashboard sayfasında giriş yapmış görünüyor. Bu authorization işlemini için authMiddleware i devreye sokmamız lazım. Bunun için userRoute.js te dashboard route yaptığımız satırda authenticateToken kontrolü yapması için yönlendirme işleminden önce authMiddleware.authenticateToken kontrolünü ekliyoruz.

router.route("/dashboard").get(authMiddleware.authenticateToken, userController.getDashboardPage);

Şimdi sayfayı refresh edersek cookie de token olmadığı için middleware bizi login sayfasına yönlendirecek.

- Session 13
  Kayıtlı Kullanıcı, Dashboard Sayfası, Dinamik Menü

- Cookie de bulunan jwt bilgileri ile kaydolan user bilgilerine ulaşma ve user bilgilerini kullanma işlemlerini yapcağız.

- Dashboard sayfamızı bir önceki session da statik şekilde oluşturmuştuk.Şimdi dinamik hale getirmeliyiz.

- öncelikle authMiddleware içerisinde checkUser adında yeni bir fonksiyon oluşturacağız.
- Bu fonksiyonda öncelikle token'ı cookie den alıyoruz ve token varsa jwt yi verify yaptıktan sonra error dönerse user ı null dön err dönmezse user'A decodedToken yapıp token içerisindeki user id ile bulup (userController da createToken yaparken token'ı sign ederken userId parametresi ile oluşturmuştuk) atama yapıyoruz.
  Ardından bulduğumuz bu giriş yapan kullanıcıya bulduğumuz user ı eşitliyoruz ve next() diyerek devam ediyoruz. ilk if te token varsa demiştik token yoksa da yine user a null ataması yapıyoruz.

const checkUser = async (req, res, next) => {
const token = req.cookies.jwt;

if (token) {
jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
if (err) {
console.log(err.message);
res.locals.user = null;
next();
} else {
const user = await User.findById(decodedToken.userId);
res.locals.user = user;
next();
}
});
} else {
res.locals.user = null;
next();
}
};

- Ardından bu oluşturduğumuz checkUser fonksiyonunu app.js te kullanmasını sağlayacağız. toutes ların en üstüne ekliyoruz. Bu bize tüm get fonksiyonlarında hangi sayfaya giderse gitsin bu fonksiyonu kontrol et diyoruz.

app.get("\*", checkUser)

- Şimdi view dashboard.ejs sayfamızı düzenliyoruz. Bunun için about sayfasının about haricindeki kısımalrını template olarak kullanıp index içindeki customers section ını alıp dashboarda ekliyoruz. Title düzenliyoruz. Statik olarak bir h2 ekledik. Gelmeyen görseller için dashboard.ejs de url lerin başına "/" ekliyoruz.

 <h2>Welcome <%= user.username %></h2>

- Şimdi daha önce userController.js te oluşturduğumuz createUser fonksiyonunda register işleminden sonra bize bir json objesi dönüyordu. Bunu düzenliyoruz. User.create yapıldıktan sonra login'e redirect yapıyoruz. Yani register olan kullanıcı kayıt olduktan sonra login sayfasına yönlendirilecek.

  const user = await User.create(req.body);
  res.redirect("/login");

- Şimdi Menümüzü düzenlememiz gerekiyor. Kullanıcı giriş yaptığında login ve register menüleri yerine dashboard ve logout menüleri gelmeli kullanıcı logout olduğunda ise login ve register menüleri görünmeli.

- Bunun için partial \_menu.ejs dosyamıza geliyoruz. Burada logout ve dashboard için yeni birer link ekliyoruz.

              <li>
                <a
                  class="<%= link === 'dashboard' && 'active' %>"
                  href="/users/dashboard"
                  >Dashboard</a
                >
              </li>
              <li>
                <a href="/logout">Logout</a>
              </li>

- Ardından user login mi logout mu kontrol etmemiz gerekiyor ki menüler dinamik şekilde user'ın auth durumuna göre görünsün. Bunun için user a göre görünüp gizlenecek menüleri if else içinde koşul içinde yazıyoruz. Artık user varsa dashboard ve logout menüleri user yoksa login ve register menüleri görünecek.

<% if (user) { %>

<li>
<a
    class="<%= link === 'dashboard' && 'active' %>"
    href="/users/dashboard"
    >Dashboard</a>
</li>
<li>
<a href="/logout">Logout</a>
</li>
<% } else { %>
<li>
<a class="<%= link === 'login' && 'active' %>" href="/login"
   >Login</a>
</li>
<li>
<a
   class="<%= link === 'register' && 'active' %>"
  href="/register">Register</a>
</li>
<%}%>

- Son olarak ta logout işlemini yapacağız. Onun için pageControllerda yeni bir getLogout fonksiyonu oluşturuyoruz. Bunun için de cookie deki token'ımızın süresini 1 milisaniye olarak ayarlayacağız. Bu da logout yapıldığında 1 ms de token'ı kaldıracağı için ardından redirect ile "/" ana sayfaya yönlendirme yapıyoruz.

const getLogout = (req, res) => {
res.cookie("jwt", "", {
maxAge: 1,
});
res.redirect("/");
};

Sonra pageRoute dosyasına gidip "/logout" şeklinde bir get isteği geldiğinde pageController.getLogout u çalıştır diye route oluşturacağız.

router.route("/logout").get(pageController.getLogout);

- Session 14
  Validation Kavramı, Form Düzenleme, Hata Yakalama

- Form validation işlemlerini gerçekleştireceğiz. Biz userController da create user da eğer register işlemi başarısız olursa catch e düşen error u json olarak dönüyorduk. Oluşturduğumuz model sayesinde bize dönen json mesajını incelediğimizde içerisinde error objesi var. ve bu obje içinde name key ile "ValidationError" dönüyor. Biz bu error mesajının name ini kontrol edip errors içindeki hata mesajlarını alıp bunu sayfada kullanacağız.

- Bu işlemler için validator paketini kullanacağız. Yüklüyoruz.
  npm i validator

- userModel içinde UserSchema yı güncelliyoruz. Burada validator paketi kullanmak için önce import yapıp ardından schemalar içine validate işlemini yapıyoruz. Önce required kısımlarını düzenliyoruz.

required: [true, "Username area is required"],

Şimdi de calidattor paketini kulanarak validate kontrol işlemini yapıyoruz. validator.isEmail değil ise dönecek mesajı ekliyoruz. userName email ve password schema ları içinde sırayla bu işlemi yapıyoruz. Bu işlemden sonra registerda dönen errordaki ahta mesajları değişecek ve modelde verdiğimiz hatalar dönecek.

validate: [validator.isEmail, "Valid email is required"],

- Şimdi bizim yukarıda düzenlediğimiz hata mesajlarını alıp kullanmamız gerekiyor. Bunun için userControllerda createUser fonksiyonunun catch kısmına geliyoruz. Burada yakalanan error u işlememiz gerekiyor.

Önce bir boş object oluşturuyoruz.
let errors2 = {};

Ardından hatanın name i ValidationError ise dönen error daki errors object inin içindeki keyleri forEach ile dönüp hepsinin message larını alıp üstte oluşturduğumuz errors2 objectine atıyoruz.

    if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((key) => {
        errors2[key] = error.errors[key].message;
      });
    }

errors2 objectini console.log yaparsak dönen error ların herbir key lerinin (username, email ve password) hata mesajlarının object içinde döndüğünü göreceğiz. Frontend tarafına da biz 500 hatamesajı ile error ların tamamını gönderiyorduk. Şimdi hata mesajı 400 yapıp sadece alıp objede tuttuğumuz hata mesajlarını yani errors2 yi göndermemiz yeterli olacak.

    res.status(400).json(errors2);

- Şimdi bu hata mesajlarını frontend tarafında inputların altında dinamik bir şekilde gösterelim. Şimdi biz register formunda register butonuna tıklandığında backend e bir istek atacağız ve buradan error döndüğünde bize dönen error mesajlarını alıp ui da yazdıracağız.

- Bunun için register.ejs dosyasına gidip her inputun hata mesajı göstereceğimiz kısmında (altında) hepsine bir mesaj yapısı ekliyoruz. Bir tanesinin örneği:

              <div class="col-md-12">
                <div
                  style="display: none"
                  class="alert alert-danger"
                  id="password"
                ></div>
              </div>

Bu mesajın style ını display none yapıyoruz ve hepsine id ler veriyoruz. Ardından register.ejs dosyamızın en altında bir script yazmamız gerekiyor.

Bu scriptte önce formu ve inputları id leri ile yakalıyoruz.
form a addEventListener submit ekliyoruz.
Form submit edildiğinde önce tüm error textleri basacağımız kısımları sıfırlayıp style ları tekrar display none yapıyoruz. Burada tekrar sıfırlama ve none yapmamızın nedeni sayfa yenilendiğinde bu değerler atanmış olması için. Ardından form.email.value şeklinde sırasıyla email password ve username in value larını alıyoruz. Ardından inputlardan aldığımız email password ve username değerlerini bir sjon içine ekleyip POST isteği yapıyoruz ve 'users/register' a istek atıp gönderiyoruz. Ardından gelen data yı değişkene atıyoruz ki buradan bize errorlar dönecek.
Ardından if kontrolü içinde; data varsa sırasıyla tekrar if kontrolleri ile data.email varsa emailError.textContent = data.email ekleyip emailError.style.display = 'block' yapıyoruz. Aynı şekilde password ve user name içinde kontrolleri yapıp düzenliyoruz.
Şimdi validasyon işleminde tek eksik kalan dublicate email (modelde ki uniqe kontrolü) kaydedilmek istendiğinde register yapıldığında bizi kaydetmiş gibi yapıp login e atıyor. Database kontrol ettiğimizde ise dublicate err nedeniyle yeni kullanıcı oluşturmuyor. Bunu frontend tarafında da kontrol edip yönetmemiz gerekiyor.
Bunu nasıl kontrol edeceğimiz anlamak için genel error mesajını userController da tekrar yazdırıyoruz. Tekrar aynı email ile kayıt için register yaptığımızda console da dublicate key error hatasını görürüz. Burada error u detaylı incelediğimizde error code olarak 11000 döndüğünü görürüz biz de bu hatayı yine userController da bu error code undan yakalayacağız.
Bunun için userController createUser catch kısmında yeni bir if kontrolü yapıyoruz. error.code === 11000 se error2.email ine bu hatayı bas diyoruz.

    if (error.code === 11000) {
      errors2.email = "The Email is already registered";
    }

Son olarak ta redirect durumunu backend de değil frontend de yapıyoruz. userController da 201 durumunda redirect yapmayıp sadece user ı dönüyoruz. register ejs içindeki script içinde data varsa diye kontrol ettiğimiz if in altında yeni bir if açıp register olduğunda bize user döndüğü için eğer data.user varsa login'e redirect yap diyoruz.

        if (data.user) {
          location.assign("/login");
        }

Yukarıda anlattığım register.ejs içindeki scriptin tamamı bu şekilde:

  <script>
    const form = document.querySelector("form");
    const emailError = document.querySelector("#email");
    const passwordError = document.querySelector("#password");
    const usernameError = document.querySelector("#username");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      emailError.textContent = "";
      passwordError.textContent = "";
      usernameError.textContent = "";
      emailError.style.display = "none";
      passwordError.style.display = "none";
      usernameError.style.display = "none";

      const email = form.email.value;
      const password = form.password.value;
      const username = form.username.value;

      try {
        const res = await fetch("users/register", {
          method: "POST",
          body: JSON.stringify({ email, password, username }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data) {
          if (data.email) {
            emailError.textContent = data.email;
            emailError.style.display = "block";
          }

          if (data.password) {
            passwordError.textContent = data.password;
            passwordError.style.display = "block";
          }

          if (data.username) {
            usernameError.textContent = data.username;
            usernameError.style.display = "block";
          }
        }

        if (data.user) {
          location.assign("/login");
        }
      } catch (err) {
        console.log("ERR::", err);
      }
    });
  </script>

- Session 15
  Fotoğraf - Kullanıcı İlişkisi, Fotoğraf Yükleme, Dashboard Sayfası

- Kullanıcı tarafından yüklenen fotoğrafların kendi dashboard sayfasında görüntülenmesi, ve ana sayfada tüm fotoğraflar içerisinde yer alması işlemleri yapacağız.

- Öncelikle dashboard sayfasına bir buton eklememiz gerekiyor. Fotoğraf yüklemek için bu butona tıklandığında bir modal açacağız ve bu modal vasıtasıyla fotoğraflarımızı yükleyip post edeceğiz ardından tekrar kendi dashboard sayfamıza yönlenip yüklediğimiz fotoğrafı dashboar'umuzda göreceğiz.

- Dashboard sayfamıza modal açmak için butonumuzu ekliyoruz.
- Ardından Modalımızın html kısmını ekliyoruz.
- Modal a baktığımızda içerisindeki formun action ında "/photos" a istek POST isteği yaptığını görüyoruz.
- Bu istek photoRoute'a baktığımızda gelen post isteğini post(photoController.createPhoto) buraya Yönlendiriyor.
- photoController.createPhoto yu incelediğimizde ise bize fotoğrafı oluşturup bize bir json dönüyor.

  const photo = await Photo.create(req.body);
  res.status(201).json({
  succeded: true,
  photo,
  });

- Şimdi bir deneme yaptığımızda butona tıklayıp modalı a.ıyoruz ardından isim ve descripton kısmını dolduruyoruz. (fotoğraf yüklenme işlemini daha sonra yapacağız) post ettiğimizde bize bir json döner. Veri tabanında da yeni foto oluşturulur.

- Şimdi biz bu yükleme işleminden sonra bize json dönmesi durumunu değiştiriyoruz. Ve bizi tekrar dashboard sayfasına yönlendirmesini istiyoruz. Bunun için res.status(201) den sonra redirect yapıyoruz.

res.status(201).redirect("/users/dashboard");

- Şimdi fotoğraflar ile kullanıcılar arasındaki ilişkiyi kurmamız gerekiyor.
  Yüklenen fotoğrafın yükleyen kullanıcının bilgisini de taşıması gerekiyor. Bu yüklemeyi yapan kullanıcı da aslında giriş yapmış olan kullanıcı olmuş oluyor.

- Öncelikle biz fotoğraf ile user ilişkisini oluşturalım.
  Bunun için photoModel.js de schema mıza geliyoruz ve user için yeni bir schema ekliyoruz. buraya eklediğimiz referans User modal ına referans verilecek. Ref UserModal.js içindeki User modal ile eşleşmesi gerekiyor.

- Tekrar photoController.js içindeki createPhoto fonksiyonunda oluşturulan fotoğrafı değişkene atamaya gerek yok. Ayrıca user bilgisini localdeki userdan alacağımız için createPhoto daki create içine verdiğimiz req.body yi
  güncelliyoruz.

await Photo.create({
name: req.body.name,
description: req.body.description,
user: res.locals.user.\_id,
});
res.status(201).redirect("/users/dashboard");

burada name ve description 'ı verirken dikkat etmemiz gereken req.body.name ve req.body.description verdim bunlar dashboard.ejs içinde modaldaki name ve description inputlarının name propertysine eşit olacak.
user ise authMiddleware içinde res.locals.user olarak locals den aldığımız user ı veriyoruz. Post işlemi yaptığımızda user 'ın id sine de ulaşmamız gerekecek bunun için post işleminde de checkUser'ın çalışması için app.js içinde app.get("_", checkUser) router ı app.use("_", checkUser) olarak değiştiriyoruz. app.use demek hem get hem post için de çalıştırsın demek.

app.use("\*", checkUser)

Ardından Bir fotoğraf ekleyip ardından database kontrol ettiğimizde giriş yapmış kullanıcı id sinin artık photos da oluşturulan photo içinde user id nin de olduğunu görürüz.

- Şimdi dashboardda kullanıcının kendi yüklediği fotoğrafları görmesini sağlayacağız.

Bunun için dashboard.ejs içinde fotoğrafları göreceğimiz html kısmını oluşturacağız bunun için photos.ejs içindeki galeri alanını dashboard a kopyalayabilriz.
Biz dashboard da yalnızca giriş yapan kullanıcıya ait olan fotoğrafları göstereceğiz bunun için userController da getDashboardPage fonksiyonu içinde dashboard'a photos ları da göndermemiz gerekir.
Bunun için getDashboardPage fonsiyonu içinde photos u oluşturacağız ve ardından dashboard page e göndereceğiz.

const getDashboardPage = async (req, res) => {
const photos = await Photo.find({ user: res.locals.user.\_id });
res.render("dashboard", {
link: "dashboard",
photos,
});
};

- Session 16
  Görsel Yüklemek, Cloudinary Platformu, Express File Upload Paketi

- Dashboard da fotoğraf yükleme ve dinamik olarak yüklenen fotoğrafları görüntülemek istiyoruz.
  Bunun için image içeriklerinin yüklenip depolanması için cloudinary.com sitesini kullanacağız. cloudinary den Signup oluyoruz. Cloudinary mizi projeye bağlamak için .env dosyasına
  CLOUD_NAME=dvblrw7rw
  CLOUD_API_KEY=761786431934488
  CLOUD_API_SECRET=FdG8uyPgSs9PRcTVbYY50xZvN

bu üç bilgiyi cloudinary dashboard kısmındaki key name ve secret verilerini ekliyoruz.

- Ardından media Library kısmında add folder diyerek yeni bir proje folder'ı açıyoruz. Bu clasudinary yi kullanmak için de install yapmamız gerekiyor.
  Hem de upload yaparken name property si ile görseli yüklemek için express-fileupload yüklüyoruz.

npm i cloudinary express-fileupload

- Yüklemenin ardından app.js imize fileUpload ve cloudinary yi import ediyoruz.

import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary"; (cloudinary nin v2 nin import'u yapıldığı için bu şekilde yaptık.)

- Yine app.js te claudinary config ayarlarını yapmak için;
  cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  });

ekliyoruz.

- Fileupload için ise app.js te middlewareler altına app.use u ekliyoruz. Parametre olarak ta useTempFiles: true ekliyoruz. Bu bizxe ana dizinde geçici bir tmp klasörü oluşturacak.

app.use(fileUpload({ useTempFiles: true }));

- Ardından photoController.js e geliyoruz.
  import { v2 as cloudinary } from "cloudinary"; cloudinary yi import edip createPhoto fonksiyonu içinde cloudinary ye fotoğrafları upload etmesi için kodları ekliyoruz.

  const result = await cloudinary.uploader.upload(
  req.files.image.tempFilePath,
  {
  use_filename: true,
  folder: "lenslight_tr",
  }
  );

parametre olarak req.files.image.tempFilePath ve {
use_filename: true,
folder: "lenslight_tr",
}
objesini veriyoruz. Obje içindeki use_filename : true olması claudinary içindeki filename i kullan diyoruz. folder olarak ta yine claudinary içindeki folder ismini veriyoruz.
req.files.image.tempFilePath i kullanabilmek için req.files.image ulaşabilmesi için ejs içinde yükleme yaptığımız alandaki input un name ine image veriyoruz. fileuploader name parametresinden yakalaması gerektiği için. Ayrıca formun görsel eklemesini yapabilmesi içinde form tag ına enctype="multipart/form-data" veriyoruz.

- Ardından foto yükleme için denediğimizde dashboardda statik image ın geldiğini görebiliriz. Aynı şekilde claudinary ye gidip baktığpımızda eklediğimiz fotoğrafın yüklendiğini görebiliriz. Şimdi bizim yüklediğimiz fotoğrafın dashboardda da dinamik bir şekilde gelmesini sağlayacağız.

- photo controllerda claudinary upload fonksiyonunu result değişkenine atamıştık. Bunu console yaptığımzıda ekleme yaptığımız fotoğrafın parametreleri arasında secure_url olduğunu görürüz. Bu yüklediğimiz fotoğrafın dinamik claudinary linki url i. Bunu img tagına dinamik bir şekilde basarsak her yüklediğimiz foto url i dinamik şekilde gelecek.

- Şimdi dinamik oalrak fotoğraf url lerini tutmak içinde photoModel de bir alan açmamız gerekiyor. photoSchema altına bir url alanı da ekliyoruz.

  url: {
  type: String,
  required:true,
  }

- Ardından photoControllerda fotoğrafı create ederken url de ekliyoruz. result'un secure_url inide url olarak create yap dedik.

  await Photo.create({
  name: req.body.name,
  description: req.body.description,
  user: res.locals.user.\_id,
  url: result.secure_url,
  });

Yeni fotoğraf oluşturup deneme yaptığımzıda databasede oluşan fotoğrafa url in eklendiğini görebiliriz. Ardından fotoğrafları dinamik hale getirmek içinde dashboard.ejs de fotoğrafları göstereceğimiz alanda img tagında src kısmını dinamik olarak photo.url den aldiyoruz.

<img src="<%= photo.url %>" alt="<%= photo.name %>" />

Şimdi tekrar fotoğraf yükleyip denediğimizde dashboad sayfamızda dinamik bir şekilde yüklediğimiz fotoğrafları görebiliriz. Aynı şekilde claudinary kontrol ettiğimizde fotoğraflarımızın orada da depolandığını görebiliriz.

- Şimdi claudinary ye yükleme yaparken photo create yaparken bir parametre verip tmp klasörü içinde yüklediğimiz fotoğrafların dos hallerini de depolamıştık. Bu klasör her fotoğrafta depolama yapacağı için şişer claudinary nin bir anlamı kalmaz. Bu nedenle fotoğraf yükleme işlemimiz bittiğinde bu klasördeki fotoğraf dosyasıylada işimiz bitecek bu yüzden yükleme sonrası bu dosyayı da silmemiz gerekiyor.

- Bunun için photoController.js içinde node pakaetin defaul içerisinde bulunan fs modulünü import ediyoruz.
  import fs from 'fs'

- Ardından photoController.js te fotoğrafı create yaptığımız fonksiyonda create işlemi bittikten sonra tmp dosyasını kaldırmak için kodumuzu ekliyoruz.

  try {
  await Photo.create({
  name: req.body.name,
  description: req.body.description,
  user: res.locals.user.\_id,
  url: result.secure_url,
  });

  fs.unlinkSync(req.files.image.tempFilePath); //! <-------

  res.status(201).redirect("/users/dashboard");
  }

- Tekrar bir fotoğraf yükleyip deneme yaptığımızda tmp klasörünün oluştuğu ancak içerisinin boş olduğunu görmüş oluruz.

- Şimdi yüklediğimiz fotoğraf dashboardda dinamik olarak görünüyor. Ama bu fotoğrafa tıklayıp foto detayına gittiğimizde dinamik bir şekilde yüklenen fotoğrafın yüklenmediğini görürüz. Fotoğraf detayı sayfasında da yüklenen ve detayına gidilen fotoğrafın dinamik olarak kendi görseli ve bilgilerinin olmasını istiyorum. Bunun için photo.ejs dosyasına gidiyoruz. Ve img tagının src sini photo.url alacak şekilde dinamik hale getiriyoruz.

<figure><img src="<%= photo.url %>" alt="<%= photo.name %>" /></figure>

Sayfada fotoğrafçının isminide göstermek istiyoruz. Bunun içinde photo database imizde bulunan photo user id ile user a ulaşmak istiyoruz. Bunun için yine photo.ejs de fotoğrafçının ismini basacağımız alana ekliyoruz.
<%= photo.user.username %>
Ama bu yeterli gelmeyecek. PhotoController.js te getAPhoto fonksiyonumuzda ilgili fotoğrafı getirirken ayrıca user ı da populate edip onun bilgilerini de getir demek için .populate("user") ekliyoruz.

const getAPhoto = async (req, res) => {
try {
const photo = await Photo.findById({ \_id: req.params.id }).populate("user")
res.status(200).render("photo", {
photo,
link: "photos",
});
} catch (error) {
res.status(500).json({
succeded: false,
error,
});
}
};

- Son olarak tekrar bir fotoğraf yüklediğimizde ve foto detayına gittiğimizde tüm resimler ve bilgilerin dinamik olarak geldiğini görebiliriz.

- Session 17
  Tekil ve Çoğul Kullanıcı Sayfaları, Fotoğraf - Kullanıcı İlişkisi II

- Kullanıcılar sayfasını düzenlemek için users.ejs dosyası oluşturup gerekli partials düzenlemelerini yapıyoruz. Gerekli partials ları ekledikten sonra \_menu.ejs de users sayfası için yeni bir menu oluşturuyoruz. Bunu kullanıcılar authenticate olduğunda görebileceği için if user varsa nın içindeki linklerinyanına ekliyoruz.

              <li>
                <a class="<%= link === 'users' && 'active' %>" href="/users"
                  >Users</a
                >
              </li>

- Ardından userRoute da users 'ın yerlerini yazıyoruz. Linkimiz zaten //localhost/users olduğu için route u "/" vermemiz yeterli.

router.route("/").post(userController.getAllUsers); //localhost/users

- Ayrıca tekil kullanıcı için de bir route oluşturuyoruz.
router.route("/:id").post(userController.getAUser);

- Ardından userController.js e gelip route da yazdığımız  getAllUsers ve getAUser fonksiyonlarını oluşturuyoruz.


