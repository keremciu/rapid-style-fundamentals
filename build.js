const StyleDictionary = require('style-dictionary');

console.log('Build started...');
console.log('\n==============================================');


// REGISTER THE CUSTOM TRANFORMS
/**
 * Based on: https://github.com/six7/figma-tokens/issues/379#issuecomment-1116953915
 */
 StyleDictionary.registerTransform({
  name: "shadow/css",
  type: "value",
  transitive: true, // Necessary when the color is an alias reference, or the shadows themselves are aliased
  matcher: (token) => token.type === "boxShadow",
  transformer: (token) => {
    // Allow both single and multi shadow tokens:
    const shadows = Array.isArray(token.value) ? token.value : [token.value];

    const transformedShadows = shadows.map((shadow) => {
      const { x, y, blur, spread, color, type } = shadow;
      const inset = type === "innerShadow" ? "inset " : "";
      return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`;
    });

    return transformedShadows.join(", ");
  },
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryExtended = StyleDictionary.extend(__dirname + '/config.json');


// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();


console.log('\n==============================================');
console.log('\nBuild completed!');