const ELEVEN = "Id code must have 11 characters.";
const SIX = "Id code must have 6 numbers at first.";
const SYM = "The century mark must be +, - or A.";
const NUM = "Identification numbers must be numbers.";
const COD_ERR = "Identification code is not right.<br>Calculated control character is ";
const RIGHT = "Identification code is right.";


function checklength() {
    let id_code = document.getElementById("idcode").value;
    let length = id_code.length;
    return length;
}


function checkSix() {
    let id_code = document.getElementById("idcode").value;
    let fsix = id_code.substring(0, 6);
    return fsix;
}


function checkCentury() {

    let id_code = document.getElementById("idcode").value;
    let cen_ = id_code.charAt(6);
    return cen_;
}


function checkNum() {
    let id_code = document.getElementById("idcode").value;
    let num_ = id_code.substring(7, 10);
    return num_;
}


/*
 * Checks that the given data is rigth. Returns an error message or
 * empty string which means that the date is rigth
 *
 * @param {type} value      the date as format ddmmyy
 * @param {type} century    is + - or A
 * @returns {undefined}     an error message or empty string
 */


function checkDate(value, century) {

    let message =''
    let today= new Date();
    let current_year = today.getFullYear();
    
    let day = value.substring(0, 2);
    if (day < 1 || day > 31) {
        message = message + "Day must be 0 ... 31.";
        
    }


    let mon = value.substring(2, 4);
    if (mon < 01 || mon > 12) {
        message = message + "Month must be 1 ... 12";
       
        
}
    
    let yer = value.substring(4, 6);
    if (century === "A") {
        let cen_tury = 2000 + parseInt(yer);
        if (cen_tury > current_year) {
            message = message + "Year is too big.";
           
        }
    }

    return message 

}





function calculateAge(value, century) {
    

    let today = new Date();
    let current_year = today.getFullYear();
    let yer = value.substring(4, 6);

    if (century === "-") {
        let cen_tury = 1900 + parseInt(yer);
        let birth_yr = current_year - cen_tury;
        return birth_yr;

    }
    if (century === "+") {
        let cen_tury = 1800 + parseInt(yer);
        let birth_yr = current_year - cen_tury;
        return birth_yr;
    }
    if (century === "A") {
        let cen_tury = 2000 + parseInt(yer);
        let birth_yr = current_year - cen_tury;
        return birth_yr;
    }

}

function findSex(value) {
    


    if (value % 2 === 0) {
        return document.getElementById("sex").innerHTML = "female";
        
    } else {
        return document.getElementById("sex").innerHTML = "male";
        
    }
}

function calculateCheckMark(value) {
    
    value=value.slice(0,value.length-1);
    
    let ch_mark = "0123456789ABCDEFHJKLMNPRSTUVWXY";

    value = value.replace("A", "");
    value = value.replace("+", "");
    value = value.replace("-", "");
    
    let remainder = parseInt(value) % 31;
    
    return ch_mark[remainder];
   
}




function check() {

    
    // check length of inputed identificaiton
    let len = checklength();
    if (len !== 11) {
        document.getElementById("error").innerHTML = ELEVEN;
        document.getElementById('age').innerHTML= '';
        document.getElementById('sex').innerHTML='';
        return ;
        
    }


    //check first 6 digit
    let char = checkSix();

    if (isNaN(char) || char <6) {
        document.getElementById("error").innerHTML = SIX;
        document.getElementById('age').innerHTML= '';
        document.getElementById('sex').innerHTML='';
        return ;
        
    }
    

    //check century
    let id_num = checkCentury();
    if (id_num !== 'A' && id_num !== '+' && id_num !== '-') {
        document.getElementById("error").innerHTML = SYM;
        document.getElementById('age').innerHTML= '';
        document.getElementById('sex').innerHTML='';
        return ;
        
    }

    


    
    // take the user inputed (idenfication code)
    let x = document.getElementById("idcode").value;
    let y=x.slice(-1);
    

   
    //call check date function
    var values_from_checkdate = checkDate(char, id_num)

    //check output is empty string or not
    if (values_from_checkdate !== '' ){
        document.getElementById("error").innerHTML = values_from_checkdate;
        document.getElementById('age').innerHTML= '';
        document.getElementById('sex').innerHTML='';
        return;


    }
    

    //check identification number
    let res_num = checkNum();
    if (isNaN(res_num)) {
        document.getElementById("error").innerHTML = NUM;
        document.getElementById('age').innerHTML= '';
        document.getElementById('sex').innerHTML='';
        return ;
    
    }
    
    
    // check the control characters
    var check_mark = calculateCheckMark(x)
    if (check_mark === y){
        document.getElementById('age').innerHTML= calculateAge(char, id_num);
        document.getElementById('sex').innerHTML=findSex(res_num);
        document.getElementById("result").innerHTML=RIGHT;

    }

    if(check_mark !== y){
        document.getElementById('age').innerHTML= calculateAge(char, id_num);
        document.getElementById('sex').innerHTML=findSex(res_num);
        document.getElementById("result").innerHTML=COD_ERR +' '+calculateCheckMark(x) ;
        
    }
    

    
    

    
}
