#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses WebP images to reduce file sizes for better performance
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Requirements:
 * 1. Install sharp: npm install --save-dev sharp
 * 2. Images should already be in WebP format
 * 3. This script provides guidance on further compression
 */

const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '../public/assets/images');

console.log('📊 Image Optimization Report');
console.log('============================\n');

if (!fs.existsSync(imageDir)) {
  console.log('❌ Images directory not found:', imageDir);
  process.exit(1);
}

const images = fs.readdirSync(imageDir).filter(f => /\.(webp|jpg|png)$/i.test(f));

if (images.length === 0) {
  console.log('✅ No images found in:', imageDir);
  process.exit(0);
}

let totalSize = 0;
const imageStats = [];

images.forEach(file => {
  const filePath = path.join(imageDir, file);
  const stats = fs.statSync(filePath);
  const sizeKb = (stats.size / 1024).toFixed(2);
  totalSize += stats.size;
  imageStats.push({ file, sizeKb: parseFloat(sizeKb), bytes: stats.size });
});

// Sort by size descending
imageStats.sort((a, b) => b.bytes - a.bytes);

console.log('Current Image Sizes:');
console.log('-------------------');
imageStats.forEach(img => {
  console.log(`${img.file.padEnd(45)} ${img.sizeKb.toString().padStart(8)} KB`);
});

console.log(`\n📦 Total: ${(totalSize / 1024 / 1024).toFixed(2)} MB\n`);

console.log('🎯 Optimization Recommendations:');
console.log('--------------------------------');
console.log('1. Use responsive images with srcset and sizes attributes');
console.log('2. Serve different image sizes based on viewport');
console.log('3. Consider using next-gen formats (WebP, AVIF)');
console.log('4. Add image lazy-loading attributes');
console.log('5. Compress with: npm install --save-dev sharp-cli');
console.log('   Then: sharp -i public/assets/images/*.webp -o dist/');
console.log('\n📋 Install Sharp for automated compression:\n');
console.log('npm install --save-dev sharp\n');
console.log('Then update package.json scripts with:');
console.log('"optimize-images": "node scripts/optimize-images-sharp.js"\n');
