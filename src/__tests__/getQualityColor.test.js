import test from 'node:test';
import assert from 'node:assert/strict';
import { getQualityColor } from '../utils/getQualityColor.js';

test('returns green for good quality', () => {
  assert.equal(getQualityColor('good'), 'text-green-600 bg-green-100');
});

test('returns yellow for fair quality', () => {
  assert.equal(getQualityColor('fair'), 'text-yellow-600 bg-yellow-100');
});

test('returns red for poor quality', () => {
  assert.equal(getQualityColor('poor'), 'text-red-600 bg-red-100');
});

test('returns gray for unknown quality', () => {
  assert.equal(getQualityColor('unknown'), 'text-gray-600 bg-gray-100');
});
