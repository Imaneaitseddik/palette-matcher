/**
 * Convert RGB to Hexadecimal color representation
 * @param {number} r - Red component (0-255)
 * @param {number} g - Green component (0-255)
 * @param {number} b - Blue component (0-255)
 * @returns {string} Hexadecimal color value
 */
export const rgbToHex = (r, g, b) => {
    return `#${[r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('')}`;
  };
  
  /**
   * Convert RGB to HSL color representation
   * @param {number} r - Red component (0-255)
   * @param {number} g - Green component (0-255)
   * @param {number} b - Blue component (0-255)
   * @returns {Object} HSL color object
   */
  export const rgbToHsl = (r, g, b) => {
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    
    let h = 0, s = 0, l = (max + min) / 2;
  
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      if (max === rNorm) {
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
      } else if (max === gNorm) {
        h = (bNorm - rNorm) / d + 2;
      } else if (max === bNorm) {
        h = (rNorm - gNorm) / d + 4;
      }
      
      h /= 6;
    }
  
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };
  
  /**
   * Generate complementary color
   * @param {Object} color - Color object with HSL properties
   * @returns {string} Complementary color in hex
   */
  export const getComplementaryColor = (color) => {
    const { h, s, l } = color.hsl;
    const complementaryHue = (h + 180) % 360;
    
    return hslToHex(complementaryHue, s, l);
  };
  
  /**
   * Convert HSL to Hex
   * @param {number} h - Hue (0-360)
   * @param {number} s - Saturation (0-100)
   * @param {number} l - Lightness (0-100)
   * @returns {string} Hexadecimal color value
   */
  export const hslToHex = (h, s, l) => {
    const hNorm = h / 360;
    const sNorm = s / 100;
    const lNorm = l / 100;
    
    const hue2rgb = (p, q, t) => {
      let adjustedT = t;
      if (adjustedT < 0) adjustedT += 1;
      if (adjustedT > 1) adjustedT -= 1;
      if (adjustedT < 1/6) return p + (q - p) * 6 * adjustedT;
      if (adjustedT < 1/2) return q;
      if (adjustedT < 2/3) return p + (q - p) * (2/3 - adjustedT) * 6;
      return p;
    };
    
    let r, g, b;
    if (sNorm === 0) {
      r = g = b = lNorm;
    } else {
      const q = lNorm < 0.5 
        ? lNorm * (1 + sNorm) 
        : lNorm + sNorm - lNorm * sNorm;
      const p = 2 * lNorm - q;
      
      r = hue2rgb(p, q, hNorm + 1/3);
      g = hue2rgb(p, q, hNorm);
      b = hue2rgb(p, q, hNorm - 1/3);
    }
    
    const rgb = [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    ];
    
    return rgbToHex(rgb[0], rgb[1], rgb[2]);
  };
  
  /**
   * Generate a monochromatic color palette
   * @param {Object} baseColor - Base color object
   * @param {number} count - Number of colors to generate
   * @returns {string[]} Array of hex color values
   */
  export const generateMonochromaticPalette = (baseColor, count = 5) => {
    const { h, s, l } = baseColor.hsl;
    const palette = [];
    
    const lightnessSteps = count > 1 
      ? [20, 40, 60, 80, 100].slice(0, count)
      : [50];
    
    lightnessSteps.forEach(lightness => {
      const newColor = hslToHex(h, s, lightness);
      palette.push(newColor);
    });
    
    return palette;
  };
  
  /**
   * Generate triadic color scheme
   * @param {Object} baseColor - Base color object
   * @returns {string[]} Array of triadic colors in hex
   */
  export const generateTriadicColors = (baseColor) => {
    const { h, s, l } = baseColor.hsl;
    
    const triad1 = hslToHex((h + 120) % 360, s, l);
    const triad2 = hslToHex((h + 240) % 360, s, l);
    
    return [baseColor.hex, triad1, triad2];
  };