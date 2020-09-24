const markdownParser = function(text) {
  // replace ** text ** -> <b> text </b>
  console.log('in MdP');
  // how to render html inside jsx


  var matchForBold = /\*\*.*\*\*/g;
  var matchForItalic = /\_.*\_/g;
  var matchForPound = /\#.*\n/g;
  var matchForPound2 = /\#\#.*\n/g;
  var matchForPound3 = /\#\#\#.*\n/g;
  var matchForPound4 = /\#\#\#\#.*\n/g;
  var matchForPound5 = /\#\#\#\#\#.*\n/g;
  text = text.replace(matchForBold, '<b>$1</b>');
  text = text.replace(matchForItalic, '<i>$1</i>');
  text = text.replace(matchForPound, '<h1>$1</h1>');
  text = text.replace(matchForPound2, '<h2>$1</h2>');
  text = text.replace(matchForPound3, '<h3>$1</h3>');
  text = text.replace(matchForPound4, '<h4>$1</h4>');
  text = text.replace(matchForPound5, '<h5>$1</h5>');
  // for XSS
  // text = text.replace('<', '&lt;');
  // text = text.replace('>', '&gt;');
  // text = text.replace('&', '&amp;');
  return text;
}

export default markdownParser;

// 5mins break