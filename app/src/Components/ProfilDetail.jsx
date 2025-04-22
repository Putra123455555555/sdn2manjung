import React from 'react';

const ProfilDetail = ({ detailSekolah }) => {
  return (
    <>
      {/* Grid Kartu 2 */}
      <div className="bg-[#DFDFDF] py-3 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2">
        <img src="/image/icon5.png" className="bg-white rounded-full h-20 p-3" />
        <h1 className="text-lg font-semibold text-center">No. Pendirian Sekolah</h1>
        <p className="text-md text-center">{detailSekolah.noPendirian}</p>
        <h1 className="text-lg font-semibold text-center">No. Sertifikat</h1>
        <p className="text-md text-center">{detailSekolah.noSertif}</p>
      </div>

      {/* Grid Kartu 3 */}
      <div className="bg-[#DFDFDF] py-3 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2">
        <img src="/image/icon6.png" className="bg-white rounded-full h-20 p-6" />
        <h1 className="text-lg font-semibold text-center">No. Statistik Sekolah</h1>
        <p className="text-md text-center">{detailSekolah.noStatistik}</p>
        <h1 className="text-lg font-semibold text-center">NPSN</h1>
        <p className="text-md text-center">{detailSekolah.npsn}</p>
      </div>

      {/* Grid Kartu 4 */}
      <div className="bg-[#DFDFDF] py-3 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2">
        <img src="/image/icon9.png" className="bg-white rounded-full h-20 p-3" />
        <h1 className="text-lg font-semibold text-center">Jenjang Akreditasi</h1>
        <p className="text-md text-center">{detailSekolah.jenjangAkreditas}</p>
        <h1 className="text-lg font-semibold text-center">Tahun Didirikan</h1>
        <p className="text-md text-center">{detailSekolah.thDidirikan}</p>
        <h1 className="text-lg font-semibold text-center">Tahun Operasional</h1>
        <p className="text-md text-center">{detailSekolah.thOperasional}</p>
      </div>

      {/* Grid Kartu 5 */}
      <div className="bg-[#DFDFDF] py-3 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2">
        <img src="/image/icon8.png" className="bg-white rounded-full h-20 p-3" />
        <h1 className="text-lg font-semibold text-center">Status Kepemilikan Tanah</h1>
        <p className="text-md text-center">{detailSekolah.statusTanah}</p>
        <h1 className="text-lg font-semibold text-center">Luas Tanah</h1>
        <p className="text-md text-center">{detailSekolah.luasTanah}</p>
        <h1 className="text-lg font-semibold text-center">Status Kepemilikan Bangunan</h1>
        <p className="text-md text-center">{detailSekolah.statusBangunan}</p>
      </div>

      {/* Grid Kartu 6 */}
      <div className="bg-[#DFDFDF] py-3 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2">
        <img src="/image/icon5.png" className="bg-white rounded-full h-20 p-3" />
        <h1 className="text-lg font-semibold text-center">No. Pendirian Sekolah</h1>
        <p className="text-md text-center">{detailSekolah.noPendirian}</p>
        <h1 className="text-lg font-semibold text-center">No. Sertifikat</h1>
        <p className="text-md text-center">{detailSekolah.noSertif}</p>
      </div>

      {/* Grid Kartu 7 */}
      <div className="bg-[#DFDFDF] py-3 rounded-lg shadow-md flex flex-col items-center justify-center space-y-2">
        <img src="/image/icon5.png" className="bg-white rounded-full h-20 p-3" />
        <h1 className="text-lg font-semibold text-center">Luas Seluruh Bangunan</h1>
        <p className="text-md text-center">{detailSekolah.luasBangunan}</p>
        <h1 className="text-lg font-semibold text-center">Sisi Lahan Seluruhnya</h1>
        <p className="text-md text-center">{detailSekolah.totalLahan}</p>
      </div>
    </>
  );
};

export default ProfilDetail;
