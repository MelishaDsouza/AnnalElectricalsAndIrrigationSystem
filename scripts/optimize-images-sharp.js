#!/usr/bin/env node

/**
 * Advanced Image Compression Script using Sharp
 * Reduces image file sizes significantly with quality optimization
 * 
 * Installation:
 * npm install --save-dev sharp
 * 
 * Usage: node scripts/optimize-images-sharp.js
 */

try {
  const sharp = require('sharp');
  const fs = require('fs');
  const path = require('path');

  const imageDir = path.join(__dirname, '../public/assets/images');
  const outputDir = path.join(__dirname, '../public/assets/images-optimized');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const images = fs.readdirSync(imageDir).filter(f => /\.(webp|jpg|png)$/i.test(f));

  console.log('🚀 Starting Image Compression...\n');

  let totalOriginal = 0;
  let totalOptimized = 0;

  Promise.all(images.map(async (file) => {
    const inputPath = path.join(imageDir, file);
    const outputPath = path.join(outputDir, file);
    
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    totalOriginal += originalSize;

    try {
      const pipeline = sharp(inputPath);

      // Optimize based on format
      if (file.endsWith('.webp')) {
        pipeline.webp({ quality: 75, alphaQuality: 90 });
      } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        pipeline.jpeg({ quality: 75, progressive: true });
      } else if (file.endsWith('.png')) {
        pipeline.png({ compressionLevel: 9, quality: 80 });
      }

      await pipeline.toFile(outputPath);
      
      const optimizedStats = fs.statSync(outputPath);
      const optimizedSize = optimizedStats.size;
      totalOptimized += optimizedSize;
      
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      console.log(`✅ ${file.padEnd(40)} ${(originalSize/1024).toFixed(1)}KB → ${(optimizedSize/1024).toFixed(1)}KB (${savings}% saved)`);
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  })).then(() => {
    console.log('\n📊 Summary:');
    console.log(`Original: ${(totalOriginal/1024/1024).toFixed(2)} MB`);
    console.log(`Optimized: ${(totalOptimized/1024/1024).toFixed(2)} MB`);
    console.log(`Saved: ${((totalOriginal - totalOptimized)/1024/1024).toFixed(2)} MB`);
    console.log(`Total reduction: ${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)}%\n`);
    console.log('💡 Move optimized images to replace originals:');
    console.log(`mv ${outputDir}/* ${imageDir}/`);
  });
} catch (error) {
  console.error('⚠️  Sharp not installed. Install with:');
  console.error('npm install --save-dev sharp\n');
  process.exit(1);
}
