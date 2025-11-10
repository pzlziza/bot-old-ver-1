-- Create database (database soal)
CREATE DATABASE ypbuddies;
USE ypbuddies;

CREATE TABLE chat_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(50),
  role ENUM('user','bot'),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel soal (dengan gambar)
CREATE TABLE soal (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mata_pelajaran VARCHAR(50),
  nomor_soal INT,
  pertanyaan TEXT,
  gambar_soal VARCHAR(255),
  opsi_a TEXT,
  opsi_b TEXT,
  opsi_c TEXT,
  opsi_d TEXT,
  opsi_e TEXT,
  jawaban CHAR(1),
  gambar_pembahasan VARCHAR(255),
  pembahasan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- soal Literasi Bahasa Indonesia
INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, gambar_soal, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
("Literasi Bahasa Indonesia", '1', "Budi melihat bahwa salah satu syarat dalam tugas esai tentang tindak korupsi adalah berciri esai persuasif. Untuk memenuhi syarat tersebut, Budi menyisipkan infografik berikut ke dalam esainya. Siapa sasaran pembaca esai Budi?", 'Indo1.png', "Penduduk desa", "Perangkat desa", "Aktivis antikorupsi", "Aparat penegak hukum", "Peneliti pemerintahan desa", "A", "Infografik yang tercantum merupakan teks persuasi yang mengandung argumen dan langkah-langkah untuk membangun desa. Infografik tersebut menyampaikan bahwa warga desa adalah subjek pembangunan dan bahwa kesejahteraan desa ditujukan dan ditentukan oleh warga. Informasi tersebut menyiratkan bahwa infografik tersebut dibuat untuk dibaca oleh warga desa. Dengan demikian, pilihan A tepat.
Pilihan B, C, D, dan E tidak tepat karena kelompok-kelompok pembaca dalam pilihan-pilihan tersebut tidak mewakili warga desa secara luas (terlalu spesifik).");

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Literasi Bahasa indonesia', '2', 'Agus, seorang murid kelas 12, sedang memikirkan jurusan kuliah yang tepat. Karena tidak tahu apa saja yang harus dipertimbangkannya, dia melakukan pencarian informasi di internet dan menemukan artikel berikut.
Tips Memilih Jurusan Kuliah
(1) Perhatikan Hobi
Ketika sedang melakukan hobi, kamu sangat terfokus dan merasakan kesenangan dari kegiatan yang sedang kamu lakukan. Artinya, kegiatan hobimu merupakan ekspresi minat dan bakat yang kamu miliki tapi mungkin belum kamu sadari. Oleh sebab itu, perhatikan jenis hobimu. Jurusan kuliah yang tepat adalah jurusan yang mengembangkan minat dan bakatmu yang sejati.
(2) Dengarkan Orang Terdekat
Orang bisa saja keliru atau tidak lengkap dalam menilai dirinya sendiri. Oleh sebab itu, kamu memerlukan masukan dari orang-orang terdekatmu. Mereka memiliki sudut pandang yang berbeda sehingga penilaian mereka atas dirimu barangkali belum atau bahkan tidak akan pernah terpikirkan olehmu. Pilihlah orang-orang dekat yang kamu percayai dan tanya mereka tentang kelebihan dan kekuranganmu.
(3) Ikuti Tes Minat dan Bakat
Tes minat dan bakat merupakan cara termudah mengetahui jurusan yang tepat untuk kamu. Tes ini dikembangkan dari hasil penelitian-penelitian psikologis. Kamu diminta untuk menjawab pertanyaan-pertanyaan seputar aktivitas kesukaanmu dan masa depan impianmu. Selain itu, ada juga pertanyaan-pertanyaan yang mengevaluasi kemampuan deduktif, induktif, aritmatika, spasial, dan penalaran. Hasil tes ini akan memperlihatkan 10 rekomendasi jurusan kuliah yang tepat untuk kamu.
(4) Perhatikan Nilai Rapor
Laporan hasil pembelajaran di sekolah juga dapat menjadi bahan pertimbanganmu saat memilih jurusan kuliah. Perhatikan nilai-nilaimu yang tinggi, sedang dan kurang. Ingat kembali faktor-faktor penyebab kamu mendapatkan nilai-nilai tersebut. Perenungan ini akan mengungkapkan besar kecilnya minatmu terhadap mata-mata pelajaran tertentu.
(5) Survei Lapangan Pekerjaan
Pada akhirnya, lulusan universitas diharapkan dapat memberikan manfaat ekonomi bukan hanya bagi sang lulusan sendiri tapi juga bagi masyarakat luas. Melakukan survei lapangan pekerjaan dapat membantumu memperkecil jumlah pilihan jurusan kuliah sehingga proses pertimbanganmu menjadi lebih mudah. Memilih jurusan kuliah yang tidak berprospek perkembangan ekonomi di masa depan tentunya hanya akan menjadi usaha menjaring angin.
Jika Agus hanya ingin menjalankan tips yang berlandasan ilmiah, ia seharusnya menjalankan tips nomor ….',
'1', '2', '3', '4', '5', 'C',
'Tips yang berlandasan ilmiah adalah tips yang mengusulkan suatu kegiatan yang dirancang dengan metode ilmiah. Kegiatan semacam itu diusulkan dalam tips nomor 3, mengikuti tes minat dan bakat. Jadi, pilihan C tepat.
Keterangan tips tersebut menyatakan bahwa tes minat dan bakat dikembangkan dari hasil penelitian-penelitian psikologis. Karena psikologi merupakan bidang keilmuan akademis, penelitian psikologis tentunya untuk menerapkan metode penelitian ilmiah. Dengan demikian, tes minat dan bakat adalah tips yang berlandasan ilmiah.
Pilihan A, B, D, dan E tidak tepat karena keterangan tips nomor 1, 2, 4, dan 5 tidak menyatakan secara tersurat maupun tersirat keilmiahan landasan tips-tips tersebut.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Literasi Bahasa Indonesia', '3', 'Agus menjalankan semua tips yang ia baca dari artikel “Tips Memilih Jurusan Kuliah.” Saat menjalani tes minat dan bakat, tiba-tiba muncul rasa ingin tahu dalam diri Agus. Ia ingin tahu cara kerja tes tersebut. Dalam beberapa hari berikutnya, Agus pun menggunakan waktu-waktu luangnya untuk mencari dan mempelajari banyak tulisan perihal tes minat dan bakat. Salah satunya adalah sebagai berikut.
Enam Model Kepribadian Holland
Tes minat dan bakat juga dapat dilandaskan pada Teori Pemilihan Karir yang dikembangkan oleh John Holland, seorang profesor psikologi dari Universitas Johns Hopkins. Dalam teorinya, Holland merumuskan enam model kepribadian.
Kepribadian Realistis
Orang-orang yang berkepribadian realistis suka terlibat dalam kegiatan-kegiatan fisik. Mereka lebih suka bekerja dengan benda-benda mati ketimbang dengan ide-ide abstrak atau orang-orang. Orang-orang dalam kelompok kepribadian ini umumnya lebih mudah belajar melalui praktik daripada melalui paparan yang teoritis.
Kepribadian Investigatif
Orang-orang dalam kelompok kepribadian investigatif cenderung menyukai kegiatan-kegiatan yang mengandalkan kekuatan pikiran. Mereka suka melakukan observasi, menganalisis, mengevaluasi, dan memecahkan masalah, khususnya masalah rumit yang bersifat ilmiah. Mereka lebih suka berkutat dalam alam pikiran daripada menjalani kegiatan sosial.
Kepribadian Artistik
Orang yang berkepribadian artistik selalu mencari kesempatan untuk mengekspresikan dirinya secara bebas dan orisinal. Hal tersebut membuat mereka sulit mematuhi suatu peraturan atau konvensi. Estetika menjadi keutamaan mereka dan hal tersebut diekspresikan dalam kegiatan-kegiatan kesenian yang kreatif dan imajinatif.
Kepribadian Sosial
Kepribadian ini dimiliki oleh orang-orang yang menikmati bekerja dengan orang lain. Mereka suka membantu, melatih, mengajar, dan merawat orang lain. Ketika menghadapi kesulitan, mereka akan mengajak orang lain untuk berdiskusi dan memutuskan solusi bersama. Orang-orang dalam kelompok ini umumnya tidak dapat menikmati pekerjaan fisik dengan benda-benda mati.
Kepribadian Pengusaha
Orang-orang yang berkepribadian usahawan suka bekerja dengan orang lain dalam rangka mencapai suatu tujuan atau sasaran tertentu. Mereka suka berada di posisi pemimpin atau pengatur strategi. Mereka cakap dalam mengatur, mengarahkan, dan memengaruhi orang lain supaya tujuan dan sasaran yang telah ditetapkan dapat tercapai secara efisien.
Kepribadian Konvensional
Orang dalam kelompok kepribadian konvensional cenderung menikmati bekerja dengan data. Ia lebih memerhatikan rincian-rincian daripada orang-orang pada umumnya. Ia juga lebih menyukai struktur yang baku dan jelas serta sulit menghadapi situasi-situasi yang bersifat ambigu.
Apa model kepribadian yang tepat untuk mendeskripsikan Agus jika kamu sedang menilai Agus?', 'Realistis dan Sosial', 'Sosial dan Pengusaha', 'Investigatif dan Artistik', 'Pengusaha dan Konvensional', 'Konvensional dan Investigatif', 'E',
'Ilustrasi menyatakan Agus sebagai orang yang tiba-tiba ingin tahu perihal tes minat dan bakat. Untuk memuaskan rasa ingin tahunya itu, Agus dikatakan menggunakan waktu-waktu luangnya di beberapa hari untuk “mencari dan dan mempelajari banyak tulisan perihal tes minat dan bakat.”
Bagian ilustrasi tentang Agus tersebut mengungkapkan ciri-ciri yang sesuai dengan kepribadian investigatif dan konvensional. Jadi, pilihan E tepat. Keterangan tentang kepribadian investigatif menyatakan bahwa orang dengan kepribadian ini suka melakukan observasi dan menganalisis. Pernyataan ini bersesuaian dengan ilustrasi perilaku Agus yang menggunakan waktu-waktu luang untuk mencari dan mempelajari banyak tulisan hanya demi memuaskan rasa ingin tahunya.
Selain itu, keterangan tentang kepribadian konvensional menyatakan bahwa orang dengan kepribadian ini cenderung menikmati bekerja dengan data dan lebih memperhatikan rincian-rincian daripada orang-orang pada umumnya. Pernyataan ini bersesuaian dengan ilustrasi perilaku Agus yang ingin tahu cara kerja sebuah tes sementara pada umumnya orang hanya ingin mengerjakan dan menyelesaikan tes tersebut.
Pilihan A, B, C, dan D tidak tepat karena setiap pilihan tersebut menyebutkan kepribadian yang tidak bersesuaian dengan ilustrasi perilaku Agus (Realistis, Sosial, Pengusaha, dan Artistik).');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Literasi Bahasa Indonesia', '4', 'Agus memutuskan untuk berkuliah di jurusan Psikologi. Keputusannya itu dibuat saat ia menyadari kalau ia senang mempelajari perihal kepribadian dan lega karena dapat menghindari matematika, momoknya selama ini.
Berikut ini adalah beberapa contoh mata kuliah program studi Psikologi yang wajib dijalani oleh mahasiswa jurusan Psikologi:
1. Antropologi Psikologi
2. Sosiologi
3. Sejarah dan Aliran Psikologi
4. Biopsikologi
5. Filsafat Ilmu dan Logika
6. Perilaku dan Proses Mental
7. Filsafat Manusia
8. Statistika Psikologi
9. Teori Perkembangan
10. Teori Kepribadian
11. Dasar-dasar Metode Penelitian
12. Psikometri
13. Kognisi Sosial
Berdasarkan contoh-contoh mata kuliah tersebut, apa yang membuat keputusan Agus dapat dikatakan tidak tepat?',
'Beberapa mata kuliah di jurusan psikologi menuntut sikap investigatif sekaligus sosial.', 'Mahasiswa psikologi wajib mempelajari bidang-bidang ilmu yang baru bagi Agus.', 'Ia memiliki asumsi yang keliru tentang perkuliahan di jurusan psikologi.', 'Kemampuan matematika Agus di bawah standar.', 'Psikologi tidak hanya mempelajari kepribadian.',
'Ilustrasi menyebutkan bahwa Agus merasa lega karena ia berasumsi bahwa dengan memilih jurusan Psikologi, ia dapat menghindari matematika yang merupakan momoknya.
Namun, daftar beberapa contoh mata kuliah program studi Psikologi menunjukan mata kuliah Statistika Psikologi dan Psikometri yang merupakan ilmu-ilmu turunan dari matematika. Kata “statistika,” yang merupakan cabang ilmu matematika, dan unsur kata “-metri,” yang berasal dari kata “metrik” yang berarti “berhubungan dengan ukuran,” dapat menjadi petunjuk keterkaitan dua mata kuliah tersebut dengan matematika.
Dengan demikian, keputusan Agus tidak tepat karena ia memiliki asumsi yang keliru tentang perkuliahan di jurusan Psikologi dan pilihan C tepat.
Pilihan A tidak tepat karena teks bacaan tidak memberikan petunjuk yang membenarkan pernyataan pada pilihan ini.
Pilihan B tidak tepat karena teks bacaan tidak menyatakan bahwa kebaruan bidang-bidang ilmu yang akan dipelajari Agus adalah faktor yang akan menyulitkan Agus saat berkuliah di jurusan Psikologi.
Pilihan D tidak tepat karena pernyataan bahwa matematika adalah momok bagi Agus tidak serta merta berarti bahwa kemampuan matematika Agus berada di bawah standar.
Pilihan E tidak tepat karena teks bacaan tidak menyebutkan baik secara tersurat maupun tersirat bahwa Agus memilih jurusan Psikologi atas dasar asumsi bahwa Psikologi hanya mempelajari kepribadian.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Literasi Bahasa Indonesia,', '5', 'Bahaya Mengonsumsi Hamburger
Hamburger merupakan salah satu makanan asal Kota Hamburg, Jerman, yang memiliki rasa yang enak, daging juicy yang gurih, dan berbagai macam isian yang lezat. Sayangnya, makanan yang memperoleh gelar junk food ini dipercaya memiliki efek buruk pada kesehatan jika dikonsumsi sering dan berlebih. Sebagian besar orang mengaitkannya dengan “penggagal diet”, “penambah berat badan”, atau “makanan berkalori tinggi”. Selain meningkatkan berat badan, hamburger juga memberikan dampak lain bagi tubuh menurut Lisa Moskovitz, ahli gizi sekaligus CEO dari New York Nutrition Group.
Saat seseorang memakan hamburger berukuran besar, tugas yang dilakukan oleh tubuh menjadi lebih berat dari biasanya. Selain mencerna dan mengubah sisa kalori menjadi lemak, tubuh akan mengalami peningkatan gula darah 10 menit setelah hamburger itu dimakan. Kandungan natrium (garam) dan fruktosa (gula) yang tinggi dalam hamburger memicu keinginan untuk mengonsumsi makanan berlemak. Hal ini terjadi sekitar 20 menit setelah gigitan pertama sehingga setangkup hamburger seringkali terasa tak cukup. Lalu, sekitar 30 menit kemudian, ginjal bekerja ekstra menyingkirkan lebihan natrium dalam tubuh dan jantung bekerja keras memompa darah ke pembuluh darah.
Karena energi tubuh sudah digunakan untuk mencerna sebuah hamburger, tak heran bila seporsi hamburger, yang mengandung sekitar 540 kalori, hanya bisa membuat seseorang merasa kenyang selama 40 menit hingga 1 jam. Setelah itu, pemakan hamburger akan merasa lapar kembali dan menginginkan makanan lain yang bisa membuatnya kenyang lebih lama.
Meskipun kecepatan metabolisme orang bervariasi, tubuh tetap membutuhkan waktu selama 2-3 hari untuk dapat mengolah dengan tuntas semua zat yang terkandung dalam seporsi hamburger berukuran besar. Oleh sebab itu, tak salah jika hamburger berada di urutan atas dalam daftar junk food yang tinggi kalori, kaya lemak, sulit mengenyangkan, dan berat diolah. Pernyataan mana yang benar menurut informasi dari teks tersebut?',
'Setiap orang yang memakan hamburger dapat merasakan gula darahnya naik.', 'Jantung dan ginjal merupakan bagian tubuh yang membutuhkan energi terbanyak.', 'Jantung harus bekerja ekstra karena menyingkirkan lebihan natrium dalam tubuh.', 'Memakan hamburger yang besar membuat organ-organ tubuh tertentu bekerja lebih keras dan lama.', 'Tubuh manusia dapat menyerap semua nutrisi yang ada di dalam hamburger dengan baik dan cepat kurang dari satu jam.', 'D',
'Dari kelima pilihan yang tersedia, hanya pilihan D yang berisi pernyataan yang sesuai dengan informasi dari teks. 
Informasi dalam paragraf kedua menyatakan bahwa ginjal (organ pembuangan) dan jantung (organ peredaran darah) bekerja ekstra setelah pengonsumsian hamburger berukuran besar. Selain itu, informasi di paragraf keempat menyatakan bahwa, terlepas dari kecepatan metabolisme, tubuh tetap memerlukan waktu 2-3 hari untuk dapat dengan tuntas mengolah hamburger berukuran besar. Informasi ini mengindikasikan durasi yang lama.
Pilihan A tidak tepat karena teks tidak memberikan informasi mengenai apakah orang yang memakan hamburger dapat merasakan gula darahnya naik atau tidak sehingga pernyataan di pilihan A tidak dapat dipastikan kebenarannya.
Pilihan B tidak tepat karena teks tidak memberikan informasi mengenai jumlah energi yang dibutuhkan oleh jantung dan ginjal untuk bekerja sehingga pernyataan di pilihan B tidak dapat dipastikan kebenarannya.
Pilihan C tidak tepat karena menurut informasi dalam paragraf kedua, organ yang berfungsi menyingkirkan lebihan natrium adalah ginjal, bukan jantung.
Pilihan E tidak tepat karena menurut informasi dalam paragraf keempat, tubuh manusia membutuhkan 2-3 hari, bukan 1 jam, untuk dapat mengolah dengan tuntas semua zat yang terkandung dalam hamburger berukuran besar. Sementara itu, informasi yang berkaitan dengan durasi 1 jam terletak di paragraf ketiga dan durasi tersebut adalah durasi rasa kenyang setelah memakan hamburger berukuran besar, bukan durasi penyerapan nutrisinya.');

-- soal Literasi Bahasa Inggris
INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Literasi Bahasa Inggris', '1', 'Earthquake is any sudden shaking of the ground caused by the passage of seismic waves through Earth’s rocks. Seismic waves are produced when some form of energy stored in Earth’s crust is suddenly released, usually when masses of rock straining against one another suddenly fracture and “slip.”
Earthquakes occur most often along geologic faults, narrow zones where rock masses move in relation to one another. The major fault lines of the world are located at the fringes of the huge tectonic plates that make up Earth’s crust.
Little was understood about earthquakes until the emergence of seismology at the beginning of the 20th century. Seismology, which involves the scientific study of all aspects of earthquakes, has yielded answers to such long-standing questions as why and how earthquakes occur. About 50,000 earthquakes large enough to be noticed without the aid of instruments occur annually over the entire Earth. Of these, approximately 100 are of sufficient size to produce substantial damage if their centers are near areas of habitation.
Very great earthquakes occur on average about once per year. Over the centuries they have been responsible for millions of deaths and an incalculable amount of damage to property. The paragraph following the passage most likely discusses ….',
'suggestions to emerge the seismology to detect the earthquake', 'examples of the substantial damage that caused by the earthquake', 'the development of seismology to identify the earthquake earlier', 'factors that cause the earthquake and seismic wave', 'the reason why we need the seismology', 'B',
'Soal menanyakan topik yang kemungkinan besar dibahas pada paragraf selanjutnya setelah teks tersebut. Dalam sebuah wacana, topik sebuah paragraf lanjutan harus padu dengan topik paragraf sebelumnya. Untuk menguji kepaduan ini, pembaca dapat melihat pada bagian penutup paragraf dan bagian awal paragraf selanjutnya. Kepaduan dua paragraf tersebut akan terlihat dari bagian-bagian tersebut.
Bagian penutup paragraf terakhir di teks bacaan adalah kalimat over the centuries they have been responsible for millions of deaths and an incalculable amount of damage to property. Kalimat penutup ini berbicara mengenai akibat gempa, yaitu hilangnya nyawa manusia dan kerusakan-kerusakan properti. Dari lima pilihan topik yang tersedia, topik yang paling padu dengan kalimat ini adalah examples of the substantial damage that caused by the earthquake. Paragraf dengan topik tersebut akan menjadi paragraf yang padu dengan paragraf terakhir dalam teks bacaan.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Literasi Bahasa Inggris', '2', 'Earthquake is any sudden shaking of the ground caused by the passage of seismic waves through Earth’s rocks. Seismic waves are produced when some form of energy stored in Earth’s crust is suddenly released, usually when masses of rock straining against one another suddenly fracture and “slip.” Earthquakes occur most often along geologic faults, narrow zones where rock masses move in relation to one another. The major fault lines of the world are located at the fringes of the huge tectonic plates that make up Earth’s crust.
Little was understood about earthquakes until the emergence of seismology at the beginning of the 20th century. Seismology, which involves the scientific study of all aspects of earthquakes, has yielded answers to such long-standing questions as why and how earthquakes occur. About 50,000 earthquakes large enough to be noticed without the aid of instruments occur annually over the entire Earth. Of these, approximately 100 are of sufficient size to produce substantial damage if their centers are near areas of habitation.
Very great earthquakes occur on average about once per year. Over the centuries they have been responsible for millions of deaths and an incalculable amount of damage to property. What is the author’s attitude towards the topic of the passage?',
'Concerned', 'Critical', 'Informative', 'Satisfied', 'Optimistic', 'C',
'Soal menanyakan sikap penulis terhadap teks tersebut. Sikap penulis dalam sebuah wacana dinyatakan dengan kata sifat, seperti yang terlihat pada pilihan-pilihan yang tersedia. Supaya dapat menentukan kata sifat yang tepat, pembaca perlu memperhatikan hal-hal seperti pilihan kata, jenis kalimat (kalimat fakta atau opini), asumsi, kesimpulan, dan keberpihakan penulis baik yang tersurat maupun tersirat dalam tulisannya.
Teks bacaan menunjukan bahwa topik pembicaraan penulis adalah peristiwa gempa bumi. Di paragraf pertama, penulis memberikan definisi serta menjelaskan proses terjadinya gempa bumi. Di paragraf selanjutnya, penulis berbicara tentang bidang keilmuan seismologi serta terobosan yang dicapainya.
Dalam kedua paragraf tersebut, penulis secara konsisten memakai kalimat-kalimat yang bersifat faktual. Selain itu, tidak ada kalimat, frasa, atau kata yang memperlihatkan reaksi pribadi penulis terhadap topik yang dibicarakannya. Dari lima pilihan kata sifat yang tersedia, kata informative adalah kata yang paling tepat menggambarkan sikap penulis.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Literasi Bahasa Inggris', '3', 'Read the text and answer the question! Earthquake is any sudden shaking of the ground caused by the passage of seismic waves through Earth’s rocks. Seismic waves are produced when some form of energy stored in Earth’s crust is suddenly released, usually when masses of rock straining against one another suddenly fracture and “slip.”Earthquakes occur most often along geologic faults, narrow zones where rock masses move in relation to one another. The major fault lines of the world are located at the fringes of the huge tectonic plates that make up Earth’s crust.
Little was understood about earthquakes until the emergence of seismology at the beginning of the 20th century. Seismology, which involves the scientific study of all aspects of earthquakes, has yielded answers to such long-standing questions as why and how earthquakes occur. About 50,000 earthquakes large enough to be noticed without the aid of instruments occur annually over the entire Earth. Of these, approximately 100 are of sufficient size to produce substantial damage if their centers are near areas of habitation.
Very great earthquakes occur on average about once per year. Over the centuries they have been responsible for millions of deaths and an incalculable amount of damage to property. What will happen when seismic waves pass through Earth’s rocks?',
'It will answer why and how earthquakes occur.', 'It may cause an earthquake.', 'It will store some form of energy in Earth’s crust.', 'The masses of rock will slip.', 'It may produce seismic waves.', 'B',
'Soal tersebut menanyakan hal yang akan terjadi ketika gelombang seismik melewati batuan bumi. Informasi tentang gelombang seismik dapat ditemukan dalam paragraf pertama. Dikatakan bahwa gempa bumi ‘adalah setiap guncangan tiba-tiba dari tanah yang disebabkan oleh lewatnya gelombang seismik melalui batuan bumi.’ Berdasarkan pendefinisian tersebut,  dapat disimpulkan bahwa jika lempengan bumi menerima gelombang seismik, gempa bumi akan terjadi.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Literasi Bahasa Inggris', '4', 'The question is based on the following passage. TikTok is often applauded for its recommendation system; once it’s finely tuned, the app becomes one of the best scrolling experiences. My personal theory is that’s why TikTok is so addicting—everything is so perfectly curated to your specific interests, it’s hard to put the phone down once you’re sucked in. However, TikTok’s recommendation algorithm still has its own flaws that the company brings up in its new blog post.
“One of the inherent challenges with recommendation engines is that they can inadvertently limit user experience–what is sometimes referred to as a ‘filter bubble’,” the post reads. It states that by optimizing for personalization and relevance, there is a risk of presenting an increasingly homogenous stream of videos.
Another issue that TikTok takes seriously is not surfacing dangerous content. This is an issue that YouTube in particular has faced criticism over for many years. According to TikTok, content that has graphic material like medical procedures or “legal consumption of regulated goods,” like alcohol, may not be eligible for recommendation because it could come across as “shocking if surfaced as a recommended video to a general audience”.
That’s why many creators on TikTok will upload a video more than once or talk openly about feeling shadow banned over particular content. The writer of the passage intends to …',
'illustrate TikTok users’ concerns about the app’s recommendation system', 'oppose the idea that TikTok has a sophisticated recommendation system', 'warn the readers about TikTok’s poor recommendation system', 'inform about the downsides of TikTok’s recommendation system', 'explain how TikTok resolves the recommendation system issue', 'D',
'Soal menanyakan tujuan penulis menulis teks tersebut. Tujuan seorang penulis tercermin dari topik dan kesimpulan yang terdapat di dalam tulisannya. Oleh sebab itu, pembaca perlu memahami dua hal tersebut lebih dulu supaya dapat menentukan tujuan penulis.
Dalam paragraf pertama teks bacaan, penulis memperkenalkan sistem rekomendasi aplikasi TikTok dan menyebutkan bahwa sistem tersebut masih memiliki kekurangan. Di paragraf kedua, penulis menyebutkan kekurangan yang pertama, yaitu membatasi pengalaman pengguna. Kemudian, di paragraf ketiga, penulis membahas kekurangan lainnya, yaitu ketidakmunculan video-video tertentu yang mengandung konten yang melanggar kebijakan TikTok.
Kebijakan ini membuat para pembuat video merasa dilarang secara diam-diam. Melihat topik-topik setiap paragraf tersebut, dapat disimpulkan bahwa tujuan penulis adalah menjabarkan kekurangan-kekurangan sistem rekomendasi TikTok.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Literasi Bahasa Inggris', '5', 'The question is based on the following passage. TikTok is often applauded for its recommendation system; once it’s finely tuned, the app becomes one of the best scrolling experiences. My personal theory is that’s why TikTok is so addicting—everything is so perfectly curated to your specific interests, it’s hard to put the phone down once you’re sucked in. However, TikTok’s recommendation algorithm still has its own flaws that the company brings up in its new blog post.
“One of the inherent challenges with recommendation engines is that they can inadvertently limit user experience–what is sometimes referred to as a ‘filter bubble’,” the post reads. It states that by optimizing for personalization and relevance, there is a risk of presenting an increasingly homogenous stream of videos.
Another issue that TikTok takes seriously is not surfacing dangerous content. This is an issue that YouTube in particular has faced criticism over for many years. According to TikTok, content that has graphic material like medical procedures or “legal consumption of regulated goods,” like alcohol, may not be eligible for recommendation because it could come across as “shocking if surfaced as a recommended video to a general audience”.
That’s why many creators on TikTok will upload a video more than once or talk openly about feeling shadow banned over particular content. On the basis of the passage, it can be predicted that …',
'Video creators on TikTok will avoid creating dangerous content.', 'TikTok will be considered a safer social media platform compared to YouTube.', 'Videos with sensitive content can only be recommended for a specific scope of viewers.', 'Other social media platforms will look up to TikTok for its good recommendation system.', 'Users will be exposed to topics outside their preferences in their recommendation feeds.', 'A',
'Soal menanyakan prediksi yang dapat dibuat dari teks bacaan. Prediksi adalah simpulan tentang apa yang akan terjadi dalam kaitan dengan sebuah informasi. Meskipun kebenaran atau ketepatannya belum dapat ditentukan, sebuah prediksi yang baik harus berhubungan logis dengan informasi yang melandasinya.
Pilihan A adalah sebuah prediksi yang baik karena pernyataannya berhubungan logis dengan informasi yang disampaikan dalam paragraf ketiga, yaitu bahwa TikTok tidak akan merekomendasikan video yang mengandung konten yang melanggar kebijakan TikTok. Jika para pembuat video menginginkan video-video mereka banyak ditonton, mereka tentunya akan berusaha menghindari konten yang melanggar kebijakan TikTok.
Pilihan B adalah sebuah prediksi yang tidak baik karena pernyataannya berkaitan dengan persaingan antara TikTok dengan aplikasi lain, YouTube, yang tidak dibahas secara mendalam oleh penulis. Dengan kata lain, teks bacaan tidak memberikan informasi yang cukup tentang strategi YouTube dalam mengatasi permasalahan konten berbahaya sehingga pembaca dapat membandingkannya dengan TikTok.
Pilihan C tidak dapat disebut sebagai sebuah prediksi. Pernyataan ini hanya simpulan tersirat dari informasi yang sudah dicantumkan dalam paragraf ketiga, yaitu bahwa konten bergrafik seperti prosedur medis tidak memenuhi syarat untuk direkomendasikan karena dapat ‘mengejutkan jika direkomendasikan kepada khalayak umum’.
Pilihan D adalah sebuah prediksi yang tidak baik karena alasan yang serupa dengan alasan pada pilihan B. Teks tidak memberikan informasi yang cukup mengenai aplikasi-aplikasi lain untuk digunakan sebagai landasan prediksi mengenai apa yang akan dilakukan oleh aplikasi-aplikasi tersebut.
Pilihan E juga tidak dapat disebut sebagai sebuah prediksi karena menyatakan sesuatu yang kemungkinan besar tidak akan terjadi. Paragraf kedua menjelaskan bahwa sistem rekomendasi TikTok beresiko menampilkan video-video yang homogen sehingga kemungkinan para pengguna tidak terekspos topik-topik di luar preferensi mereka');

-- soal Matematika
INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, gambar_soal, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, gambar_pembahasan, pembahasan)
VALUES
('Penalaran Matematika', '1', 'Gambar tersebut menunjukkan denah rumah Anton dengan skala 1:100. Diketahui luas bangunan sebenarnya adalah 12 m x 16 m. Setiap ruangan kecuali ruang keluarga dan ruang tamu berbentuk persegi panjang. Kemudian, diketahui pula luas setiap kamar sama. Luas toilet rumah Anton sebenarnya adalah ….',
'mtk1.png', '6 m&sup2', '12 m&sup2', '1.200 m&sup2', '6.000 cm&sup2', '12.000 cm&sup2', 'B', 'pembahasanmtk1.png',
'Diketahui luas bangunan sebenarnya adalah 12 m x 16 m atau dapat ditulis 1.200 cm x 1.600 cm. Karena skala yang digunakan adalah 1:100, maka luas bangunan pada denah tersebut adalah 12 cm x 16 cm. Dapat diperhatikan bahwa panjang toilet pada denah tersebut adalah 6 cm. Artinya, panjang toilet sebenarnya adalah 100⋅6 cm = 600 cm.
Kemudian, lebar toilet pada denah tersebut adalah 16 – 5 – 5 – 4 = 2 cm. Artinya, lebar toilet sebenarnya adalah 100⋅2 cm = 200 cm.
Dengan demikian, luas toilet sebenarnya <i>L<sub>toilet</sub></i> = p × l = 600 cm × 200 cm = 120.000 cm<sup>2</sup> = <sup>120.000</sup>&frasl;<sub>10.000</sub> m<sup>2</sup> = 12 m<sup>2</sup><br><br>');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, gambar_soal, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, gambar_pembahasan, pembahasan)
VALUES
('Penalaran Matematika', '2', 'Gambar di atas menunjukkan denah rumah Anton dengan skala 1:100. Diketahui luas bangunan sebenarnya adalah 12 m x 16 m. Setiap ruangan kecuali ruang keluarga dan ruang tamu berbentuk persegi panjang. Kemudian, diketahui pula luas setiap kamar sama.
Total luas ruang tamu dan luas ruang keluarga pada denah adalah … <i>cm&sup2</i>.', 'mtk2.png', '76', '82', '94', '110', '116', 'A' , 'pembahasanmtk2.png',
'Diketahui luas bangunan sebenarnya adalah 12 m x 16 m atau dapat ditulis 1.200 cm x 1.600 cm. Karena skala yang digunakan adalah 1:100, maka luas bangunan pada denah tersebut adalah 12 cm x 16 cm = 192 <i>cm&sup2.</i><br>
A = 6.(16-4)<br>
= 6.12<br>
=72 cm&sup2<br>
Dengan demikian, total luas ruang tamu dan luas ruang keluarga pada denah tersebut dapat dihitung sebagai berikut.
L<sub>ruang tamu</sub> + L<sub>ruang keluarga</sub> = L<sub>bangunan</sub> - (L<sub>garasi</sub> + L<sub>dapur</sub> + A)<br>
= 192 - (24 + 20 +72)<br>
= 192 - 116<br>
=76 cm&sup2');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, gambar_soal, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Penalaran Matematika', '3', 'Gambar di atas menunjukan denah rumah Anton dengan skala 1:100. Diketahui luas bangunan sebenarnya adalah 12 m x 16 m. Setiap ruangan kecuali ruang keluarga dan ruang tamu berbentuk persegi panjang.
Anton hendak memasang karpet pada daerah berwarna biru yang diberi label X. Jika harga karpet tersebut adalah Rp120.000,00 per <i>m&sup2</i>, total biaya yang dibutuhkan Anton untuk membeli karpet tersebut adalah ….', 'mtk3.png',
'Rp120.000,00', 'Rp200.000,00', 'Rp240.000,00', 'Rp400.000,00', 'Rp480.000,00', 'E', 'Dapat diperhatikan pada denah tersebut bahwa garasinya memiliki luas 24 <i>cm&sup2<i>. Karena panjang garasi adalah 4 cm, maka lebar garasi tersebut adalah <sup>24</sup>&frasl;<sub>4</sub> = 6 cm. Akibatnya, lebar daerah X pada denah adalah 6 – 4 = 2 cm.
Kemudian, diketahui panjang kamar pada denah tersebut adalah 6 cm. Karena panjang bangunan pada denah adalah 12 m, maka panjang daerah pada denah X adalah 12 – 6 – 4 = 2 cm.
Karena skala denah tersebut adalah 1:100, maka panjang dan lebar daerah X sebenarnya masing-masing adalah 100⋅2 cm=200 cm=2 m.
Diketahui harga karpet tersebut adalah Rp120.000,00 per <i>m&sup2</i>. Akibatnya, total biaya yang dibutuhkan Anton untuk membeli karpet tersebut adalah sebagai berikut.<br>
Total Biaya = L<sub>daerah X</sub>.Rp.120.000,00/m&sup2<br>
=(2m.2m).Rp.120.000,00/m&sup2<br>
=4 m&sup2. Rp.120.000,00/m&sup2<br>
=Rp480.000,00');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Penalaran Matematika', '4', 'Kelompok Belajar<br>
Suatu kelompok belajar terdiri dari siswa laki-laki dan siswa perempuan. Salah satu siswa laki-laki bernama Edo dan salah satu siswa perempuan bernama Tari. Banyak teman laki-laki Edo di kelompok belajar tersebut sama dengan setengah dari banyak siswa perempuan. Banyak teman perempuan Tari di kelompok belajar tersebut satu lebihnya dari banyak siswa laki-laki.
Selisih banyaknya siswa laki-laki dan perempuan di kelompok belajar tersebut adalah … siswa.', '0', '1', '2', '3', '4', 'C',
'Misalkan banyak siswa laki-laki di kelompok tersebut adalah x dan banyak siswa perempuan di kelompok tersebut adalah y.
Diketahui banyak teman perempuan Tari di kelompok belajar tersebut satu lebihnya dari banyak siswa laki-laki. Oleh karena itu, dapat dibuat persamaan sebagai berikut.<br>
y - 1 = x + 1<br>
y - x = 1 + 1<br>
y - x = 2<br>
Dengan demikian, selisih banyaknya siswa laki-laki dan perempuan di kelompok belajar tersebut adalah 2 siswa.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Penalaran Matematika', '5', 'Kelompok Belajar<br>
Suatu kelompok belajar terdiri dari siswa laki-laki dan siswa perempuan. Salah satu siswa laki-laki bernama Edo dan salah satu siswa perempuan bernama Tari. Banyak teman laki-laki Edo di kelompok belajar tersebut sama dengan setengah dari banyak siswa perempuan. Banyak teman perempuan Tari di kelompok belajar tersebut satu lebihnya dari banyak siswa laki-laki.
Jumlah seluruh siswa di kelompok belajar tersebut adalah … siswa.', '3', '4', '6', '7', '10', 'E',
'Misalkan banyak siswa laki-laki di kelompok tersebut adalah x dan banyak siswa perempuan di kelompok tersebut adalah y.<br>
Diketahui banyak teman laki-laki Edo di kelompok belajar tersebut sama dengan setengah dari banyak siswa perempuan. Artinya, dapat dibuat persamaan berikut.<br>
x - 1 = <sup>1</sup>&frasl;<sub>2</sub>y ...(i)<br>
Kemudian, diketahui banyak teman perempuan Tari di kelompok belajar tersebut satu lebihnya dari banyak siswa laki-laki. Artinya, dapat dibuat persamaan berikut.<br>
y - 1 = x + 1<br>
y = x + 2 ...(ii)<br>
Substitusikan persamaan ii ke persamaan i sehingga didapat nilai x sebagai berikut.<br>
x - 1 = <sup>1</sup>&frasl;<sub>2</sub>y<br>
2.(x-1) = 2.<sup>1</sup>&frasl;<sub>2</sub>y<br>
2x-2 = y<br>
2x-2 = x+2<br>
x = 4<br>
Substitusikan nilai x = 4 ke persamaan ii sehingga didapat nilai y sebagai berikut.<br>
y = x + 2<br>
= 4 + 2<br>
= 6<br>
Didapat bahwa banyak siswa laki-laki dan perempuan di kelompok belajar tersebut secara berurutan  adalah 4 dan 6.<br>
Dengan demikian, jumlah seluruh siswa di kelompok belajar tersebut adalah 4 + 6 = 10 siswa.');

-- soal Pengetahuan dan Pemahaman Umum
INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Pengetahuan dan Pemahaman Umum', '1', '(1) Sebagian besar orang sering mengeluh karena terlalu sibuk. (2) Mereka umumnya ingin memiliki lebih banyak waktu luang. (3) Namun, penelitian terbaru menemukan bahwa terlalu banyak waktu luang ternyata tidak lebih baik daripada terlalu sibuk. (4) Menurut penelitian yang diterbitkan oleh American Psychological Association, bertambahnya waktu luang memang dapat meningkatkan rasa bahagia. (5) Akan tetapi, perasaan itu hanya bertahan sampai titik tertentu. (6) Jika waktu luang yang dimiliki terlalu banyak, akan ada dampak buruk yang timbul.<br>
(7) Untuk menyelidiki fenomena tersebut, para peneliti melakukan eksperimen daring yang melibatkan lebih dari 6.000 peserta. (8) Peneliti menemukan bahwa orang yang memiliki waktu luang sedikit merasa lebih stres daripada mereka yang memiliki jumlah waktu luang sedang. (9) Sementara itu, mereka yang memiliki waktu luang banyak juga merasa kurang produktif daripada mereka yang berada dalam kelompok sedang. (10) Lebih lanjut, temuan tersebut menunjukkan bahwa berakhir dengan waktu luang sepanjang hari untuk melakukan hal-hal yang diinginkan ternyata dapat membuat seseorang merasa tidak bahagia. (11) Sebaliknya, orang harus berusaha untuk memiliki waktu luang dalam jumlah sedang agar dapat melakukan apa yang mereka inginkan.<br> Topik bacaan tersebut adalah ….',
'perbandingan antara orang yang memiliki waktu luang dengan orang yang sibuk', 'kelebihan dan kekurangan dari adanya waktu luang yang terlalu banyak', 'memiliki terlalu banyak waktu luang tidak lebih baik daripada terlalu sibuk', 'dampak buruk yang dialami oleh orang-orang yang memiliki waktu luang', 'Penelitian American Psychological Association tentang kesibukan dan waktu luang', 'C',
'Topik dari sebuah bacaan sama halnya dengan ide pokok atau gagasan utama bacaan tersebut. Untuk dapat menemukannya, pembaca perlu memahami ide pokok ataupun informasi penting dalam setiap paragraf, kemudian menyimpulkan inti bacaan berdasarkan hal-hal tersebut.<br>
Bacaan pada soal tersebut terdiri dari dua paragraf. Paragraf 1 menyebutkan bahwa terlalu banyak waktu luang tidak lebih baik daripada terlalu sibuk. Dalam paragraf 1, disebutkan pula adanya dampak buruk dari waktu luang yang terlalu banyak. Sementara itu, paragraf 2 membahas penelitian tentang jumlah waktu luang yang terbaik untuk dimiliki oleh setiap orang. Dalam paragraf 2, dijelaskan bahwa memiliki waktu luang yang terlalu banyak atau terlalu sedikit tidak baik. Jumlah waktu luang yang paling ideal adalah jumlah yang sedang. Berdasarkan isi kedua paragraf, dapat disimpulkan bahwa topik bacaan tersebut adalah terlalu banyak waktu luang tidak lebih baik daripada terlalu sibuk.<br>
Pilihan A tidak tepat. Bacaan dalam soal hanya menjelaskan bahwa sama halnya dengan terlalu sibuk, memiliki terlalu banyak waktu luang juga tidak baik. Namun, perbedaan antara orang yang memiliki waktu luang dan yang orang sibuk tidak dibahas dalam bacaan.<br>
Pilihan B tidak tepat. Kelebihan dari memiliki waktu luang yang terlalu banyak tidak dibahas dalam bacaan. Bacaan pada soal hanya membahas adanya dampak negatif dari terlalu banyaknya waktu luang.<br>
Pilihan D tidak tepat. Sesuai bacaan, waktu luang dapat menimbulkan dampak negatif atau dampak buruk jika ada dalam jumlah terlalu banyak. Namun, jika dimiliki dalam jumlah sedang, waktu luang tidak berdampak negatif. Jadi, topik pada pilihan D tidak sesuai dengan bacaan.<br>
Pilihan E tidak tepat. Penelitian American Psychological Association hanya dibahas pada paragraf 2 sebagai bukti penguat dari gagasan yang dibahas dalam paragraf 1, yakni adanya dampak negatif dari waktu luang yang terlalu banyak. Jadi, topik pada pilihan E tidak mewakili keseluruhan bacaan.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Pengetahuan dan Pemahaman Umum', '2', '(1) Sebagian besar orang sering mengeluh karena terlalu sibuk. (2) Mereka umumnya ingin memiliki lebih banyak waktu luang. (3) Namun, penelitian terbaru menemukan bahwa terlalu banyak waktu luang ternyata tidak lebih baik daripada terlalu sibuk. (4) Menurut penelitian yang diterbitkan oleh American Psychological Association, bertambahnya waktu luang memang dapat meningkatkan rasa bahagia. (5) Akan tetapi, perasaan itu hanya bertahan sampai titik tertentu. (6) Jika waktu luang yang dimiliki terlalu banyak, akan ada dampak buruk yang timbul.<br>
(7) Untuk menyelidiki fenomena tersebut, para peneliti melakukan eksperimen daring yang melibatkan lebih dari 6.000 peserta. (8) Peneliti menemukan bahwa orang yang memiliki waktu luang sedikit merasa lebih stres daripada mereka yang memiliki jumlah waktu luang sedang. (9) Sementara itu, mereka yang memiliki waktu luang banyak juga merasa kurang produktif daripada mereka yang berada dalam kelompok sedang. (10) Lebih lanjut, temuan tersebut menunjukkan bahwa berakhir dengan waktu luang sepanjang hari untuk melakukan hal-hal yang diinginkan ternyata dapat membuat seseorang merasa tidak bahagia. (11) Sebaliknya, orang harus berusaha untuk memiliki waktu luang dalam jumlah sedang agar dapat melakukan apa yang mereka inginkan.<br> Makna yang sama dari kata <i>dampak<i> pada kalimat (6) terdapat pula pada kata ….',
'impak', 'efek', 'imbas', 'akibat', 'implikasi', 'A', 'Setiap kata memiliki maknanya masing-masing. Selain itu, ada pula kata-kata tertentu yang memiliki makna yang sama dengan kata lain. Kata yang bermakna sama dengan kata lain disebut sinonim.<br>
Dalam Kamus Besar Bahasa Indonesia (KBBI), kata <i>dampak</i> memiliki tiga arti, yakni (1) ‘benturan’, (2) <b>‘pengaruh kuat yang mendatangkan akibat</b> (baik negatif maupun positif)’, dan (3) ‘benturan yang cukup hebat antara dua benda sehingga menyebabkan perubahan yang berarti dalam momentum (pusa) sistem yang mengalami benturan itu’. Dalam bacaan, kata <i>dampak</i> muncul pada kalimat (6) yang berbunyi <i>Jika waktu luang yang dimiliki terlalu banyak, akan ada <b>dampak</b> buruk yang timbul</i>. Kata <i>dampak</i> pada kalimat tersebut bermakna ‘pengaruh kuat yang mendatangkan akibat’. Kata tersebut bersinonim atau bermakna sama dengan kata <i>impak</i> yang dapat berarti <b>‘pengaruh yang kuat; dampak’</b>.<br>
Pilihan B dan C tidak tepat. Salah satu makna kata efek adalah ‘akibat; pengaruh’. Sementara itu, salah satu makna kata imbas adalah ‘dorongan; akibat (tanpa disengaja terjadinya)’. Kata efek dan imbas mengacu pada makna ‘akibat’, sedangkan kata dampak mengacu pada makna ‘pengaruh kuat yang <b>mendatangkan akibat’</b>.<br>
Pilihan D dan E tidak tepat. Kata <i>akibat</i> bermakna ‘sesuatu yang merupakan akhir atau hasil suatu peristiwa (pembuatan, keputusan); persyaratan atau keadaan yang mendahuluinya’, sedangkan kata <i>implikasi</i> bermakna ‘keterlibatan atau keadaan terlibat’ atau ‘yang termasuk atau tersimpul; yang disugestikan, tetapi tidak dinyatakan’. Makna kata <i>akibat</i> dan <i>implikasi</i> tidak mengacu pada pengaruh kuat yang <b>mendatangkan akibat</b> sehingga makna kedua kata tersebut berbeda dengan kata <i>dampak</i>.');

-- soal Penalaran Umum
INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Penalaran Umum', '1', 'Melihat kucing tiba-tiba mengonsumsi rumput menimbulkan rasa kekhawatiran. Tak jarang juga para pemilik kucing mencoba mencegah kelakuan kucingnya yang tiba-tiba mengunyah rumput liar di sekitaran rumah. Sebuah penelitian mengatakan bahwa hal ini dilakukan karena tanaman yang tidak dapat dicerna kucing itu justru dapat membersihkan pencernaannya dari cacing parasit dengan memuntahkannya.<br>Manakah pernyataan berikut yang akan MEMPERKUAT hasil penelitian tersebut?',
'Rumput menjadi makanan sehat bagi kucing karena mudah dicerna.', 'Kucing yang muntah setelah memakan rumput memiliki usia yang lebih panjang.', 'Kucing yang memakan rumput memiliki cacing parasit dalam organ pencernaannya.', 'Pemilik kucing rajin memberikan rumput untuk membersihkan cacing parasit pada kucing.', 'Pemilik kucing mencegah kucingnya untuk memakan rumput karena rumput tidak dapat dicerna kucing.','B',
'Pernyataan yang memperkuat adalah pernyataan yang bersifat mendukung. Hasil penelitian mengatakan bahwa kucing memakan rumput karena tanaman yang tidak dapat dicerna kucing itu justru dapat membersihkan pencernaannya dari cacing parasit dengan memuntahkannya. Berikut ini adalah hasil analisis dari setiap pilihan jawaban terhadap hasil penelitian.<br>
Pilihan jawaban A tidak tepat karena tidak sesuai dengan hasil penelitian. Rumput dapat dikatakan menjadi obat bagi kucing untuk membersihkan pencernaannya karena rumput sulit dicerna sehingga pernyataan pada pilihan jawaban A tidak memperkuat hasil penelitian.<br>
Pilihan jawaban B tepat karena menurut hasil penelitian, rumput yang dimakan kucing akan membuat kucing muntah sehingga dapat membersihkan pencernaannya. Dengan bersihnya pencernaan dan terbebas dari cacing parasit, kucing akan memiliki usia hidup yang lebih panjang. Oleh karena itu, pernyataan pada pilihan jawaban B memperkuat hasil penelitian.<br>
Pilihan jawaban C tidak tepat karena tidak memperkuat hasil penelitian. Hasil penelitian menjelaskan tentang manfaat rumput bagi kebersihan pencernaan kucing, sedangkan pilihan jawaban C membahas tentang kucing yang memakan rumput memiliki cacing parasit dalam organ pencernaannya.<br>
Pilihan jawaban D tidak tepat karena tidak sesuai dengan hasil penelitian. Dalam hasil penelitian tidak dijelaskan mengenai pemilik kucing yang memberikan rumput untuk makan kucing. Dalam teks juga dikatakan bahwa tak jarang pemilik kucing mencoba mencegah kelakuan kucingnya yang tiba-tiba mengunyah rumput liar di sekitaran rumah. Artinya, kucing tidak diberikan makan rumput oleh pemiliknya, melainkan memakannya sendiri.<br>
Pilihan jawaban E tidak tepat karena tidak memperkuat hasil penelitian. Hasil penelitian menjelaskan manfaat memakan rumput bagi kucing, sedangkan pernyataan pada pilihan jawaban E menjelaskan keadaan yang dikatakan pada kalimat kedua dalam teks.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Penalaran Umum', '2', 'PT Eka Sari Lorena Transport Tbk mencatatkan bahwa keseluruhan nilai beban perusahaan dari layanan bus antarkota antarprovinsi (AKAP) itu lebih tinggi ketimbang pendapatan pada masa pandemi. PT Weha Transportasi Indonesia Tbk, perusahaan layanan bus pariwisata, mengemukakan terjadinya perubahan pendapatan dari Rp71,9 miliar menjadi Rp70,5 miliar. Perusahaan taksi PT Blue Bird Tbk, pendapatannya rontok 49,4 persen menjadi Rp2,1 triliun pada periode yang sama. Perusahaan taksi lain, PT Express Transindo Utama, berhasil menurunkan nilai kerugian pada 2020 lalu menjadi Rp53,2 miliar dari sebelumnya Rp276,1 miliar. Pernyataan berikut ini yang tepat untuk dijadikan KESIMPULAN dari wacana tersebut adalah …',
'Transportasi publik menjadi salah satu sektor usaha yang ikut terdampak pandemi Covid-19.', 'Pendapatan perusahaan bus pariwisata pada tahun pandemi menurun lebih dari 50 persen.', 'Pendapatan perusahaan taksi tidak sebanding dengan beban perusahaan sehingga mengalami kerugian.', 'Selama masa Pembatasan Sosial Berskala Besar (PSBB), semua jenis transportasi darat mengalami kerugian.', 'Penurunan kinerja semua perusahaan transportasi antarprovinsi disebabkan karena pelaksanaan pembatasan sosial.', 'A',
'Untuk mengetahui kesimpulan yang sesuai dengan wacana, dapat diperiksa masing-masing pernyataan pada pilihan jawaban.<br>
Pilihan jawaban A tepat. Perhatikan bahwa empat perusahaan yang disebutkan pada wacana tersebut merupakan perusahaan yang bergerak di bidang jasa transportasi publik. Kemudian, diceritakan bahwa masing-masing perusahaan mengalami kerugian yang ditandai dengan frasa “… beban perusahaan … lebih tinggi ketimbang pendapatan“, “… perubahan pendapatan dari Rp71,9 miliar menjadi Rp70,5 miliar (terjadi penurunan).”, “… pendapatannya rontok …”, dan “… berhasil menurunkan nilai kerugian … (masih merugi)”. Selain itu, semua itu terjadi karena pandemi Covid-19 yang melanda negeri.<br>
Pilihan jawaban B tidak tepat karena dikatakan perusahaan bus pariwisata, padahal ada perusahaan taksi juga yang pendapatannya juga menurun akibat pandemi. Frasa perusahaan bus pariwisata tidak meliputi frasa transportasi publik pada umumnya.<br>
Pilihan jawaban C tidak tepat karena dikatakan perusahaan taksi, padahal ada perusahaan bus juga yang mengalami kerugian akibat pandemi. Frasa perusahaan taksi tidak meliputi frasa transportasi publik pada umumnya.<br>
Pilihan jawaban D tidak tepat karena dikatakan semua jenis transportasi darat, padahal ada kereta api yang juga merupakan transportasi darat, tetapi tidak diceritakan apakah mengalami kerugian atau tidak.<br>
Pilihan jawaban E tidak tepat karena dikatakan penurunan kinerja semua perusahaan transportasi antarprovinsi, padahal bisa jadi terdapat perusahaan transportasi antarprovinsi yang tidak mengalami penurunan kinerja pada masa pelaksanaan pembatasan sosial.<br>
Dengan demikian, pernyataan yang tepat untuk dijadikan KESIMPULAN berdasarkan wacana pada soal adalah Transportasi publik menjadi salah satu sektor usaha yang paling terdampak pandemi Covid-19.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Penalaran Umum', '3', 'Berdasarkan data nilai matematika siswa di suatu sekolah, diketahui nilai Ahmad lebih tinggi dari nilai Bima. Nilai Dimas tidak lebih tinggi dari nilai Fina, tetapi lebih tinggi daripada nilai Erin. Nilai Bima sedikit lebih tinggi dari nilai Cici. Jika nilai Cici lebih tinggi dari nilai Fina, maka pernyataan berikut yang pasti benar adalah …',
'Nilai kedua terendah didapat oleh Erin.', 'Nilai Cici lebih rendah dari nilai Dimas.', 'Nilai Dimas berada di urutan ketiga tertinggi.', 'Fina memiliki nilai yang lebih tinggi daripada Ahmad.', 'Dimas memiliki nilai yang lebih rendah dari nilai Bima.', 'E',
'Untuk menentukan pernyataan yang pasti benar berdasarkan teks tesebut, dibutuhkan urutan lengkap dari nilai-nilai tersebut.<br>
Berdasarkan informasi pada soal, diketahui bahwa:<br>
nilai Ahmad lebih tinggi dari nilai Bima,<br>
nilai Bima sedikit lebih tinggi daripada nilai Cici,<br>
nilai Cici lebih tinggi dari nilai Fina,<br>
nilai Dimas tidak lebih tinggi dari Fina, dan<br>
nilai Dimas lebih tinggi daripada nilai Erin.<br>
Oleh karena itu, diperoleh urutan nilai dari yang tertinggi ke terendah sebagai berikut.<br>
Ahmad – Bima – Cici – Fina – Dimas – Erin<br>
Dengan demikian, pernyataan yang benar adalah Dimas memiliki nilai yang lebih rendah dari nilai Bima.<br>
Alasan pilihan jawaban lain tidak tepat adalah sebagai berikut.<br>
Pilihan jawaban A tidak tepat, karena nilai kedua terendah didapatkan oleh Bima, bukan Erin.<br>
Pilihan jawaban B tidak tepat, karena nilai Ciri lebih tinggi dari nilai Dimas.<br>
Pilihan jawaban C tidak tepat, karena Dimas berada diurutan kelima.<br>
Pilihan jawaban D tidak tepat, karena Fina memiliki nilai lebih rendah dari Ahmad.');

-- soal Pemahaman Bacaan dan Menulis
INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Pemahaman Bacaan dan Menulis', '1', 'Teks ini digunakan untuk menjawab soal nomor 1—4.<br>
(1) Indonesia memiliki kata yang cukup unik untuk mengekspresikan tertawa di internet. (2) Netizen Indonesia sering kali menggunakan kata wkwk (baca: weka-weka) untuk ekspresi kala gembira, senang dan geli tersebut. (3) Penggunaan kata wkwk di Indonesia bisa dikatakan sangat unik. (4) Warga dunia biasanya memilih istilah laugh out loud yang sering kali disingkat LOL atau haha untuk menggambarkan situasi tertawa. (5) Adapun, wkwk hanya digunakan orang Indonesia. (6) […], dari mana kata wkwk itu berasal?<br>
(7) Para anggota Quora asal Indonesia pun berlomba-lomba menjawab pertanyaan tersebut. (8) Salah satu pengguna Quora yang bernama Dio Wijayanto Nugroho menuturkan bahwa kata wkwk lahir di komunitas game online. (9) Penggunaan kata haha dianggap sangat formal di dunia game. (10) Pemain lebih memilih untuk menggunakan kata huehue dan huahua untuk ekspresi tertawa. (11) Nah, sama seperti gua menjadi gw, huruf U yang ada di huehue dan huahua diubah menjadi W sehingga pemain memilih menggunakan kata hwhwhw. (12) Kemudian, kata itu berubah lagi menjadi wkwk dengan alasan lebih mudah diketik dibandingkan haha. (13) Pemain game online bisa mengetikkan huruf W tanpa menggerakkan tangan kiri, sedangkan huruf K bisa diketik tanpa menggerakkan tangan kanan.<br> Kalimat yang bebas dari kesalahan penulisan adalah ….',
'(2)', '(4)', '(5)', '(11)', '(12)', 'E', 'Soal ini sangat umum. Kesalahan yang dimaksud bisa disebabkan ketidakefektifan, ketidakbakuan, atau kesalahan dalam penggunaan ejaan. Kalimat yang bebas dari kesalahan penulisan adalah kalimat (11).<br>
Kalimat (2) kekurangan tanda koma di sebelum kata dan. Perincian yang lebih dari dua harus dipisahkan tanda koma pada setiap unsurnya.<br>
Kalimat (4) mengandung singkatan LOL yang menggunakan huruf miring. Singkatan tidak menggunakan huruf miring meskipun merupakan singkatan yang berasal dari bahasa asing.<br>
Kalimat (5) kelebihan tanda baca koma setelah kata adapun.<br>
Kalimat (12) mengandung kesalahan pembentukan kata. Kata diketik tidak tepat karena kata dasarnya adalah tik bukan ketik. Imbuhan di- ditambahkan pada kata dasar tik menjadi ditik, bukan diketik.<br>');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Pemahaman Bacaan dan Menulis', '2', 'Teks ini digunakan untuk menjawab soal nomor 1—4.<br>
(1) Indonesia memiliki kata yang cukup unik untuk mengekspresikan tertawa di internet. (2) Netizen Indonesia sering kali menggunakan kata wkwk (baca: weka-weka) untuk ekspresi kala gembira, senang dan geli tersebut. (3) Penggunaan kata wkwk di Indonesia bisa dikatakan sangat unik. (4) Warga dunia biasanya memilih istilah laugh out loud yang sering kali disingkat LOL atau haha untuk menggambarkan situasi tertawa. (5) Adapun, wkwk hanya digunakan orang Indonesia. (6) […], dari mana kata wkwk itu berasal?<br>
(7) Para anggota Quora asal Indonesia pun berlomba-lomba menjawab pertanyaan tersebut. (8) Salah satu pengguna Quora yang bernama Dio Wijayanto Nugroho menuturkan bahwa kata wkwk lahir di komunitas game online. (9) Penggunaan kata haha dianggap sangat formal di dunia game. (10) Pemain lebih memilih untuk menggunakan kata huehue dan huahua untuk ekspresi tertawa. (11) Nah, sama seperti gua menjadi gw, huruf U yang ada di huehue dan huahua diubah menjadi W sehingga pemain memilih menggunakan kata hwhwhw. (12) Kemudian, kata itu berubah lagi menjadi wkwk dengan alasan lebih mudah diketik dibandingkan haha. (13) Pemain game online bisa mengetikkan huruf W tanpa menggerakkan tangan kiri, sedangkan huruf K bisa diketik tanpa menggerakkan tangan kanan.<br> Konjungsi yang tepat untuk melengkapi kalimat (6) agar padu adalah ….',
'dengan demikian', 'lantas', 'jadi', 'sebenarnya', 'namun', 'B', 'Soal ini menanyakan konjungsi antarkalimat yang tepat untuk mengisi bagian rumpang pada kalimat (6). Untuk menentukan konjungsi yang tepat, kita perlu mengetahui hubungan di antara kalimat (5) dan (6), (5) Adapun, wkwk hanya digunakan orang Indonesia. (6) […], dari mana kata wkwk itu berasal?. Kalimat (5) membicarakan kata wkwk yang hanya digunakan di Indonesia. Kalimat (6) melanjutkan kalimat (5) dengan menanyakan dari mana asal kata wkwk tersebut. Konjungsi yang tepat untuk melanjutkan informasi adalah lantas yang bermakna lalu atau kemudian.<br>
Pilihan jawaban A dan C tidak tepat karena konjungsi dengan demikian dan jadi digunakan untuk menunjukkan hubungan simpulan.<br>
Pilihan jawaban D tidak tepat karena konjungsi sebenarnya bukan merupakan konjungsi, melainkan adverbia.<br>
Pilihan jawaban E tidak tepat karena konjungsi namun digunakan untuk menunjukkan hubungan pertentangan.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Pemahaman Bacaan dan Menulis', '3','(1) Indonesia memiliki kata yang cukup unik untuk mengekspresikan tertawa di internet. (2) Netizen Indonesia sering kali menggunakan kata wkwk (baca: weka-weka) untuk ekspresi kala gembira, senang dan geli tersebut. (3) Penggunaan kata wkwk di Indonesia bisa dikatakan sangat unik. (4) Warga dunia biasanya memilih istilah laugh out loud yang sering kali disingkat LOL atau haha untuk menggambarkan situasi tertawa. (5) Adapun, wkwk hanya digunakan orang Indonesia. (6) […], dari mana kata wkwk itu berasal?<br>
(7) Para anggota Quora asal Indonesia pun berlomba-lomba menjawab pertanyaan tersebut. (8) Salah satu pengguna Quora yang bernama Dio Wijayanto Nugroho menuturkan bahwa kata wkwk lahir di komunitas game online. (9) Penggunaan kata haha dianggap sangat formal di dunia game. (10) Pemain lebih memilih untuk menggunakan kata huehue dan huahua untuk ekspresi tertawa. (11) Nah, sama seperti gua menjadi gw, huruf U yang ada di huehue dan huahua diubah menjadi W sehingga pemain memilih menggunakan kata hwhwhw. (12) Kemudian, kata itu berubah lagi menjadi wkwk dengan alasan lebih mudah diketik dibandingkan haha. (13) Pemain game online bisa mengetikkan huruf W tanpa menggerakkan tangan kiri, sedangkan huruf K bisa diketik tanpa menggerakkan tangan kanan.<br> Ide pokok paragraf kedua teks tersebut adalah ….',
'anggota Quora berlomba menjawab asal kata wkwk', 'wkwk berasal dari komunitas game online', 'asal mula munculnya kata wkwk', 'wkwk muncul karena kebiasaan para pemain game online', 'salah satu pendapat mengenai asal kata wkwk', 'E',
'Ide pokok adalah hal yang dibicarakan dalam sebuah teks atau paragraf. Ide pokok mencakup hal utama yang dibicarakan dan penjelasnya.<br>
Paragraf kedua berisi penjelasan dari mana asal kata wkwk berasal. Penjelasan tersebut berasal dari seorang pengguna Quora yang bernama Dio Wijayanto. Artinya, asal kata wkwk dalam paragraf kedua merupakan sebuah pendapat yang dikemukakan oleh pengguna Quora tersebut.<br>
Pilihan jawaban A tidak tepat karena paragraf kedua tidak menjelaskan perihal pengguna Quora yang berlomba menjawab pertanyaan mengenai asal kata wkwk.<br>
Pilihan jawaban B tidak tepat karena kalimat ini berbunyi seakan-akan asal kata tersebut memang berasal dari sana, sedangkan pada awal kalimat dijelaskan bahwa itu hanya pendapat dari seorang pengguna Quora.<br>
Pilihan jawaban C tidak tepat karena paragraf 2 membicarakan pendapat netizen terkait asal mula kata wkwk.<br>
Pilihan jawaban D tidak tepat karena pernyataan tersebut merupakan penjelas bagi paragraf kedua.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Pemahaman Bacaan dan Menulis', '4','(1) Indonesia memiliki kata yang cukup unik untuk mengekspresikan tertawa di internet. (2) Netizen Indonesia sering kali menggunakan kata wkwk (baca: weka-weka) untuk ekspresi kala gembira, senang dan geli tersebut. (3) Penggunaan kata wkwk di Indonesia bisa dikatakan sangat unik. (4) Warga dunia biasanya memilih istilah laugh out loud yang sering kali disingkat LOL atau haha untuk menggambarkan situasi tertawa. (5) Adapun, wkwk hanya digunakan orang Indonesia. (6) […], dari mana kata wkwk itu berasal?<br>
(7) Para anggota Quora asal Indonesia pun berlomba-lomba menjawab pertanyaan tersebut. (8) Salah satu pengguna Quora yang bernama Dio Wijayanto Nugroho menuturkan bahwa kata wkwk lahir di komunitas game online. (9) Penggunaan kata haha dianggap sangat formal di dunia game. (10) Pemain lebih memilih untuk menggunakan kata huehue dan huahua untuk ekspresi tertawa. (11) Nah, sama seperti gua menjadi gw, huruf U yang ada di huehue dan huahua diubah menjadi W sehingga pemain memilih menggunakan kata hwhwhw. (12) Kemudian, kata itu berubah lagi menjadi wkwk dengan alasan lebih mudah diketik dibandingkan haha. (13) Pemain game online bisa mengetikkan huruf W tanpa menggerakkan tangan kiri, sedangkan huruf K bisa diketik tanpa menggerakkan tangan kanan.<br> Gagasan utama kalimat (8) adalah …',
'Salah satu pengguna Quora bernama Dio Wijayanto.', 'Dio Wijayanto Nugroho menuturkanwkwk lahir di komunitas game online.', 'Pengguna Quora menuturkan wkwk lahir di komunitas game online.', 'Kata wkwk lahir di komunitas game online.', 'Nugroho menuturkan kata wkwk di komunitas game online.', 'D',
'Gagasan utama kalimat adalah hal pokok yang dibicarakan dalam sebuah kalimat. Gagasan utama dalam sebuah kalimat biasanya terletak pada unsur intinya, yakni subjek dan predikat. Akan tetapi, pada sebuah kalimat aktif transitif tersebut terdapat kata bahwa sebagai kata penghubung untuk mendahului anak kalimat yang menjadi pokok kalimat. Oleh karena itu, gagasan utamanya terletak pada klausa objek tersebut.<br>
Kalimat Salah satu pengguna Quora yang bernama Dio Wijayanto Nugroho menuturkan bahwa kata wkwk lahir di komunitas game online. mengandung objek yang diperluas. Dengan demikian, gagasan utama pada kalimat ini terletak pada klausa objeknya. Secara keseluruhan, struktur kalimat tersebut adalah<br>
Salah satu pengguna Quora yang bernama Dio Wijayanto Nugroho → subjek<br>
menuturkan → predikat<br>
bahwa kata wkwk lahir di komunitas game online → objek<br>
Analisis klausa anak perluasan objeknya adalah<br>
kata wkwk → subjek<br>
lahir → predikat<br>
di komunitas game online → keterangan<br>
Jadi, yang dibicarakan adalah kata wkwk lahir di komunitas game online. Keterangan pada kalimat tersebut berfungsi untuk memperjelas kalimatnya. Sementara itu, pilihan jawaban A, B, C, dan E tidak tepat karena subjek yang digunakan bukan kata wkwk.');

-- soal Pengetahuan Kuantitatif
INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Pengetahuan Kuantitatif', '1', 'Nilai dari <sup>999&sup3 - 1&sup3</sup>&frasl;<sub>999 - 1</sub> adalah ....', '1.000.001', '999.999', '999.001', '999.000', '899.999', 'C',
'Ingat bahwa a&sup3 - b&sup3 = (a - b)(a&sup2 + ab&sup2 + b&sup2).<br> Dengan menggunakan rumus pemfaktoran tersebut, dimana  a = 999 dan b = 1, diperoleh perhitungan berikut.<br>
<sup>999&sup3 - 1&sup3</sup>&frasl;<sub>999 - 1</sub> = <sup>(999 - 1)(999&sup2 + 999.1+1&sup2)</sup>&frasl;<sub>(999 - 1)</sub> = 999&sup2 + 999.1+1&sup2 = 999(999 + 1) + 1<br>
= 999(1.000) + 1 = 999.000 + 1 = 999.001<br>
Dengan demikian, nilai dari <sup>999&sup3 - 1&sup3</sup>&frasl;<sub>999 - 1</sub> adalah 999.001.');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Pengetahuan Kuantitatif', '2', 'Rata-rata lima bilangan asli adalah 12. Jika bilangan asli y ditambahkan ke dalam data tersebut, maka rata-rata enam bilangan tersebut merupakan bilangan bulat positif. Nilai y terkecil yang mungkin adalah ….',
'0', '1', '6', '12', '18', 'C', 'Misal kelima bilangan tersebut adalah a, b, c, d, dan e. Diketahui bahwa rata-ratanya adalah 12, maka diperoleh hasil perhitungan sebagai berikut.<br>
<u>x</u> = 12 <sup>a + b + c + d + e</sup>&frasl;<sub>5</sub> = 12a + b + c + d + e = 60<br>
Kemudian, diketahui jika ditambahkan suatu bilangan y ke dalam data tersebut, rata-ratanya merupakan bilangan bulat positif. Perhatikan hasil perhitungan berikut!<br>
<u>x</u> = <sup>a + b + c + d + e + y</sup>&frasl;<sub>6</sub> <u>x</u> = <sup>60+ y</sup>&frasl;<sub>6</sub> <u>x</u> = 10 + <sup>y</sup>&frasl;<sub>6</sub><br>
Agar 10 + <sup>y</sup>&frasl;<sub>6</sub> merupakan bilangan bulat positif dengan y merupakan bilangan asli, maka nilai haruslah bilangan yang habis dibagi 6, yaitu bilangan kelipatan 6.<br> Bilangan asli kelipatan 6 dimulai dari 6, 12, 18 dan seterusnya.<br>
Dengan demikian, nilai  terkecil yang mungkin adalah 6.<br>');

INSERT INTO soal (mata_pelajaran, nomor_soal, pertanyaan, opsi_a, opsi_b, opsi_c, opsi_d, opsi_e, jawaban, pembahasan)
VALUES
('Pengetahuan Kuantitatif', '3', 'In the coordinate plane, line g passes through the origin and perpendicular to a line that has slope -3. If points (-6, b) and (a, 1) are on line g, then the value of a – b is ….',
'-15', '1', '5', '16', '21', 'C', 'Diketahui bahwa “line g passes through the origin and perpendicular to a line that has slope -3“.<br>
Artinya, garis g melalui titik asal, yaitu (0, 0) dan tegak lurus dengan suatu garis yang memiliki gradien -3.<br>
Ingat bahwa pada dua garis yang saling tegak lurus, berlaku m<sub>1</sub>.m<sub>2</sub> = -1<br> Oleh karena itu, gradien garis g dapat ditentukan sebagai berikut.<br>
m<sub>g</sub>. (-3) = -1m<sub>g</sub> = <sup>1</sup>&frasl;<sub>3</sub><br> Karena garis g melalui titik asal (0, 0) dan memiliki gradien m<sub>g</sub> = <sup>1</sup>&frasl;<sub>3,</sub> maka persamaan garis g dapat ditentukan sebagai<br>
y - y<sub>1</sub> = m<sub>g</sub> (x - x<sub>1</sub>)y - 0 = <sup>1</sup>&frasl;<sub>3</sub>(x - 0)y = <sup>1</sup>&frasl;<sub>3</sub>x3y = x<br>
Kemudian, diketahui pula bahwa “points (-6, b)  and (a, 1) are on line g“.<br>
Artinya, titik (-6, b)  dan (a, 1) berada pada garis g.<br>
Selanjutnya, nilai a dan b dapat ditentukan sebagai berikut.<br>
3y = x3(b) = -6b = -2<br>
dan <br>
3y = x3(1) = aa 3<br> Pada soal, yang ditanyakan adalah “the value of a – b“.<br>
Artinya, nilai dari a – b, yaitu sebagai berikut.<br> a - b = 3 - (-2) = 3 + 2 = 5');