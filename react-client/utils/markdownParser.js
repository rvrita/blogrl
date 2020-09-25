const markdownParser = function(text) {
  // for XSS attacks
  text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // markdown rules bold and italic
  text = text.replace(/\*\*(.*)\*\*/g, '<b>$1</b>').replace(/_(.*)_/g, '<i>$1</i>');
  // markdown rules headers
  text = text
    .replace(/^#####(.*)$/, '<h5>$1</h5>')
    .replace(/^####(.*)$/, '<h4>$1</h4>')
    .replace(/^###(.*)$/, '<h3>$1</h3>')
    .replace(/^##(.*)$/, '<h2>$1</h2>')
    .replace(/^#(.*)$/, '<h1>$1</h1>');
  return text;
}

export default markdownParser;