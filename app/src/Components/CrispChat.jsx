import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    // Inisialisasi Crisp Chat
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "eef69b58-02fe-43b4-a479-326892533add";

    // Tambahkan script Crisp ke dalam <head> halaman
    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);

  return null; // Tidak ada tampilan, hanya menjalankan script
};

export default CrispChat;
