/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const https = require('https');

https.get('https://api.alquran.cloud/v1/quran/quran-simple-clean', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const quran = JSON.parse(data).data.surahs;
    
    // Sajdah suras: 7, 13, 16, 17, 19, 22, 25, 27, 32, 38, 41, 53, 84, 96
    const sajdahSuras = [7, 13, 16, 17, 19, 22, 25, 27, 32, 38, 41, 53, 84, 96];
    
    const stats = {};
    let totalWords = 0;
    
    quran.forEach(sura => {
      let wordCount = 0;
      sura.ayahs.forEach(ayah => {
        // Simple word count by splitting spaces
        const words = ayah.text.trim().split(/\s+/);
        wordCount += words.length;
      });
      
      // Bismillah is included in the first ayah of Al-Fatihah, but for other suras it might be separate or not.
      // The API quran-simple-clean includes Bismillah in ayah 1 for Al-Fatihah, and for others it's part of ayah 1 text if it's there.
      // Actually, in api.alquran.cloud, Bismillah is part of ayah 1 for all suras except 1 and 9.
      // Let's just use the count from the API.
      
      stats[sura.number] = {
        words: wordCount,
        sajdah: sajdahSuras.includes(sura.number)
      };
      totalWords += wordCount;
    });
    
    console.log("Total words:", totalWords);
    
    // Now update lib/suras-data.ts
    let content = fs.readFileSync('lib/suras-data.ts', 'utf8');
    
    // Update interface
    if (!content.includes('words?: number;')) {
      content = content.replace('stories?: string[];', 'stories?: string[];\n  words?: number;\n  sajdah?: boolean;');
    }
    
    // Update each sura object
    for (let i = 1; i <= 114; i++) {
      const regex = new RegExp(`(\\{ id: ${i}, [^\\}]+)(\\})`);
      content = content.replace(regex, (match, p1) => {
        if (p1.includes('words:')) return match; // already updated
        return `${p1}, words: ${stats[i].words}, sajdah: ${stats[i].sajdah} }`;
      });
    }
    
    fs.writeFileSync('lib/suras-data.ts', content);
    console.log("Updated lib/suras-data.ts");
  });
}).on('error', (e) => {
  console.error(e);
});
