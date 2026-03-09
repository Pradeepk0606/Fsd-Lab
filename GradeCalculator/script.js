function calculate() {
let name = document.getElementById("name").value;
let m1 = Number(document.getElementById("m1").value);

let m2 = Number(document.getElementById("m2").value);
let m3 = Number(document.getElementById("m3").value);

if (name === "") {
alert("Please enter Name!");
return;
}

if (document.getElementById("m1").value === "") {
alert("Please enter Mark 1!");
return;
}
if (document.getElementById("m2").value === "") {
alert("Please enter Mark 2!");
return;
}
if (document.getElementById("m3").value === "") {
alert("Please enter Mark 3!");
return;
}

if (isNaN(m1) || isNaN(m2) || isNaN(m3) || m1 < 0 || m1 > 100 || m2 < 0 || m2 > 100 || m3 < 0 || m3 > 100) {
alert("Marks should be between 0 to 100!");
return;
}

let total = m1 + m2 + m3;
let avg = total / 3;
let grade = "";

if (avg >= 80) grade = "A ";
else if (avg >= 60) grade = "B ";
else if (avg >= 40) grade = "C ";
else grade = "Fail ";

document.getElementById("result").innerHTML =
"Hello " + name + "<br>" +
"Total: " + total + "<br>" +
"Average: " + avg.toFixed(2) + "<br>" +
"Grade: " + grade;}