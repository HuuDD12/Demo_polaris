export const changeHexColor = (color: { hue: number; brightness: number; saturation: number; alpha: number }) => {
    // Chuyển đổi từ HSL sang RGB
    const h = color.hue / 360;
    const s = color.saturation;
    const l = color.brightness / 2;
  
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    // Chuyển đổi từ RGB sang Hex
    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
  
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  
    return hex;
  };