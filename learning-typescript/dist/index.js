"use strict";
let myNames = ["Felix", 'true', '78', "Okoth"];
let object1 = { name: "Felix", age: true };
console.log(object1.name);
// Union Type
let age;
age = "age is a String";
age = 35;
age = true;
console.log(age);
let statement = "jumbo";
console.log(statement);
//Creation Of Classes
class Person {
    static name;
    idNumber;
    address;
    isMarried;
    constructor(name, idNumber, address, isMarried) {
        Person.name = name;
        this.idNumber = idNumber;
        this.address = address;
        this.isMarried = isMarried;
    }
    /**
     * working
     */
    working() {
        return `Mr. ${Person.name} is a hardworking person`;
    }
    reading() {
        return `reading state: ${this.isMarried}`;
    }
    getAddress() {
        return `He lives at the Ocean Avenue : ${this.address} and Id Number : ${this.idNumber}`;
    }
}
class Student extends Person {
    studentId;
    course;
    isPresent;
    constructor(name, idNumber, address, isMarried, studentId, course, isPresent) {
        super(name, idNumber, address, isMarried);
        this.studentId = studentId;
        this.course = course;
        this.isPresent = isPresent;
    }
    /**
     * returnValue
     */
    returnValue() {
        let state = this.isPresent ? "is present" : "is absent";
        return state;
    }
    detailedInfo() {
        return `${Person.name} holder of Id : ${this.studentId} is studing ${this.course} and ${this.returnValue()}`;
    }
}
let student1 = new Student("Felix", 45826486, "450-752A", false, 8161, "Computer Science", true);
console.log(student1.detailedInfo());
let lorry = {
    model: "Mitsubishi",
    yom: 2011,
    isRefurbished: false,
    carMake: "M12",
    modelNumber: 11125151856,
    getTopSpeed: function () {
        return `This ${lorry.model} is of ${lorry.carMake} : ${lorry.modelNumber}`;
    }
};
console.log(lorry.getTopSpeed());
//Generics
function identifier(inputKey) {
    let value;
    if ((typeof inputKey) === "string") {
        value = inputKey + " is a string";
    }
    else {
        value = inputKey + " " + (typeof inputKey);
    }
    return value;
}
identifier("Egg Plant");
identifier({ name: "felix 0k0th" });
identifier(890);
function numberValue(arg) {
    console.log(arg.num);
    return arg;
}
let MyObject = {
    num: 89
};
let myNumber = numberValue(MyObject);
console.log(myNumber.num);
