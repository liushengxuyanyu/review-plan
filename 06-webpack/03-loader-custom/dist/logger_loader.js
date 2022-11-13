const {
  validate
} = require('schema-utils');
const schema = require('./options.json');
module.exports = function loader(source) {
  const {
    version,
    webpack,
    getLogger
  } = this;
  const options = this.getOptions();
  validate(schema, options, "Loader");
  const logger = getLogger('我是刘---loader');
  if (source.indexOf('-') > -1) {
    logger.error('不能包含 - ');
  } else {
    logger.info('一切正常😀');
  }
  // 使用适当的 logging 接口
  // 支持：verbose/log/info/warn/error
  // logger.error('我是error❌');
  // logger.info('我是info😀');
  // logger.log('我是log😂');
  // logger.warn('我是warn🐴');
  return `${source}`;
};