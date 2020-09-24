const markdownParser = function(text) {
  // for XSS attacks
  text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // markdown rules bold and italic
  text = text.replace(/\*\*(.*)\*\*/g, '<b>$1</b>').replace(/\_(.*)\_/g, '<i>$1</i>');
  // markdown rules headers
  text = text.replace(/\#\#\#\#\#(.*)$/g, '<h5>$1</h5>');
  text = text.replace(/\#\#\#\#(.*)$/g, '<h4>$1</h4>').replace(/\#\#\#(.*)$/g, '<h3>$1</h3>');
  text = text.replace(/\#\#(.*)$/g, '<h2>$1</h2>').replace(/\#(.*)$/g, '<h1>$1</h1>');
  return text;
}

export default markdownParser;