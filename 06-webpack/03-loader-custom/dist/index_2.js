const {
  validate
} = require('schema-utils');
const {
  getOptions
} = require('loader-utils');
const schema = require('./options.json');
module.exports = function loader(source) {
  const {
    version,
    webpack
  } = this;
  const options = this.getOptions();
  // const options = getOptions(this)

  validate(schema, options, "Loader");
  const json = JSON.stringify(source).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : true;
  return `${esModule ? 'export default' : 'module.exports ='} ${json};`;
};