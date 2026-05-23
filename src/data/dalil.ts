import { DalilItem } from '../types';

export const DALIL_QURAN: DalilItem = {
  source: 'QS. An-Nisa Ayat 101',
  arabic: 'وَإِذَا ضَرَبْتُمْ فِي الْأَرْضِ فَلَيْسَ عَلَيْكُمْ جُنَاحٌ أَن تَقْصُرُوا مِنَ الصَّلَاةِ إِنْ خِفْتُمْ أَن يَفْتِنَكُمُ الَّذِينَ كَفَرُوا ۚ إِنَّ الْكَافِرِينَ كَانُوا لَكُمْ عَدُوًّا مُّبِينًا',
  translation: 'Dan apabila kamu bepergian di bumi, maka tidaklah mengapa kamu men-qashar sembahyang(mu), jika kamu takut diserang orang-orang kafir. Sesungguhnya orang-orang kafir itu adalah musuh yang nyata bagimu.',
  explanation: 'Ayat ini menjadi dasar hukum utama diperbolehkannya meng-qashar (meringkas dari 4 rakaat menjadi 2 rakaat) shalat fardhu bagi orang yang sedang melakukan perjalanan (safar).'
};

export const DALIL_HADITS: DalilItem[] = [
  {
    source: 'Hadits Riwayat Bukhari (No. 1089) & Muslim (No. 685)',
    arabic: 'عَنِ ابْنِ عُمَرَ رَضِيَ اللَّهُ عَنْهُمَا قَالَ: صَحِبْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَكَانَ لَا يَزِيدُ فِي السَّفَرِ عَلَى رَكْعَتَيْنِ، وَأَبَا بَكْرٍ وَعُمَرَ وَعُثْمَانَ كَذِلِكَ',
    translation: 'Dari Ibnu Umar radhiyallahu \'anhuma ia berkata: "Saya pernah menemani Rasulullah shallallahu \'alaihi wa sallam dalam perjalanan, dan beliau tidak pernah menambah shalat dalam perjalanan lebih dari dua rakaat. Begitu juga Abu Bakar, Umar, dan Utsman melakukan hal yang sama."',
    explanation: 'Hadits muttafaq alaih ini menegaskan bahwa meng-qashar shalat adalah sunnah muakkadah yang selalu diamalkan Rasulullah SAW serta para khulafaur rasyidin semasa safar.'
  },
  {
    source: 'Hadits Riwayat Muslim (No. 686)',
    arabic: 'صَدَقَةٌ تَصَدَّقَ اللَّهُ بِهَا عَلَيْكُمْ فَاقْبَلُوا صَدَقَتَهُ',
    translation: '“Itu adalah sedekah yang Allah berikan kepada kalian, maka terimalah sedekah-Nya tersebut.”',
    explanation: 'Jawaban Rasulullah SAW ketika Sahabat Ya’la bin Umayyah bertanya mengapa umat Islam masih meng-qashar shalat padahal situasi sudah aman dari kafir Quraisy. Menunjukkan rukhshah (keringanan) safar adalah hadiah cinta dari Allah SWT.'
  }
];

export interface MadhabLimit {
  name: string;
  distanceThreshold: string;
  durationLimit: string;
  jamaAccessibility: string;
  keyRule: string;
}

export const MADHAB_COMPARISON: MadhabLimit[] = [
  {
    name: 'Syafi\'i (Utama di Indonesia)',
    distanceThreshold: '16 Farsakh / 4 Burud (± 82 KM)',
    durationLimit: 'Maksimum 3 Hari (tidak termasuk hari masuk dan hari keluar)',
    jamaAccessibility: 'Diperbolehkan (Jama\' Taqdim & Jama\' Ta\'khir)',
    keyRule: 'Perjalanan harus bertujuan mubah (bukan perbuatan maksiat). Perhitungan hari mukim bermula saat sampai di kota tujuan, melahirkan hak rukhshah sampai batas 3 hari itu terlampaui.'
  },
  {
    name: 'Hanafi',
    distanceThreshold: '3 Marhalah / Durasi 3 Hari Perjalanan kaki/unta (± 96 KM)',
    durationLimit: 'Maksimum 15 Hari',
    jamaAccessibility: 'TIDAK DIPERBOLEHKAN (Kecuali Jama\' haji di Arafah & Muzdalifah)',
    keyRule: 'Qashar bersifat wajib (Azimah) bagi musafir. Shalat fardhu 4 rakaat mutlak dikerjakan 2 rakaat. Tidak ada syariat jama\' shalat karena perjalanan.'
  },
  {
    name: 'Maliki',
    distanceThreshold: '16 Farsakh (± 82 KM atau 48 Mil Hasyimi)',
    durationLimit: 'Kurang dari 4 Hari (20 kali waktu shalat)',
    jamaAccessibility: 'Diperbolehkan (Khususnya jika dalam perjalanan mendesak/sedang berjalan)',
    keyRule: 'Meng-qashar shalat hukumnya sunnah muakkadah bagi pelancong mubah. Jika berniat mukim selama 4 hari penuh atau lebih, gugur hak qashar sejak pertama mendarat di tujuan.'
  },
  {
    name: 'Hanbali',
    distanceThreshold: '16 Farsakh (± 82 KM)',
    durationLimit: 'Maksimum 4 Hari (atau lebih dari 21 waktu shalat)',
    jamaAccessibility: 'Diperbolehkan (Pilihan rukhshah yang luas, termasuk saat ketakutan atau sakit)',
    keyRule: 'Safar yang membolehkan rukhshah adalah perjalanan mubah sejauh minimal 16 farsakh. Bila musafir melewati batas mukim di atas, hak keringanan dicabut.'
  }
];
