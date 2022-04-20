 
 export function ReplaceUrlInText (textToCheck, lineBreak) {
   // alert ("textToCheck: " + textToCheck)
  
  function  filenamePart (p1) {
    return p1.substring(p1.lastIndexOf("/")+1, p1.length-p1.lastIndexOf("/"))
  }
  
   var expression = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
    var regex = new RegExp(expression);
    var match = ''; var splitText = []; var startIndex = 0;
    var returnHTML ="<span>";
    var linkText; 
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
       
      if (element['type']=='link') {
        linkText = "KLIK HIER"
        if (element['text'].includes("youtube.")) {
          linkText += " voor Youtube linkje"
          returnHTML += '<ReactPlayer width="100%" controls= "true"  playing={true}  url="https://youtu.be/t3XmOETQ3ss" /> '
        } 
        if (lineBreak && returnHTML.length>10) // >x om geen <br/> aan begin van text te plaatsen. er staat vaak nog een element, zoals span
         returnHTML +=  "<br/><a href= '//" + element['text'] + "' target='_blank'> " +  linkText + " </a>" 
        else 
        returnHTML +=  " <a href= '//" + element['text'] + "' target='_blank'> " +  linkText + " </a>" 

      } else
        returnHTML += element['text'];
    });
   
    // alert ("splitText: " + splitText.length + "startIndex: " + startIndex + " textToCheck: " + textToCheck + " textToCheck.length: " + textToCheck.length)
    
    // alert(returnHTML);

    return returnHTML
  }
  export default ReplaceUrlInText;