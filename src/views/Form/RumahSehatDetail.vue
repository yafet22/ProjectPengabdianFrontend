<template>
  <div style="width: 100%">
      <!-- <div style="margin-top:8px">
          <img :src="require('@/assets/house1.svg')" style="display: block;margin-left: auto;margin-right: auto;width: 360px;"/>
      </div> -->
        <div v-if="type=='luaslahan'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Kecukupan Ruang Lahan</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.kecukupan_lahan_data.kecukupan_lahan"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    {{data.kecukupan_lahan_data.luas_lahan}}m<sup>2</sup> / {{data.kecukupan_lahan_data.jumlah_orang}} orang penghuni
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    {{data.kecukupan_lahan_data.luas_lahan}}m<sup>2</sup> / {{data.kecukupan_lahan_data.jumlah_orang}} orang penghuni
                </v-card-subtitle>
                </v-card>
                <div v-if="data.kecukupan_lahan_data.kecukupan_lahan" style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Luas lahan anda dikategorikan SEHAT sesuai dengan standar berikut</p>
                    <div style="background-color:#FF9800;display: block;margin-left: 80px;margin-right: 80px;color:white;padding:8px;font-weight:bold">
                        60m<sup>2</sup> / 4 orang penghuni 
                    </div>
                </div>
                <div v-else style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Luas lahan anda dikategorikan TIDAK SEHAT sesuai dengan standar berikut</p>
                    <div style="background-color:#FF9800;display: block;margin-left: 80px;margin-right: 80px;color:white;padding:8px;font-weight:bold">
                        60m<sup>2</sup> / 4 orang penghuni 
                    </div>
                </div>
            </div>
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.kecukupan_lahan_data.kecukupan_lahan" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Lahan yang ada dibersihkan secara rutin
                        </li>
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Bangunlah rumah bertingkat dengan lahan terbuka yang memadai
                        </li>
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Ruang negatif, tidak berfungsi, sulit dibersihkan.
                        </li>
                        <li>
                            Tidak ada cahaya, tidak ada udara di luar dan di dalam rumah.
                        </li>
                        <li>
                            Infrastruktur sulit direncanakan dan diperbaiki.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="type=='luasbangunan'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Kecukupan Ruang Bangunan</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.kecukupan_bangunan_data.kecukupan_bangunan"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    {{data.kecukupan_bangunan_data.luas_bangunan}}m<sup>2</sup> / {{data.kecukupan_bangunan_data.jumlah_orang}} orang penghuni
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    {{data.kecukupan_bangunan_data.luas_bangunan}}m<sup>2</sup> / {{data.kecukupan_bangunan_data.jumlah_orang}} orang penghuni
                </v-card-subtitle>
                </v-card>
                <div v-if="data.kecukupan_bangunan_data.kecukupan_bangunan" style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Luas bangunan anda dikategorikan SEHAT sesuai dengan standar berikut</p>
                    <div style="background-color:#FF9800;display: block;margin-left: 80px;margin-right: 80px;color:white;padding:8px;font-weight:bold">
                        9m<sup>2</sup> / 1 orang penghuni 
                    </div>
                </div>
                <div v-else style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Luas bangunan anda dikategorikan TIDAK SEHAT sesuai dengan standar berikut</p>
                    <div style="background-color:#FF9800;display: block;margin-left: 80px;margin-right: 80px;color:white;padding:8px;font-weight:bold">
                        9m<sup>2</sup> / 1 orang penghuni 
                    </div>
                </div>
            </div>
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.kecukupan_bangunan_data.kecukupan_bangunan" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Rumah untuk berlindung, beristirahat, dan aktivitas produktif.
                        </li>
                        <li>
                            Rumah untuk sarana pembinaan keluarga sehingga memiliki kehidupan yang sehat secara fisik, mental, dan sosial.
                        </li>
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Penataan dan pemilihan perabotan hemat ruang.
                        </li>
                        <li>
                            Pembagian ruang efisien dan efektif.
                        </li>
                        <li>
                            Prioritas aktivitas tertentu.
                        </li>
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Ruang beraktivitas kurang dan ruang gerak terbatas.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="type=='kamartidur'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Psikologis Kamar Tidur</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.data_kamar_tidur.kecukupan_kamar_tidur"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Jumlah kamar tidur {{data.data_kamar_tidur.jumlah_saat_ini}}
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Jumlah kamar tidur {{data.data_kamar_tidur.jumlah_saat_ini}}
                </v-card-subtitle>
                </v-card>
                <div v-if="data.data_kamar_tidur.kecukupan_kamar_tidur" style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Rumah anda dikategorikan SEHAT secara Psikologis sesuai standar yang sudah ditentukan berikut</p>
                    <div v-if="data.kecukupan_lahan_data.jumlah_orang>0" style="background-color:#FF9800;display: block;margin-left: 80px;margin-right: 80px;color:white;padding:8px;font-weight:bold">
                        Jumlah Kamar Seharusnya adalah {{data.data_kamar_tidur.jumlah_seharusnya}}
                    </div>
                    <div v-else style="background-color:#FF9800;display: block;margin-left: 80px;margin-right: 80px;color:white;padding:8px;font-weight:bold">
                        Rumah Tidak memiliki penghuni
                    </div>
                </div>
                <div v-else style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Rumah anda dikategorikan TIDAK SEHAT secara Psikologis sesuai standar yang sudah ditentukan berikut</p>
                    <div v-if="data.kecukupan_lahan_data.jumlah_orang>0" style="background-color:#FF9800;display: block;margin-left: 80px;margin-right: 80px;color:white;padding:8px;font-weight:bold">
                        Jumlah Kamar Seharusnya adalah {{data.data_kamar_tidur.jumlah_seharusnya}}
                    </div>
                    <div v-else style="background-color:#FF9800;display: block;margin-left: 80px;margin-right: 80px;color:white;padding:8px;font-weight:bold">
                        Rumah Tidak memiliki penghuni
                    </div>
                </div>
            </div>
            <div class="standart-box">
                <div class="standart-header">
                    <h2>Standar</h2>
                </div>
                <div class="standart-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Anggota yang telah berpasangan memiliki kamar tidur sendiri.
                        </li>
                        <li>
                            Anggota keluarga yang berusia 17 tahun ke atas memiliki kamar tidur sendiri.
                        </li>
                        <li>
                            Anggota keluarga yang berusia di bawah 17 tahun memiliki kamar tidur terpisah antara laki-laki dan perempuan.
                        </li>
                        <li>
                            Anggota keluarga yang berusia di bawah 2 tahun menjadi satu dengan orangtuanya.
                        </li>
                    </ul>
                </div>
            </div>
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.kecukupan_bangunan_data.kecukupan_bangunan" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Rumah yang ramah anak, aman secara fisik dan mental bagi setiap penghuni.
                        </li>
                        <li>
                            Privasi dapat tercipta melalui kenyamanan fisik, visual, dan suara/akustik.
                        </li>
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Menyediakan tambahan ruang.
                        </li>
                        <li>
                            Perlu Tambahkan Sekat pada ruang yang memungkinkan untuk kenyamanan fisik dan privase.
                        </li>
                        <li>
                            Prioritas aktivitas tertentu.
                        </li>
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Tidak ada privasi akan mengganggu aktivitas fisik dan perkembangan mental
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="type=='kamarmandi'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Psikologis Kamar Mandi</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.memiliki_kamar_mandi"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Memiliki Kamar Mandi
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Tidak Memiliki Kamar Mandi
                </v-card-subtitle>
                </v-card>
                <div v-if="data.kecukupan_bangunan_data.kecukupan_bangunan" style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Rumah anda dikategorikan SEHAT secara Psikologis karena memiliki kamar mandi</p>
                </div>
                <div v-else style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Rumah anda dikategorikan TIDAK SEHAT secara Psikologis karena tidak memiliki kamar mandi</p>
                </div>
            </div>
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.kecukupan_bangunan_data.kecukupan_bangunan" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                           Aktivitas dalam kamar mandi(WC) terlindungi privasinya.
                        </li>
                        <li>
                           Kamar mandi dan WC harus rutin diberishkan.
                        </li>
                        <li>
                           Pendidikan Keluarga tentang kebersihan dan penghematan air dapat dimulai di kamar mandi(WC) pribadi(Keluarga).
                        </li>
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Menyediakan kamar mandi di lokasi yang masih memungkinkan dan terjaga jaraknya untuk mencegah rembesan ke sumur.
                        </li>
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Kamar mandi komunal tidak memenuhi kebutuhan privasi, kebersihan, dan pemeliharaan.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="type=='ruangkeluarga'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Psikologis Ruang Keluarga</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.memiliki_ruang_keluarga"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Memiliki Ruang Keluarga
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Tidak Memiliki Ruang Keluarga
                </v-card-subtitle>
                </v-card>
                <div v-if="data.memiliki_ruang_keluarga" style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Rumah anda dikategorikan SEHAT secara Psikologis karena memiliki ruang keluarga</p>
                </div>
                <div v-else style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Rumah anda dikategorikan TIDAK SEHAT secara Psikologis karena tidak memiliki ruang keluarga</p>
                </div>
            </div>
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.memiliki_ruang_keluarga" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                           Ruang keluarga dapat dirancang dengan suasana yang santai dan tidak perlu ruang yang terlalu luas.
                        </li>
                        <li>
                           Ruang keluarga dapat berfungsi untuk kegiatan lain misal untuk belajar bersama.
                        </li>
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Komunikasi antar anggota keluarga dapat dilakukan di ruang keluarga atau ruang lain (misal ruang makan) yang dapat berfungsi ganda.
                        </li>
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Aktivitas bersama keluarga yang tidak terwadahi dapat menyebabkan perkembangan anak terabaikan dan komunikasi suami istri terganggu.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="type=='kloset'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Kloset Leher Angsa</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.kloset_lahar_angsa"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Memiliki Kloset Leher Angsa
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Tidak Memiliki Kloset Leher Angsa
                </v-card-subtitle>
                </v-card>
                <div v-if="data.kloset_lahar_angsa" style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Toilet sudah sesuai dengan standar kesehatan</p>
                    <div style="font-size:20px;text-align:center;color:#FF9800;font-weight:bold">
                        Setiap toilet wajib menggunakan kloset yang dilengkapi dengan leher angsa untuk mencegah penyebaran bau dan bakteri dari tinja.
                    </div>
                </div>
                <div v-else style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Toilet belum sesuai dengan standar kesehatan</p>
                    <div style="font-size:20px;text-align:center;color:#FF9800;font-weight:bold">
                        Setiap toilet wajib menggunakan kloset yang dilengkapi dengan leher angsa untuk mencegah penyebaran bau dan bakteri dari tinja.
                    </div>
                </div>
            </div>  
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.kloset_lahar_angsa" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                           Pemasangan leher angsa dapat berupa WC duduk atau jongkok.
                        </li>
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Pemasangan kloset leher angsa.
                        </li>
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            WC akan berbau dan mengundang binatang seperti lalat.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="type=='septictank'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Septic Tank</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.septic_tank"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Memiliki Septic Tank
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Tidak Memiliki Septic Tank
                </v-card-subtitle>
                </v-card>
                <div v-if="data.septic_tank" style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Telah tercipta lingkungan yang bersih di lingkungan Anda terutama untuk kebersihan air dan udara</p>
                    <div style="font-size:20px;text-align:center;color:#FF9800;font-weight:bold">
                        Setiap toilet wajib dilengkapi dengan tangki septik untuk mencegah pencemaran bakteri e coli ke dalam tanah maupun air tanah.
                    </div>
                </div>
                <div v-else style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Belum tercipta lingkungan yang bersih di lingkungan Anda terutama untuk kebersihan air dan udara</p>
                    <div style="font-size:20px;text-align:center;color:#FF9800;font-weight:bold">
                        Setiap toilet wajib dilengkapi dengan tangki septik untuk mencegah pencemaran bakteri e coli ke dalam tanah maupun air tanah.
                    </div>
                </div>
            </div>  
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.septic_tank" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                           Tidak menyemprotkan cairan pembersih dan pembasmi serangga pada septik tank.
                        </li>
                        <li>
                           Letak septik tank harus memperhatikan jarak yang tepat terhadap sumber kotoran dan sumber air beersih.
                        </li>
                        <li>
                           Air dari kamar mandi dan WC tidak bercampur.
                        </li>   
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Pembuatan septik tank.
                        </li>   
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Terjadi permasalahan untuk kelancaran pembuangan kotoran dan bau.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="type=='greasetrap'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Bak Penangkap Lemak</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.grease_trap"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Memiliki Penyaringan Lemak
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Tidak Memiliki Bak Penangkap Lemak
                </v-card-subtitle>
                </v-card>
                <div v-if="data.grease_trap" style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Anda telah mendukung kebersihan lingkungan dan mengurangi pencemaran</p>
                    <div style="font-size:20px;text-align:center;color:#FF9800;font-weight:bold">
                        Sisa cucian piring mengandung lemak, residu dan sabun yang perlu disaring sebelum dibuang ke saluran limbah kota untuk mengurangi penyumbatan akibat lemak dan sisa makanan di saluran limbah kota 
                    </div>
                </div>
                <div v-else style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Anda belum mendukung kebersihan lingkungan dan mengurangi pencemaran</p>
                    <div style="font-size:20px;text-align:center;color:#FF9800;font-weight:bold">
                        Sisa cucian piring mengandung lemak, residu dan sabun yang perlu disaring sebelum dibuang ke saluran limbah kota untuk mengurangi penyumbatan akibat lemak dan sisa makanan di saluran limbah kota 
                    </div>
                </div>
            </div>
            <div class="standart-box">
                <div class="standart-header">
                    <h2>Standar</h2>
                </div>
                <div class="standart-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Tempat cuci piring -> bak penangkap lemak -> riol kota atau sumur peresapan.
                        </li>
                        <li>
                            Boleh tidak beratap, tapi lebih baik beratap (minimal seng).
                        </li>
                        <li>
                            Dinding dapat berupa karung beras, bambu kayu, atau batu bata.
                        </li>
                        <li>
                            Lantai dapat berupa bambu atau tanah, namun sebaiknya dari beton dan keramik.
                        </li>
                    </ul>
                </div>
            </div>  
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.grease_trap" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                           Tidak menyemprotkan cairan pembersih dan pembasmi serangga pada bak penangkap lemak.
                        </li>
                        <li>
                           Letak bak penangkap lemak harus memperhatikan jarak yang tepat terhadap sumber kotoran dan sumber air beersih.
                        </li> 
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Pembuatan bak penangkap lemak.
                        </li>   
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Terjadi permasalahan untuk kelancaran pembuangan kotoran dan bau.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="type=='rainwater'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Pengelolaan Air Hujan</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.rain_water_managment"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Memiliki Pengelolaan Air Hujan
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    Tidak Memiliki Pengelolaan Air Hujan
                </v-card-subtitle>
                </v-card>
                <div v-if="data.rain_water_managment" style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Anda turut serta mendaur ulang air untuk dikembalikan ke dalam tanah</p>
                    <div style="font-size:20px;text-align:center;color:#FF9800;font-weight:bold">
                        Air hujan dimanfaatkan dan dikelola dengan benar ke sumur resapan air hujan atau bak penampungan untuk digunakan kembali.
                    </div>
                </div>
                <div v-else style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Anda belum serta mendaur ulang air untuk dikembalikan ke dalam tanah</p>
                    <div style="font-size:20px;text-align:center;color:#FF9800;font-weight:bold">
                        Air hujan dimanfaatkan dan dikelola dengan benar ke sumur resapan air hujan atau bak penampungan untuk digunakan kembali.
                    </div>
                </div>
            </div>  
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.rain_water_managment" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                           Bersihkan talang dan penampungan air hujan dari sampah.
                        </li>
                        <li>
                           Bersihkan bak penampungan air hujan dari lumut.
                        </li>   
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Membuat talang di lokasi yang tepat.
                        </li>
                        <li>
                            Membuat sumur penampungan air hujan.
                        </li>
                        <li>
                            Membuat sumur resapan.
                        </li>   
                        <li>
                            Membuat bak kontrol.
                        </li>     
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Air hujan akan menggenangi rumah, halaman, dan lingkungan.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
       <!-- <v-card
            class="mx-auto"
            color="#26c6da"
            dark
        >
            <v-card-title>
            <v-icon
                large
                left
            >
                mdi-twitter
            </v-icon>
            <span class="title font-weight-light">Twitter</span>
            </v-card-title>
            <v-card-text class="headline font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>
        </v-card> -->
  </div>
</template>

<script>
export default {
    data () {
    return {
       data : {
           kecukupan_lahan_data : {
               kecukupan_lahan : true,
               luas_lahan : 0,
               jumlah_orang : 0,
           },
           kecukupan_bangunan_data : {
               kecukupan_bangunan : true,
               luas_bangunan : 0,
               jumlah_orang : 0,
           },
           data_kamar_tidur : {
                jumlah_saat_ini : 0,
                jumlah_seharusnya : 0,
                kecukupan_kamar_tidur : true,
           },
        },
        optionmaps : {
          scrollwheel: true, mapTypeControl: false, draggable: true, disableDoubleClickZoom: true,zoomControl: false                      
        },
        data2 : {},
        center: { lat:-7.779047, lng: 110.416957 },
        marker: false,
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        optionsConstruction : {strokeColor: '#98963F',fillColor: '#98963F',strokeWeight: 1},
        paths: [],
        constructionPaths: [],
        rooms: [],
        windows: [],
        idRoom : null,
        dialog : false,
        houseID : null,
        type : null,
        isAppropriate : false
    }
  },
  methods:{
    getRumahSehatData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/rumah-sehat/'+this.$route.params.id,config).then(response =>{
            this.data = response.data
        })
    }
  },
  mounted(){
    this.getRumahSehatData()
    this.houseID = this.$route.params.id;
    this.type=this.$route.params.type;
    // this.isAppropriate=this.$route.params.result
  },
}
</script>

<style lang="scss" scoped>
    .suggestion-box{
        margin-top:24px;
        border:4px solid #03A9F4;
        border-radius:4px;
        .suggestion-header{
            text-align:center;
            background-color:#03A9F4;
            color:white  
        }
        .suggestion-body{
            padding: 8px;
            font-size: 18px; 
        }
    }

    .negative-box{
        margin-top:24px;
        border:4px solid #F44336;
        border-radius:4px;
        .negative-header{
            text-align:center;
            background-color:#F44336;
            color:white  
        }
        .negative-body{
            padding: 8px;
            font-size: 18px; 
        }
    }

    .standart-box{
        margin-top:24px;
        border:4px solid #FF9800;
        border-radius:4px;
        .standart-header{
            text-align:center;
            background-color:#FF9800;
            color:white  
        }
        .standart-body{
            padding: 8px;
            font-size: 18px; 
        }
    }
</style>

