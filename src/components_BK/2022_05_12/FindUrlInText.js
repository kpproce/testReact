 
 export function FindUrlInText (textToCheck, lineBreak) {
   // alert ("textToCheck: " + textToCheck)
  
   var expression = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
    var regex = new RegExp(expression);
    var match = ''; var splitText = []; var startIndex = 0;
    var returnUrlText ="";
    while ((match = regex.exec(textToCheck)) != null) {
            
       splitText.push({text: textToCheck.substr(startIndex, (match.index - startIndex)), type: 'text'});
                  
       var cleanedLink = textToCheck.substr(match.index, (match[0].length));
       cleanedLink = cleanedLink.replace(/^https?:\/\//,'');
       splitText.push({text: cleanedLink, type: 'link'});
                    
       startIndex = match.index + (match[0].length);  
      
       //alert (cleanedLink);         
    }
    
    if (startIndex < textToCheck.length) {
      splitText.push({text: textToCheck.substr(startIndex), type: 'text'});
    }
    // console.log(splitText)
    splitText.forEach(element => {
      if (element['type']==='link') {
        returnUrlText =  element['text']; 
      }
    });
    // console.log(returnUrlText)
    // alert ("splitText: " + splitText.length + "startIndex: " + startIndex + " textToCheck: " + textToCheck + " textToCheck.length: " + textToCheck.length)
    // alert(returnHTML);

    return returnUrlText
  }
  // export default FindUrlInText;