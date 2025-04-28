function isAndroid() {
    // Check if running in a browser environment
    if (typeof window !== 'undefined' && window.navigator) {
      const userAgent = window.navigator.userAgent;
      // Check for Android device in the user agent string
      return /Android/i.test(userAgent);
    }
  
    // Check if running on a Node.js environment (such as Termux or other Android setups)
    if (typeof process !== 'undefined' && process.versions && process.versions['electron']) {
      // If running in Electron (Node.js + Chromium), check the platform
      return /android/i.test(process.platform);
    }
  
    // Default to false if neither environment is detected
    return false;
  }
  
export default {
    isAndroid
}