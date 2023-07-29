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

-http://expressjs.com/en/starter/static-files.html#serving-static-files-in-express
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

-Sayfalarda mükerrer olan kısımları örneğin her sayfadakı head kısmı gibi, header gibi, footer gibi kısımları component mantığını oluşturmak için views altında partial adında klasör açıp _header.ejs, _menu.ejs gibi dosyalar oluşturup içerisinde topluyoruz. Ardından sayfalardan kestiğimiz yerlere bu _header.ejs yi veya component neyse alttaki gibi çağıtıyoruz.
<%- include("partials/_header") %>

-3. session MongoDb Atlas
-Mongodb adresinde hesabımıza giriş yapıp project içine giriyoruz ve Build a Database diyerek free olandan devam ediyoruz cloudlardan birisini seçiyoruz örn: aws sunucu adresi seçiyoruz örn:frankfurt ardundan create cluster diyoruz. Ve database oluşturuyoruz. Ardından gelen ekranda db ye ulaşacak user ın username ve password belirliyoruz. myLocal env ve ip adres girmek istersek girip (örn: 0.0.0.0/0)add entry ve ardından finish diyerek Database cluster'ımızı görüyoruz.
-Burada connect diyerek veri tabanına ulaşmak için gereken connection string e ulaşmak için Connect your application seçiyoruz ve connection string'i copyalayıp projemizde .env oluşturup bir key ile env dosyamıza ekliyoruz. Connection stringdeki Kullanıcı adı ve şifreyi güncelliyoruz.
örn: DB_URI=mongodb+srv://<username>:<password>@cluster0.vvkqftq.mongodb.net/?retryWrites=true&w=majority


- Mongo DB de DB Cluster oluşturduktan sonra dotenv paketini projemize yüklüyoruz. Bu paket uygulamamızda oluşturduğumuz çevre değişkenlerine (environment variable) ulaşabilmemizi sağlıyor. (npm i dotenv)

-Ayrıca mongoose paketini de yüklüyoruz. Mongoose genel olarak modeller içerisinde oluşturacağımız şema yapılayla doküman tabanlı mongodb verilerimizin kolaylıkla oluşturmamıza yarar. (npm i mongoose)

-Ardından app.js dosyamıza gidiyoruz ve öncelikle dotenv import edip config methodunu çalıştırmak için kodumuzu ekliyoruz. dotenv.config();
Ardık env dosyasında oluşturduğumuz variable lara erişebiliriz.

-Şimdi ise veri tabanı bağlantımızı oluşturacağız.
Bunun için bir db.js dosyası oluşturuyoruz.
Burada mongoose ile db ye connect func yazıyoruz. Bu arrow func öncelikle connection str olduğu string bağlantısını vereceğiz. ikinci olarak ta configuration objesi açıyoruz.
Onje içerisinde db veri tabanı ismimizi veriyoruz. Tabi önce Bu aşamada MongoDb sayfamıza DB mize gidip,
Db cluster ımızda Browse Collections tabına gidip Add my Ownd Data diyoruz ve Db name'i ve collection name i (collection rastgele girebilirsin) girip create diyoruz  veri tabanımızı oluşturuyoruz.

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
-