#!/usr/bin/env node

/**
 * Advanced Image Optimization Script for Mobile
 * Generates responsive image variants optimized for different screen sizes
 * 
 * Usage: node scripts/optimize-images-sharp.js
 * 
 * Requirements:
 * 1. Install sharp: npm install --save-dev sharp
 * 2. Images should already be in WebP format
 * 3. Creates mobile (480px), tablet (768px), and desktop (1024px+) variants
 * 
 * This script:
 * - Reduces file sizes for mobile (5MB+ savings possible)
 * - Creates responsive image srcset variants
 * - Optimizes video thumbnails
 * - Maintains quality while reducing bandwidth
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const imageDir = path.join(__dirname, '../public/assets/images');

// Define image sizes for responsive images
const imageSizes = {
  // Main gallery/service images: full width display
  'water-fountain-lights-mangalore': [
    { name: '-mobile', width: 480, height: 360, quality: 75 },
    { name: '-tablet', width: 768, height: 576, quality: 80 },
    { name: '', width: 1024, height: 768, quality: 85 } // default
  ],
  'swimming-pool-mangalore': [
    { name: '-mobile', width: 480, height: 320, quality: 75 },
    { name: '-tablet', width: 768, height: 512, quality: 80 },
    { name: '', width: 1024, height: 682, quality: 85 }
  ],
  'solar-panels-mangalore': [
    { name: '-mobile', width: 480, height: 360, quality: 75 },
    { name: '-tablet', width: 768, height: 576, quality: 80 },
    { name: '', width: 1024, height: 768, quality: 85 }
  ],
  'drip-irrigation-mangalore': [
    { name: '-mobile', width: 480, height: 360, quality: 75 },
    { name: '-tablet', width: 768, height: 576, quality: 80 },
    { name: '', width: 1024, height: 768, quality: 85 }
  ],
  'hightension-mangalore': [
    { name: '-mobile', width: 480, height: 360, quality: 75 },
    { name: '-tablet', width: 768, height: 576, quality: 80 },
    { name: '', width: 1024, height: 768, quality: 85 }
  ],
  // Thumbnails for gallery (120x90)
  'water-fountain-design-layout-mangalore': [
    { name: '-thumb', width: 120, height: 90, quality: 75 },
    { name: '-thumb-2x', width: 240, height: 180, quality: 80 }
  ],
  'water-fountain-design-mangalore': [
    { name: '-thumb', width: 120, height: 90, quality: 75 },
    { name: '-thumb-2x', width: 240, height: 180, quality: 80 }
  ],
  'water-fountain-mangalore': [
    { name: '-thumb', width: 120, height: 90, quality: 75 },
    { name: '-thumb-2x', width: 240, height: 180, quality: 80 }
  ],
  'sprinklers-farm-mangalore': [
    { name: '-thumb', width: 120, height: 90, quality: 75 },
    { name: '-thumb-2x', width: 240, height: 180, quality: 80 }
  ],
  'sprinklers-mangalore': [
    { name: '-thumb', width: 120, height: 90, quality: 75 },
    { name: '-thumb-2x', width: 240, height: 180, quality: 80 }
  ],
  'sprinkler-garden-mangalore': [
    { name: '-thumb', width: 120, height: 90, quality: 75 },
    { name: '-thumb-2x', width: 240, height: 180, quality: 80 }
  ],
  // Logos
  'annal-electricals-logo-mangalore': [
    { name: '', width: 166, height: 166, quality: 85 }
  ],
  'rainbird-logo': [
    { name: '', width: 200, height: 100, quality: 85 }
  ]
};

async function optimizeImage(imagePath, imageName, sizes) {
  try {
    const ext = path.extname(imagePath);
    const baseName = path.basename(imagePath, ext);
    const dir = path.dirname(imagePath);

    for (const size of sizes) {
      const outputName = `${baseName}${size.name}${ext}`;
      const outputPath = path.join(dir, outputName);

      // Skip if trying to overwrite the original file
      if (outputPath === imagePath) {
        continue;
      }

      // Skip if file already exists and is recent
      if (fs.existsSync(outputPath)) {
        const stats = fs.statSync(outputPath);
        const age = Date.now() - stats.mtimeMs;
        if (age < 86400000) { // Less than 24 hours old
          continue;
        }
      }

      await sharp(imagePath)
        .resize(size.width, size.height, {
          fit: 'cover',
          position: 'center',
          withoutEnlargement: true
        })
        .webp({ quality: size.quality })
        .toFile(outputPath);

      const originalSize = fs.statSync(imagePath).size / 1024;
      const optimizedSize = fs.statSync(outputPath).size / 1024;
      const savings = originalSize - optimizedSize;
      const percent = Math.round((savings / originalSize) * 100);

      console.log(`✅ ${outputName.padEnd(45)} ${optimizedSize.toFixed(1).padStart(7)} KB (saved ${percent}%)`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${imagePath}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Image Optimization Report - Mobile First');
  console.log('=============================================\n');

  if (!fs.existsSync(imageDir)) {
    console.log('❌ Images directory not found:', imageDir);
    process.exit(1);
  }

  // Get all WebP images, excluding already-optimized variants
  const allImages = fs.readdirSync(imageDir).filter(f => f.endsWith('.webp'));
  
  // Filter to only base images (exclude -mobile, -tablet, -thumb variants)
  const baseImages = allImages.filter(f => {
    const name = f.replace(/\.webp$/, '');
    return !name.includes('-mobile') && !name.includes('-tablet') && !name.includes('-thumb');
  });

  if (baseImages.length === 0) {
    console.log('✅ No base images found in:', imageDir);
    process.exit(0);
  }

  console.log(`Found ${baseImages.length} base images to optimize:\n`);

  for (const image of baseImages) {
    const imagePath = path.join(imageDir, image);
    const baseName = path.basename(image, '.webp');
    
    // Use default sizes if not specified
    const sizes = imageSizes[baseName] || [
      { name: '-mobile', width: 480, height: 360, quality: 75 },
      { name: '-tablet', width: 768, height: 576, quality: 80 }
    ];

    await optimizeImage(imagePath, baseName, sizes);
  }

  console.log('\n✨ Optimization Complete!');
  console.log('\n📋 Next Steps:');
  console.log('1. Verify image quality in browser');
  console.log('2. Deploy optimized images to production');
  console.log('3. Run Lighthouse again to measure improvements');
  console.log('\n💾 Install Sharp if not already installed:');
  console.log('   npm install --save-dev sharp\n');
}

// Run main function
main().catch(error => {
  console.error('❌ Error running optimization:', error.message);
  process.exit(1);
});
