var regex ={
    isReplyMessage: function(string){
        let template =  /Re:(.)*/;
        return template.test(string);        
    },

    isValidDate: function(s) {
        // format D(D)/M(M)/(YY)YY
        var dateFormat = /^\d{4}[\.|\-|-]\d{2}[\.|\-|-]\d{2}$/;    
        if (dateFormat.test(s)) {
            let arr = s.split("-");
            let year = parseInt(arr[0]);
            if(year<=2010) return false;
            let month = parseInt(arr[1]);
            if( 0 == month || month >12) return false;
            let day = parseInt(arr[2]);
            if( day > 0 ){
                if( month == 2 && day > 28) return false;
                if( (month == 12 || month == 10 || month== 8 || month==7 || month==5 || month == 3 || month == 1) && day>31) return false;
                if( (month==11 || month==9 || month == 6 || month == 4) && day>30) return false;
                return true;
            }else return false;
        } else {
            return false;
        }
    }
}
module.exports = regex;

// console.log( regex.isValidDate("2018-12-01"));
// console.log("12/12/2341".split('/'));

// console.log( regex.isReplyMessage('Re:adfasdfksdf fda sdlkfjsdf fas dlfjasdf1231 312312'));
// var x = "2013-12-01";
// console.log(x.replace(/\-/g,""));