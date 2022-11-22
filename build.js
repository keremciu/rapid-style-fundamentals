const StyleDictionary = require('style-dictionary');

console.log('Build started...');
console.log('\n==============================================');


// REGISTER THE CUSTOM TRANFORMS
StyleDictionaryPackage.registerTransform({
  name: 'shadow/css',
  type: 'value',
  // necessary in case the color is an alias reference, or the shadows themselves are aliased
  transitive: true,
  matcher: (token) => token.type === 'boxShadow',
  transformer: (token) => {
    // allow both single and multi shadow tokens
    const shadow = Array.isArray(token.value) ? token.value : [token.value];

    const value = shadow.map((s) => {
      const { x, y, blur, color, type } = s;
      // support inset shadows as well
      return `${type === 'innerShadow' ? 'inset ' : ''}${x}px ${y}px ${blur}px ${color}`;
    });

    return value.join(', ');
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