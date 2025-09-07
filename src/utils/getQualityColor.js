export function getQualityColor(quality) {
  switch (quality) {
    case 'good':
      return 'text-green-600 bg-green-100';
    case 'fair':
      return 'text-yellow-600 bg-yellow-100';
    case 'poor':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}
