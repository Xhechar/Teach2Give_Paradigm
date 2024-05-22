
let myNames: string[] = ["Felix", 'true', '78', "Okoth"];

let object1: {name: string, age: boolean} = { name: "Felix", age: true };

console.log(object1.name);

// Union Type

let age: string | number | boolean;

age = "age is a String"
age = 35
age = true

console.log(age);

// Type Aliases

type StringOrNumber = string | number;

let statement: StringOrNumber = "jumbo"

console.log(statement);

//Creation Of Classes

class Person {

  public static name: string;
  private idNumber: number;
  protected address: string;
  readonly isMarried: boolean;

  constructor(name:string, idNumber:number, address:string, isMarried:boolean) {
    Person.name = name;
    this.idNumber = idNumber;
    this.address = address;
    this.isMarried = isMarried;
  }

  /**
   * working
   */
  public working():string {
    return `Mr. ${Person.name} is a hardworking person`; 
  }

  private reading(): string {
    return `reading state: ${this.isMarried}`
  }

  protected getAddress(): string {
    return `He lives at the Ocean Avenue : ${this.address} and Id Number : ${this.idNumber}`
  }
}

class Student extends Person {

  studentId: number;
  course: string;
  isPresent: boolean;

  constructor(name: string, idNumber: number, address: string, isMarried: boolean, studentId: number, course: string, isPresent: boolean) {
    super(name, idNumber, address, isMarried);
    this.studentId = studentId;
    this.course = course;
    this.isPresent = isPresent;
  }

  /**
   * returnValue
   */
  public returnValue():string {
    let state: string = this.isPresent ? "is present" : "is absent";

    return state;
  }

  public detailedInfo():string {
    return `${Person.name} holder of Id : ${this.studentId} is studing ${this.course} and ${this.returnValue()}`
  }
} 

let student1 = new Student("Felix", 45826486, "450-752A", false, 8161, "Computer Science", true);

console.log(student1.detailedInfo());

interface Vehicle {
  model: string;
  yom: number;
  isRefurbished: boolean;

  //An option variable
  modelNumber: number;

  getTopSpeed(): void;
}

interface Lorry extends Vehicle {
  carMake: string;
}

let lorry: Lorry = {
  model: "Mitsubishi",
  yom: 2011,
  isRefurbished: false,
  carMake: "M12",
  modelNumber: 11125151856,
  getTopSpeed: function (): string {
    return `This ${lorry.model} is of ${lorry.carMake} : ${lorry.modelNumber}`
  }
}

console.log(lorry.getTopSpeed());


//Generics

function identifier<Y>(inputKey: Y) {
  let value:string;
  if ((typeof inputKey) === "string") {
    value = inputKey + " is a string"
  }
  else {
    value = inputKey + " " + (typeof inputKey)
  }

  return value;
}

identifier("Egg Plant")
identifier({ name: "felix 0k0th" })
identifier(890);

// generic constraints

interface GenericType {
  num: number;
}

function numberValue<X extends GenericType>(arg: X):X {
  console.log(arg.num);
  return arg;
}

let MyObject: GenericType = {
  num: 89
}

let myNumber = numberValue(MyObject);

console.log(myNumber.num);
