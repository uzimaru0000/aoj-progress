export const calcGrassColor = progress => {
    const baseColor = {
        h: 120,
        s: 0,
        v: 100
    };

    const targetColor = {
        h: 120,
        s: 50,
        v: 65
    };

    const s = (targetColor.s - baseColor.s) / 100 * progress + baseColor.s;
    const v = (targetColor.v - baseColor.v) / 100 * progress + baseColor.v;

    return {
        h: baseColor.h,
        s: s,
        v: v
    };
};

export const hsvToRGB = hsv => {
    if (hsv.s === 0) {
        return {
            r: 255,
            g: 255,
            b: 255
        }
    }
    const c = hsv.v * hsv.s;
    const h = hsv.h / 60.0;
    const x = c * (1 - Math.abs(h % 2 - 1));
    let fixed = [0, 0, 0];
    if (0 <= h && h < 1) {
        fixed = [c, x, 0];
    } else if (1 <= h && h < 2) {
        fixed = [x, c, 0];
    } else if (2 <= h && h < 3) {
        fixed = [0, c, x];
    } else if (3 <= h && h < 4) {
        fixed = [0, x, c];
    } else if (4 <= h && h < 5) {
        fixed = [x, 0, c];
    } else if (5 <= h && h < 6) {
        fixed = [c, 0, x];
    }

    return {
        r: Math.floor(hsv.v - c + fixed[0]),
        g: Math.floor(hsv.v - c + fixed[1]),
        b: Math.floor(hsv.v - c + fixed[2])
    };
};

export const rgbToString = rgb => {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
};