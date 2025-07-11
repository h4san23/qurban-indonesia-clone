
import React from 'react';
import { Users, Award, Heart, Shield, Target, Truck } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-green-200 text-lg">
            Indonesia Qurban - Al-Munawwir Farm, melayani kebutuhan qurban Anda dengan amanah
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Company Story */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Cerita Kami</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Indonesia Qurban - Al-Munawwir Farm didirikan pada tahun 2009 dengan visi 
                menyediakan layanan qurban yang amanah, transparan, dan berkualitas tinggi 
                untuk seluruh masyarakat Indonesia.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Berawal dari keprihatinan atas sulitnya mendapatkan layanan qurban yang 
                terpercaya, kami berkomitmen untuk memberikan solusi terbaik dengan 
                mengutamakan kualitas hewan, transparansi proses, dan kepuasan pelanggan.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Hingga saat ini, kami telah melayani lebih dari 5.000 keluarga Muslim 
                di seluruh Indonesia dengan tingkat kepuasan 100% dan terus berinovasi 
                untuk memberikan pelayanan terbaik.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=600&h=400&fit=crop"
                alt="Al-Munawwir Farm"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Target className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Visi Kami</h3>
            <p className="text-gray-600 leading-relaxed">
              Menjadi penyedia layanan qurban terdepan di Indonesia yang dipercaya 
              masyarakat dengan mengutamakan kualitas, transparansi, dan nilai-nilai 
              syariat Islam dalam setiap aspek pelayanan.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Misi Kami</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Menyediakan hewan qurban berkualitas tinggi</li>
              <li>• Melaksanakan proses qurban sesuai syariat</li>
              <li>• Memberikan pelayanan yang amanah dan transparan</li>
              <li>• Membantu distribusi daging kepada yang berhak</li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-3">Amanah</h4>
              <p className="text-gray-600">
                Menjaga kepercayaan pelanggan dengan transparansi penuh dalam setiap proses
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-green-600" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-3">Kualitas</h4>
              <p className="text-gray-600">
                Mengutamakan kualitas terbaik dalam pemilihan hewan dan proses qurban
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-3">Pelayanan</h4>
              <p className="text-gray-600">
                Memberikan pelayanan terbaik dengan customer service yang responsif
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tim Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-800">AH</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Ahmad Hidayat</h4>
              <p className="text-green-600 font-medium mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                15+ tahun pengalaman dalam bisnis peternakan dan layanan qurban
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-800">MR</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Muhammad Rahman</h4>
              <p className="text-green-600 font-medium mb-2">Head of Operations</p>
              <p className="text-gray-600 text-sm">
                Ahli dalam manajemen peternakan dan logistik distribusi
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-green-800">SF</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Siti Fatimah</h4>
              <p className="text-green-600 font-medium mb-2">Customer Relations</p>
              <p className="text-gray-600 text-sm">
                Spesialis dalam pelayanan pelanggan dan koordinasi qurban
              </p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-green-800 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Pencapaian Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-green-200">Tahun Berpengalaman</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-green-200">Keluarga Terlayani</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-green-200">Kota Jangkauan</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-green-200">Kepuasan Pelanggan</div>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Fasilitas Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-green-600">Peternakan Modern</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Kandang berstandar internasional</li>
                <li>• Sistem pakan berkualitas tinggi</li>
                <li>• Pengawasan kesehatan hewan 24/7</li>
                <li>• Dokter hewan berpengalaman</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-green-600">Fasilitas Pendukung</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Tempat penyembelihan higienis</li>
                <li>• Cold storage untuk preservasi</li>
                <li>• Armada distribusi lengkap</li>
                <li>• Sistem dokumentasi digital</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
