#!/usr/bin/env node

/**
 * Quick test to verify Paystack and PayFast configuration
 * This tests that environment variables are properly loaded and accessible
 */

import dotenv from 'dotenv';
dotenv.config();

console.log('='.repeat(60));
console.log('Testing Payment Gateway Configuration');
console.log('='.repeat(60));

// Test Paystack Configuration
console.log('\n📱 PAYSTACK CONFIGURATION:');
const paystackPublic = process.env.PAYSTACK_PUBLIC_KEY;
const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

if (paystackPublic) {
  console.log(`✅ PAYSTACK_PUBLIC_KEY: ${paystackPublic.substring(0, 10)}...${paystackPublic.substring(paystackPublic.length - 5)}`);
} else {
  console.log('❌ PAYSTACK_PUBLIC_KEY: NOT SET');
}

if (paystackSecret) {
  console.log(`✅ PAYSTACK_SECRET_KEY: ${paystackSecret.substring(0, 10)}...${paystackSecret.substring(paystackSecret.length - 5)}`);
} else {
  console.log('❌ PAYSTACK_SECRET_KEY: NOT SET');
}

// Test PayFast Configuration
console.log('\n💳 PAYFAST CONFIGURATION:');
const payfastMerchantId = process.env.PAYFAST_MERCHANT_ID;
const payfastMerchantKey = process.env.PAYFAST_MERCHANT_KEY;
const payfastPassphrase = process.env.PAYFAST_PASSPHRASE;
const payfastUrl = process.env.PAYFAST_URL;

if (payfastMerchantId) {
  console.log(`✅ PAYFAST_MERCHANT_ID: ${payfastMerchantId}`);
} else {
  console.log('❌ PAYFAST_MERCHANT_ID: NOT SET');
}

if (payfastMerchantKey) {
  console.log(`✅ PAYFAST_MERCHANT_KEY: ${payfastMerchantKey.substring(0, 5)}...${payfastMerchantKey.substring(payfastMerchantKey.length - 3)}`);
} else {
  console.log('❌ PAYFAST_MERCHANT_KEY: NOT SET');
}

if (payfastPassphrase) {
  console.log(`✅ PAYFAST_PASSPHRASE: ${payfastPassphrase.substring(0, 5)}...${payfastPassphrase.substring(payfastPassphrase.length - 3)}`);
} else {
  console.log('⚠️  PAYFAST_PASSPHRASE: NOT SET (optional)');
}

if (payfastUrl) {
  console.log(`✅ PAYFAST_URL: ${payfastUrl}`);
} else {
  console.log('❌ PAYFAST_URL: NOT SET');
}

console.log('\n' + '='.repeat(60));
console.log('SUMMARY:');
console.log('='.repeat(60));

const allConfigured = paystackPublic && paystackSecret && payfastMerchantId && payfastMerchantKey && payfastUrl;

if (allConfigured) {
  console.log('✅ All payment gateways are properly configured!');
  console.log('   Paystack: Ready');
  console.log('   PayFast: Ready');
  console.log('\n🚀 You can proceed with payment processing!');
} else {
  console.log('⚠️  Some payment gateway credentials are missing!');
  console.log('\nTo configure, set the following environment variables:');
  console.log('  PAYSTACK_PUBLIC_KEY=pk_live_...');
  console.log('  PAYSTACK_SECRET_KEY=sk_live_...');
  console.log('  PAYFAST_MERCHANT_ID=...');
  console.log('  PAYFAST_MERCHANT_KEY=...');
  console.log('  PAYFAST_PASSPHRASE=... (optional)');
  console.log('  PAYFAST_URL=https://www.payfast.co.za/eng/process');
}

console.log('='.repeat(60));
