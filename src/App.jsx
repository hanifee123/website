import React, { useState, useEffect } from 'react';
import './CountdownApp.css'; // CSS dosyasını import et

const CountdownApp = () => {
  // Hedef tarih (yıl, ay (0-11), gün, saat, dakika, saniye)
  const targetDate = new Date(2024, 7, 14, 15, 21, 38);

  // State hook'ları
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  // Hedef tarihe kalan süreyi hesaplamak için yardımcı fonksiyon
  function calculateTimeRemaining() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds
      };
    } else {
      // Eğer hedef tarih geçmişse, kalan süreyi sıfırla
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
  }

  useEffect(() => {
    // Her saniye kalan süreyi güncelle
    const countdownInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Component unmount edildiğinde setInterval'i temizle
    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div>
      <h1>Kalan Süre:</h1>
      <div>
        <span>{timeRemaining.days} gün </span>
        <span>{timeRemaining.hours} saat </span>
        <span>{timeRemaining.minutes} dakika </span>
        <span>{timeRemaining.seconds} saniye </span>
      </div>
    </div>
  );
};

export default CountdownApp;
