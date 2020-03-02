/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//Anil Dhakal

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


function check() {
    
    document.getElementById("error").innerHTML = "";
    document.getElementById("age").innerHTML = "";
    document.getElementById("sex").innerHTML = "";

    let len = checklength();
    if (len !== 11) {
        document.getElementById("error").innerHTML = ELEVEN;
        return;
    }

    let char = checkSix();
    if (isNaN(char)) {
        document.getElementById("error").innerHTML = SIX;
        return;
    }

    let id_num = checkCentury();
    if (id_num !== 'A' && id_num !== '+' && id_num !== '-') {
        document.getElementById("error").innerHTML = SYM;
        return;
    }

    let res_num = checkNum();
    if (isNaN(res_num)) {
        document.getElementById("error").innerHTML = NUM;
        return;
    }

    // let age = calculateAge(char, id_num);
    //document.getElementById("age").innerHTML = age;

    //let gen = findSex(res_num);
    //document.getElementById("sex").innerHTML = gen;



    findSex(res_num);
    calculateAge(char, id_num);
    checkDate(char, id_num);

    let id_code = document.getElementById("idcode").value;
    last_chr = id_code.slice(-1);

    if (calculateCheckMark(id_code) === last_chr) {
        document.getElementById('result').innerHTML = RIGHT;
        return;

    } else {

        document.getElementById('result').innerHTML = COD_ERR + "" +
                calculateCheckMark(id_code);
        return;
    }


}

/**
 * finds out the sex of a person 
 * 
 * @param {type} value      identification number in the personal
 * @returns {String}        identification code
 * 
 * @returns {string}        female or male
 */
function findSex(value) {

    document.getElementById("sex").innerHTML = "";
    if (value % 2 === 0) {
        document.getElementById("sex").innerHTML = "female";
        return;
    } else {
        document.getElementById("sex").innerHTML = "male";
        return;
    }
}

/**
 * calculate person's age based on a year.
 * 
 * @param {type} value      the date as format ddmmyy
 * @param {type} century    is + - or A
 * @returns {Number}        the calculated age
 */
function calculateAge(value, century) {

    let today = new Date();
    let current_year = today.getFullYear();
    let yer = value.substring(4, 6);

    if (century === "-") {
        let cen_tury = 1900 + parseInt(yer);
        let birth_yr = current_year - cen_tury;
        document.getElementById("age").innerHTML = birth_yr;
        return;
    }
    if (century === "+") {
        let cen_tury = 1800 + parseInt(yer);
        let birth_yr = current_year - cen_tury;
        document.getElementById("age").innerHTML = birth_yr;
        return;
    }
    if (century === "A") {
        let cen_tury = 2000 + parseInt(yer);
        let birth_yr = current_year - cen_tury;
        document.getElementById("age").innerHTML = birth_yr;
        return;
    }
}

/** 
 * Checks that the given data is rigth. Returns an error message or 
 * empty string which means that the date is rigth
 * 
 * @param {type} value      the date as format ddmmyy
 * @param {type} century    is + - or A
 * @returns {undefined}     an error message or empty string
 */
function checkDate(value, century) {

    let today = new Date();
    let current_year = today.getFullYear();
    let day = value.substring(0, 2);

    if (day < 1 || day > 31) {
        document.getElementById("sex").innerHTML = "";
        document.getElementById("age").innerHTML = "";
        document.getElementById("error").innerHTML = "Day must be 0 ... 31.";
        return;
    }
    let mon = value.substring(2, 4);
    if (mon < 01 || mon > 12) {
        document.getElementById("sex").innerHTML = "";
        document.getElementById("age").innerHTML = "";
        document.getElementById("error").innerHTML = "Month must be 1 ... 12";
        return;
    }
    let yer = value.substring(4, 6);
    if (century === "-") {
        let cen_tury = 1900 + parseInt(yer);
        //document.getElementById("result").innerHTML = RIGHT;
        return;
    }
    if (century === "+") {
        let cen_tury = 1800 + parseInt(yer);
        //document.getElementById("result").innerHTML = RIGHT;
        return;
    }
    if (century === "A") {
        let cen_tury = 2000 + parseInt(yer);
        if (cen_tury > current_year) {
            document.getElementById("sex").innerHTML = "";
            document.getElementById("age").innerHTML = "";
            document.getElementById("error").innerHTML = "Year is too big.";
            return;
        }
    }
}

/**
 * calculate the control character of the personal identification code.
 * @param {type} value      ddmmyyXnnn part of the identification code
 * @returns {undefined}     calculated character
 */
function calculateCheckMark(value) {

    value = value.slice(0, value.length - 1);
    let ch_mark = "0123456789ABCDEFHJKLMNPRSTUVWXY";
    value = value.replace("A", "");
    value = value.replace("+", "");
    value = value.replace("-", "");

    let reminder = parseInt(value) % 31;
    return ch_mark[reminder];
}