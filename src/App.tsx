/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, User, Calendar, CheckSquare, MessageSquare, Save, ChevronLeft, Star, LayoutGrid, Book, PlayCircle, ClipboardCheck, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// --- KONFIGURASI BACKEND ---
// URL Google Apps Script yang cikgu berikan telah dimasukkan di sini
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw52UX7CTtaaMviBTCh64ZobyC1YCZb02ifv927es5luyzLmYiq6OzCIrEn2PIRouTd/exec";

const App = () => {
  // --- DATA MURID ---
  const studentList = [
    "AAIRA AILEEN BINTI RASUL HAMIDI", "ADAM FIRASH BIN MOHD FAIZ", "AISYAH HUMAIRAH BINTI MUHAMMAD FITRI",
    "ANDY MA'RUF DAENG MARAMBA BIN RUDI HARTONO", "ARIANA BATRISYA BINTI ZULKIFLI", "JIBRIL KALIFFA BIN FARISSADIKIN",
    "MUHAMAD IZWAN FAIQ BIN MUHAMAD NIZAM", "MUHAMAD YA NUHA BIN MOHAMAD ALIF", "MUHAMMAAD FAZHAN HANDIF BIN MUHAMMAAD KAMARULZAMAN",
    "MUHAMMAD ADEEB FAEQ BIN MOHD AZNAN FAREZTH", "MUHAMMAD AISY HARRAZ BIN MUHAMMAD SHUIB", "MUHAMMAD AMIRUL HAIKAL BIN ABDUL AZIM",
    "MUHAMMAD ANAS MIKAIL BIN MUHAMMAD SAMSUDDIN", "MUHAMMAD FARHAN ASSAURI BIN EDIY", "MUHAMMAD HARIS EZAINY BIN MOHD KUZAINI",
    "MUHAMMAD SAIF AR RAQIQ BIN MUHAMMAD TALHAH", "MUHAMMAD SHAHREEL RAYKAL BIN MUHAMMAD SHAMSUL ZAIRI",
    "NOR BALQIS MARIA SYAKIRA BINTI MUHAMMAD REZEKI MAHYUDIN", "NUR AIRISH INARA BINTI MOHD ZAMAKHSARY",
    "NUR DHALENNA BINTI DARIAKNO PUTRA", "NUR FADIA BINTI JUFRIANTO", "NUR FAIDA BINTI JUFRIANTO",
    "NUR LIYANA SHAHIRA BINTI SHAHROL NIZAM", "QARL RAUF BIN MOHD SUKRI", "RAJA NURNAJWA BINTI RAJA MUHAMAD SAHRIZAN"
  ];

  // --- DATA MODUL TAHUNAN (12 BULAN) ---
  const modulesData = [
    // FASA 1
    {
      id: 'm1', fasa: 'FASA 1: PENEROKAAN BENTUK & BUNYI TUNGGAL', color: 'bg-indigo-500', lightColor: 'bg-indigo-50', textColor: 'text-indigo-600',
      title: 'Bulan 1: Kumpulan "Perahu" & "Perut"',
      fokus: 'Murid boleh cam bentuk huruf walaupun kedudukan titik berubah.',
      aktiviti: ['Huruf: (ب ت ث) dan (ج ح خ)', 'Teknik: Mewarna mengikut kod titik. (Cth: 1 titik bawah = Merah, 2 titik atas = Kuning).'],
      criteria: ['Cam kumpulan Perahu (ب ت ث)', 'Cam kumpulan Perut (ج ح خ)', 'Mewarna ikut kod titik dengan betul']
    },
    {
      id: 'm2', fasa: 'FASA 1: PENEROKAAN BENTUK & BUNYI TUNGGAL', color: 'bg-indigo-500', lightColor: 'bg-indigo-50', textColor: 'text-indigo-600',
      title: 'Bulan 2: Kumpulan "Tajam" & "Lengkung"',
      fokus: 'Murid boleh cam bentuk huruf walaupun kedudukan titik berubah.',
      aktiviti: ['Huruf: (د ذ ر ز) dan (س ش ص ض)', 'Teknik: Melukis huruf di atas dulang pasir untuk melatih memori otot.'],
      criteria: ['Cam kumpulan Tajam (د ذ ر ز)', 'Cam kumpulan Lengkung (س ش ص ض)', 'Boleh bentuk huruf di pasir']
    },
    {
      id: 'm3', fasa: 'FASA 1: PENEROKAAN BENTUK & BUNYI TUNGGAL', color: 'bg-indigo-500', lightColor: 'bg-indigo-50', textColor: 'text-indigo-600',
      title: 'Bulan 3: Kumpulan "Leher Panjang" & "Bulat"',
      fokus: 'Murid boleh cam bentuk huruf walaupun kedudukan titik berubah.',
      aktiviti: ['Huruf: (ط ظ ع غ) dan (ف ق ك)', 'Teknik: Nyanyian lagu Hijaiyyah mengikut melodi "Twinkle Twinkle Little Star".'],
      criteria: ['Cam kumpulan Leher Panjang (ط ظ ع غ)', 'Cam kumpulan Bulat (ف ق ك)', 'Boleh nyanyi ikut urutan yang diajar']
    },
    {
      id: 'm4', fasa: 'FASA 1: PENEROKAAN BENTUK & BUNYI TUNGGAL', color: 'bg-indigo-500', lightColor: 'bg-indigo-50', textColor: 'text-indigo-600',
      title: 'Bulan 4: Kumpulan "Hujung"',
      fokus: 'Murid boleh cam bentuk huruf walaupun kedudukan titik berubah.',
      aktiviti: ['Huruf: (ل م ن و هـ ء ي)', 'Teknik: Flashcard pantas (Guru tunjuk, murid sebut dalam 3 saat).'],
      criteria: ['Cam kumpulan Hujung (ل m ن و هـ ء ي)', 'Respon flashcard kurang dari 3 saat']
    },
    // FASA 2
    {
      id: 'm5', fasa: 'FASA 2: SAKTI VOKAL (BARIS ASAS)', color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600',
      title: 'Bulan 5: Jelajah Fathah (Bunyi A)',
      fokus: 'Murid faham perubahan bunyi apabila tanda baris diletakkan.',
      aktiviti: ['Aktiviti: "Mulut Nganga"', 'Membaca barisan huruf dengan aksi tangan di atas kepala.'],
      criteria: ['Sebut huruf berbaris atas (Fathah)', 'Boleh buat aksi tangan di atas kepala', 'Buka mulut dengan betul (A)']
    },
    {
      id: 'm6', fasa: 'FASA 2: SAKTI VOKAL (BARIS ASAS)', color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600',
      title: 'Bulan 6: Jelajah Kasrah (Bunyi I)',
      fokus: 'Murid faham perubahan bunyi apabila tanda baris diletakkan.',
      aktiviti: ['Aktiviti: "Senyum Selalu"', 'Membaca dengan aksi tangan di bawah dagu.'],
      criteria: ['Sebut huruf berbaris bawah (Kasrah)', 'Boleh buat aksi tangan bawah dagu', 'Senyum bila menyebut bunyi (I)']
    },
    {
      id: 'm7', fasa: 'FASA 2: SAKTI VOKAL (BARIS ASAS)', color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600',
      title: 'Bulan 7: Jelajah Dhommah (Bunyi U)',
      fokus: 'Murid faham perubahan bunyi apabila tanda baris diletakkan.',
      aktiviti: ['Aktiviti: "Muncung Itik"', 'Membaca dengan aksi tangan digenggam ke depan.'],
      criteria: ['Sebut huruf berbaris depan (Dhommah)', 'Boleh buat aksi tangan ke depan', 'Muncung mulut dengan betul (U)']
    },
    {
      id: 'm8', fasa: 'FASA 2: SAKTI VOKAL (BARIS ASAS)', color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600',
      title: 'Bulan 8: Campuran 3 Baris',
      fokus: 'Murid faham perubahan bunyi apabila tanda baris diletakkan.',
      aktiviti: ['Aktiviti: Permainan Dadu.', 'Dadu 1 (Huruf), Dadu 2 (Baris). Murid perlu gabungkan bunyi (Cth: Jim + Baris Bawah = JI!).'],
      criteria: ['Boleh cam 3 jenis baris tanpa keliru', 'Berjaya gabung huruf dan baris pada dadu', 'Respon pantas bunyi campuran']
    },
    // FASA 3
    {
      id: 'm9', fasa: 'FASA 3: MISI SAMBUNG & BACA', color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600',
      title: 'Bulan 9: Huruf Sombong (Drakula)',
      fokus: 'Mengenal wajah huruf di awal, tengah dan akhir kata.',
      aktiviti: ['Fokus: (ا د ذ ر ز و) - Huruf yang tidak mahu kawan di depan.', 'Aktiviti: Melukis "pagar" selepas huruf sombong supaya murid tahu ia tak boleh sambung.'],
      criteria: ['Kenal 6 Huruf Sombong (Drakula)', 'Tahu melukis pagar pemisah', 'Faham huruf ini tak boleh bersambung selepasnya']
    },
    {
      id: 'm10', fasa: 'FASA 3: MISI SAMBUNG & BACA', color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600',
      title: 'Bulan 10: Transformasi Wajah',
      fokus: 'Mengenal wajah huruf di awal, tengah dan akhir kata.',
      aktiviti: ['Fokus: Huruf yang berubah bentuk sepenuhnya (Cth: (هـ) di tengah jadi (ـهـ), (ك) jadi (ـكـ)).', 'Aktiviti: Padankan "Kepala" huruf dengan "Badan" huruf.'],
      criteria: ['Cam perubahan bentuk huruf Ha (هـ)', 'Cam perubahan bentuk huruf Kaf (ك)', 'Berjaya padankan kepala dan badan huruf']
    },
    {
      id: 'm11', fasa: 'FASA 3: MISI SAMBUNG & BACA', color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600',
      title: 'Bulan 11: Gabung 2 Huruf',
      fokus: 'Membaca perkataan mudah (2 suku kata terbuka).',
      aktiviti: ['Membaca perkataan mudah (2 suku kata terbuka).', 'Contoh: (بَ + تَا = بَتَا). Gunakan kad cantum.'],
      criteria: ['Boleh gabung bunyi 2 huruf berbaris', 'Membaca tanpa mengeja (Cth: Ba-Ta)', 'Lancar bacaan 2 suku kata']
    },
    {
      id: 'm12', fasa: 'FASA 3: MISI SAMBUNG & BACA', color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600',
      title: 'Bulan 12: Pentaksiran Akhir & Konvokesyen',
      fokus: 'Ujian keseluruhan dan pemberian pengiktirafan.',
      aktiviti: ['Ujian lisan santai.', 'Murid yang lulus diberikan sijil "Bintang Al-Quran" / Ganjaran 10 Bintang.'],
      criteria: ['Lulus Ujian Lisan Santai', 'Mencapai target 80% penguasaan fasa sebelumnya', 'Layak terima Sijil Bintang Al-Quran']
    }
  ];

  // Group modules by Fasa
  const fasa1 = modulesData.filter(m => m.id.startsWith('m1') || m.id === 'm2' || m.id === 'm3' || m.id === 'm4');
  const fasa2 = modulesData.filter(m => m.id === 'm5' || m.id === 'm6' || m.id === 'm7' || m.id === 'm8');
  const fasa3 = modulesData.filter(m => m.id === 'm9' || m.id === 'm10' || m.id === 'm11' || m.id === 'm12');

  // --- STATE PENGURUSAN ---
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeModule, setActiveModule] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const [formData, setFormData] = useState({
    studentName: '',
    date: new Date().toISOString().split('T')[0],
    score: 3,
    achievements: [],
    notes: ''
  });

  // --- FUNGSI ---
  const openModule = (mod) => {
    setActiveModule(mod);
    setCurrentView('module-view');
  };

  const openRecordForm = () => {
    setFormData({
      studentName: '', date: new Date().toISOString().split('T')[0], score: 3, achievements: [], notes: ''
    });
    setCurrentView('record-form');
  };

  const handleCheckboxChange = (item) => {
    setFormData(prev => {
      const isChecked = prev.achievements.includes(item);
      return {
        ...prev,
        achievements: isChecked ? prev.achievements.filter(i => i !== item) : [...prev.achievements, item]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (GAS_WEB_APP_URL.trim() === "") {
      alert("Sila masukkan URL Google Apps Script yang sah.");
      return;
    }

    setIsSaving(true);
    
    // Format data untuk Google Apps Script menggunakan FormData (sesuai untuk doPost e.parameter)
    const dataToSend = new FormData();
    dataToSend.append('studentName', formData.studentName);
    dataToSend.append('date', formData.date);
    dataToSend.append('moduleTitle', activeModule.title);
    dataToSend.append('score', formData.score.toString());
    dataToSend.append('notes', formData.notes);
    dataToSend.append('achievements', formData.achievements.join(' | ')); // Pisahkan kriteria dengan simbol pipe

    try {
      // mode: 'no-cors' penting untuk GAS Web App elak isu CORS dari front-end luaran
      await fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        body: dataToSend,
        mode: 'no-cors'
      });
      
      // Oleh kerana mode no-cors menyekat kita dari melihat respons sebenar pelayan,
      // kita beranggapan permintaan berjaya dihantar jika tiada ralat network (catch).
      setIsSaving(false);
      setToastMessage('Rekod Berjaya Disimpan!');
      setTimeout(() => { setToastMessage(''); setCurrentView('module-view'); }, 2000);

    } catch (error) {
      console.error(error);
      setIsSaving(false);
      alert('Ralat semasa menghantar data. Sila semak sambungan internet atau tetapan CORS Apps Script.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] text-[#1e293b] font-sans p-6 pb-24">
      
      {/* HEADER */}
      <header className="bg-white border-[1.5px] border-[#e2e8f0] rounded-[20px] p-4 px-6 shadow-sm mb-6 max-w-6xl mx-auto flex items-center justify-between sticky top-6 z-10">
        <div className="flex items-center gap-4">
          {currentView !== 'dashboard' && (
            <button 
              onClick={() => currentView === 'record-form' ? setCurrentView('module-view') : setCurrentView('dashboard')} 
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors mr-1 min-h-[48px] min-w-[48px] flex justify-center items-center touch-manipulation text-slate-600"
            >
              <ChevronLeft size={28} />
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="bg-[#047857] text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl">G</div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#047857] leading-none uppercase">Rekod Perkembangan Murid</h1>
              <p className="text-[#64748b] text-xs mt-1 font-medium italic">Tahap Penguasaan Huruf Hijaiyyah</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-right">
          <div>
            <div className="font-semibold text-sm">Ustaz Zubair Sofian</div>
            <div className="text-[11px] text-[#64748b] uppercase tracking-wider font-bold">Guru Pendidikan Islam</div>
          </div>
          <div className="w-10 h-10 bg-[#e2e8f0] rounded-full flex items-center justify-center font-bold text-[#64748b]">UZ</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">

        {/* ================= DASHBOARD ================= */}
        {currentView === 'dashboard' && (
          <div className="grid grid-cols-12 gap-4 animate-fade-in">
            
            {/* Welcome Card */}
            <div className="col-span-12 lg:col-span-8 row-span-2 bg-gradient-to-br from-[#065f46] to-[#047857] text-white p-8 rounded-[24px] relative overflow-hidden flex flex-col justify-center min-h-[240px]">
              <div className="relative z-10">
                <div className="text-xs font-bold uppercase tracking-[0.1em] opacity-80 mb-2">Tahun 3 Dahlia</div>
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Selamat Datang!</h2>
                <p className="mt-4 opacity-90 text-base max-w-md leading-relaxed">Pantau perkembangan bacaan Hijaiyyah anak murid anda secara berperingkat melalui fasa penerokaan yang tersusun.</p>
              </div>
              <div className="absolute bottom-[-20px] right-[-20px] opacity-10 text-[160px] font-bold select-none leading-none">
                &#1575;
              </div>
            </div>

            {/* Stats Card */}
            <div className="col-span-12 lg:col-span-4 row-span-4 bg-white border-[1.5px] border-[#e2e8f0] p-6 rounded-[24px] flex flex-col shadow-sm">
              <div className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#94a3b8] mb-6 flex items-center gap-2">
                <LayoutGrid size={16} /> Ringkasan Penguasaan
              </div>
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="text-5xl font-extrabold text-[#047857]">25 / 25</div>
                <div className="text-sm font-semibold text-[#64748b] mt-2">Murid Aktif Terdaftar</div>
                <div className="w-full h-2 bg-[#f1f5f9] rounded-full mt-6 overflow-hidden">
                  <div className="w-[84%] h-full bg-[#10b981] rounded-full"></div>
                </div>
                <div className="text-[11px] text-[#94a3b8] mt-3 font-bold uppercase tracking-tighter">84% Purata Penguasaan Keseluruhan</div>
              </div>

              <div className="flex-grow space-y-4">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Analisis Tahap (TP)</p>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { tp: 'TP1', murid: 1 },
                      { tp: 'TP2', murid: 3 },
                      { tp: 'TP3', murid: 12 },
                      { tp: 'TP4', murid: 7 },
                      { tp: 'TP5', murid: 2 },
                    ]}>
                      <XAxis dataKey="tp" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 700}}
                      />
                      <Bar dataKey="murid" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-5 gap-1 text-center">
                  {[1, 2, 3, 4, 5].map(tp => (
                    <div key={tp} className="text-[9px] font-bold text-slate-400">TP{tp}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* FASA RENDERER */}
            {[
              { title: "FASA 1: PENEROKAAN", data: fasa1, border: "border-t-[6px] border-t-[#6366f1]", iconColor: "bg-[#e0e7ff] text-[#4338ca]" },
              { title: "FASA 2: SAKTI VOKAL", data: fasa2, border: "border-t-[6px] border-t-[#10b981]", iconColor: "bg-[#d1fae5] text-[#047857]" },
              { title: "FASA 3: MISI SAMBUNG", data: fasa3, border: "border-t-[6px] border-t-[#f59e0b]", iconColor: "bg-[#fef3c7] text-[#b45309]" }
            ].map((section, idx) => (
              <div key={idx} className={`col-span-12 md:col-span-4 bg-white border-[1.5px] border-[#e2e8f0] p-6 rounded-[24px] shadow-sm ${section.border}`}>
                <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#94a3b8] mb-6 flex items-center gap-2">
                  <BookOpen size={16} /> {section.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {section.data.map((mod, mIdx) => (
                    <button 
                      key={mod.id} 
                      onClick={() => openModule(mod)}
                      className="bg-[#f8fafc] p-3 rounded-[16px] border border-[#f1f5f9] hover:bg-[#f1f5f9] transition-all text-left flex items-center gap-4 group touch-manipulation"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${section.iconColor}`}>
                        {String(mIdx + 1 + (idx * 4)).padStart(2, '0')}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-[#1e293b] truncate">{mod.title.split(': ')[1] || mod.title}</h4>
                        <p className="text-[11px] text-[#64748b] truncate mt-0.5">{mod.fokus}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= MODULE VIEW ================= */}
        {currentView === 'module-view' && activeModule && (
          <div className="animate-fade-in max-w-3xl mx-auto">
            <div className={`p-8 rounded-t-[32px] text-white ${activeModule.color} shadow-lg relative overflow-hidden`}>
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-3">{activeModule.fasa}</p>
                <h2 className="text-3xl font-extrabold leading-tight">{activeModule.title}</h2>
                <p className="mt-4 opacity-95 text-base leading-relaxed max-w-xl">{activeModule.fokus}</p>
              </div>
              <div className="absolute top-[-20px] right-[-20px] opacity-10 text-[120px] font-bold select-none">
                {activeModule.id.replace('m', '')}
              </div>
            </div>

            <div className="bg-white p-8 rounded-b-[32px] border-[1.5px] border-t-0 border-[#e2e8f0] shadow-sm space-y-8">
              {/* Teaching Notes */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-6">
                  <PlayCircle size={20} className={activeModule.textColor} /> 
                  Aktiviti & Teknik Pengajaran
                </h3>
                <div className="grid gap-4">
                  {activeModule.aktiviti.map((nota, idx) => (
                    <div key={idx} className="flex gap-4 text-sm text-slate-700 bg-[#f8fafc] p-5 rounded-[20px] border border-[#f1f5f9] leading-relaxed">
                      <span className={`font-extrabold text-lg ${activeModule.textColor}`}>{String(idx + 1).padStart(2, '0')}</span>
                      <span className="font-medium">{nota}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rutin Harian Alert */}
              <div className="bg-blue-50 border border-blue-100 p-5 rounded-[24px] flex gap-4 items-start">
                <div className="p-2 bg-blue-100 rounded-xl text-blue-600 shrink-0">
                  <Info size={20} />
                </div>
                <div className="text-sm">
                  <span className="font-bold text-blue-900 block mb-1 text-base">Rutin 5 Minit (Pengulangan):</span>
                  <span className="text-blue-700 leading-relaxed font-medium">Pasang lagu Hijaiyyah, buat imbasan kad rawak (3 saat), dan tulis di udara. <strong className="text-blue-900">Sistem Token:</strong> 10 Bintang = Ganjaran.</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <button 
                  onClick={openRecordForm}
                  className="w-full py-5 bg-[#047857] hover:bg-[#065f46] text-white rounded-[24px] font-bold text-lg flex justify-center items-center gap-3 shadow-xl shadow-emerald-900/10 transition-all active:scale-[0.98] touch-manipulation"
                >
                  <ClipboardCheck size={24} />
                  Rekod Pencapaian Murid
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= RECORD FORM ================= */}
        {currentView === 'record-form' && activeModule && (
          <form onSubmit={handleSubmit} className="bg-white rounded-[32px] shadow-sm border-[1.5px] border-[#e2e8f0] overflow-hidden animate-fade-in max-w-3xl mx-auto">
            <div className={`p-6 ${activeModule.lightColor} border-b border-[#e2e8f0] flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${activeModule.color} text-white`}>
                  <ClipboardCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Penilaian Modul</p>
                  <p className={`text-sm font-extrabold ${activeModule.textColor} truncate max-w-[200px] md:max-w-none`}>{activeModule.title}</p>
                </div>
              </div>
              <div className="bg-white/50 px-3 py-1 rounded-full border border-white text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                {activeModule.fasa.split(':')[0]}
              </div>
            </div>

            <div className="p-6 md:p-10 space-y-8">
              
              {/* Nama & Tarikh */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <User size={16} className="text-[#047857]" /> Pilih Murid
                  </label>
                  <select 
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    required
                    className="w-full p-4 border-[1.5px] border-[#e2e8f0] rounded-[20px] focus:ring-2 focus:ring-[#047857] focus:border-transparent outline-none bg-[#f8fafc] text-sm font-semibold min-h-[56px] appearance-none"
                  >
                    <option value="" disabled>-- Pilih Nama Murid --</option>
                    {studentList.map(name => <option key={name} value={name}>{name}</option>)}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Calendar size={16} className="text-[#047857]" /> Tarikh Sesi
                  </label>
                  <input 
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                    className="w-full p-4 border-[1.5px] border-[#e2e8f0] rounded-[20px] focus:ring-2 focus:ring-[#047857] focus:border-transparent outline-none bg-[#f8fafc] text-sm font-semibold min-h-[56px]"
                  />
                </div>
              </div>

              {/* Senarai Semak */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <CheckSquare size={16} className={activeModule.textColor} /> Kriteria Penguasaan
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {activeModule.criteria.map((item, idx) => (
                    <label key={idx} className={`flex items-center p-5 rounded-[20px] border-[1.5px] cursor-pointer transition-all ${formData.achievements.includes(item) ? `${activeModule.lightColor} border-${activeModule.color.split('-')[1]}-200 shadow-sm` : 'bg-[#f8fafc] border-[#e2e8f0] opacity-70'}`}>
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="checkbox" 
                          checked={formData.achievements.includes(item)}
                          onChange={() => handleCheckboxChange(item)}
                          className="sr-only"
                        />
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.achievements.includes(item) ? `${activeModule.color} border-transparent` : 'border-slate-300 bg-white'}`}>
                          {formData.achievements.includes(item) && <CheckSquare size={16} className="text-white" />}
                        </div>
                      </div>
                      <span className={`ml-4 text-sm font-bold leading-snug ${formData.achievements.includes(item) ? 'text-slate-800' : 'text-slate-500'}`}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skor & Nota */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Star size={16} className="text-amber-500" /> Tahap Penguasaan (1-5)
                  </label>
                  <div className="flex gap-3 justify-between">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({...formData, score: num})}
                        className={`flex-1 h-14 rounded-[18px] font-extrabold text-xl flex items-center justify-center transition-all touch-manipulation border-[1.5px] ${formData.score === num ? 'bg-amber-500 text-white border-transparent shadow-lg shadow-amber-500/20 transform scale-105' : 'bg-[#f8fafc] text-slate-400 border-[#e2e8f0] hover:bg-slate-100'}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <MessageSquare size={16} className="text-[#047857]" /> Catatan Guru
                  </label>
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                    placeholder="Masukkan ulasan atau cadangan penambahbaikan..."
                    className="w-full p-5 border-[1.5px] border-[#e2e8f0] rounded-[24px] focus:ring-2 focus:ring-[#047857] focus:border-transparent outline-none bg-[#f8fafc] text-sm font-medium resize-none"
                  ></textarea>
                </div>
              </div>

            </div>

            {/* Butang Aksi */}
            <div className="bg-[#f8fafc] p-6 md:p-8 border-t border-[#e2e8f0] flex flex-col sm:flex-row gap-4">
              <button 
                type="button"
                onClick={() => setCurrentView('module-view')}
                className="w-full sm:w-1/3 py-5 bg-white border-[1.5px] border-[#e2e8f0] text-slate-600 rounded-[24px] font-bold hover:bg-slate-50 transition-all touch-manipulation"
              >
                Batal
              </button>
              <button 
                type="submit" 
                disabled={isSaving}
                className={`w-full sm:w-2/3 py-5 bg-[#047857] text-white rounded-[24px] font-bold text-lg flex justify-center items-center gap-3 shadow-xl shadow-emerald-900/10 hover:bg-[#065f46] active:scale-[0.98] transition-all touch-manipulation ${isSaving ? 'opacity-75' : ''}`}
              >
                {isSaving ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={24} /> Simpan Rekod
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </main>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-bounce-short w-max max-w-[90vw]">
          <CheckSquare size={24} className="text-emerald-400" />
          <span className="font-bold text-base">{toastMessage}</span>
        </div>
      )}

      {/* ANIMATION STYLES */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes bounceShort { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, -10px); } }
        .animate-bounce-short { animation: bounceShort 0.5s ease-in-out; }
      `}} />
    </div>
  );
};

export default App;
