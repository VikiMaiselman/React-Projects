import chroma from "chroma-js";
// allows working with colors, creating ranges, rgb values from hex etc.

const shadeLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// initialPalette example
// {
//     paletteName: "Material UI Colors",
//     id: "material-ui-colors",
//     emoji: "🎨",
//     colors: [
//       { name: "red", color: "#F44336" },
//       { name: "pink", color: "#E91E63" },
//       { name: "purple", color: "#9C27B0" },
//       { name: "deeppurple", color: "#673AB7" },
//       { name: "indigo", color: "#3F51B5" },
//       { name: "blue", color: "#2196F3" },
//       { name: "lightblue", color: "#03A9F4" },
//       { name: "cyan", color: "#00BCD4" },
//       { name: "teal", color: "#009688" },
//       { name: "green", color: "#4CAF50" },
//       { name: "lightgreen", color: "#8BC34A" },
//       { name: "lime", color: "#CDDC39" },
//       { name: "yellow", color: "#FFEB3B" },
//       { name: "amber", color: "#FFC107" },
//       { name: "orange", color: "#FF9800" },
//       { name: "deeporange", color: "#FF5722" },
//       { name: "brown", color: "#795548" },
//       { name: "grey", color: "#9E9E9E" },
//       { name: "bluegrey", color: "#607D8B" },
//     ],
//   },

export default function generateColors(initialPalette) {
  const newBiggerPalette = {
    paletteName: initialPalette.paletteName,
    id: initialPalette.id,
    emoji: initialPalette.emoji,
    colors: {},
  };

  for (let level of shadeLevels) {
    newBiggerPalette.colors[level] = [];
    // the structure of the newPalette colors will be
    // {
    //   50: [],
    //   100: [], etc.
    // }
  }

  for (let color of initialPalette.colors) {
    // loop over each color (now single) of initial pallete
    const colorRanges = generateColorRangesForSingleColor(
      color.color
    ).reverse(); //and generate a range of shades for this color (10 by default) and reverse them to start from lighter shades

    for (let [idx, level] of shadeLevels.entries()) {
      // iterate over each shade level, take from the colorRanges-array only the shade that corresponds to the shade level
      // add it to the specific shade level of the new palette
      // eg, colorRanges ['#ffffff', '#ffd9e6', '#fcb2ce', '#f68ab6', '#ed5e9e', '#df3d8c', '#ce317d', '#bd246f', '#ad1561', '#9c0054'] of pink
      // to newPallete[50] add '#ffffff', to newPallete[100] add '#ffd9e6' etc.
      const colorToPush = {
        name: `${color.name} ${shadeLevels[idx]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: colorRanges[idx],
        rgb: chroma(colorRanges[idx]).css(),
        rgba: chroma(colorRanges[idx])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      };
      newBiggerPalette.colors[level].push(colorToPush);
    }
  }

  return newBiggerPalette;
}

function generateColorRangesForSingleColor(hexColor, numberOfColors = 10) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
  // returns fully blown pallete of different color ranges of a single color
}

function getRange(hexColor) {
  const end = "#fff";
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
  //   the end result will be [darkened_orig_color_but_not_black, orig_color, white]
}
