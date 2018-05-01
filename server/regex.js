var regex ={
    isReplyMessage: function(string){
        let template =  /Re:(.)*/;
        return template.test(string);        
    }
}
module.exports = regex;

// console.log( regex.isReplyMessage('Re:adfasdfksdf fda sdlkfjsdf fas dlfjasdf1231 312312'));
