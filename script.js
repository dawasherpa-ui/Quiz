const quiz = document.querySelector("#btn-question");
const ques = document.querySelector(".question");
const ansBtn = document.querySelector("#btn-ans");
const ans = document.querySelector(".ans");
const selectElement = document.querySelector('.form-select');
const urlBase = 'https://trivia-by-api-ninjas.p.rapidapi.com/v1/trivia';

let anss; // Declare anss variable outside the fetchData function

function fetchData() {
    const category = selectElement.value; // Retrieve category value inside the function
    const url = `${urlBase}?category=${category}`;
    ques.innerHTML = "";
    ans.innerHTML = "";
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '77084fb589msh8e9ff678daf2d38p184dadjsnf3544bcaf207',
            'X-RapidAPI-Host': 'trivia-by-api-ninjas.p.rapidapi.com'
        }
    })
        .then(data => data.json())
        .then((result) => {
            console.log(result[0]);
            ques.innerHTML = `${result[0].question}`;
            anss = result[0].answer; // Assign the value to anss variable
            console.log(result[0].question);
        })
        .then(btnFn)
        .catch(error => console.log(error));
}

quiz.addEventListener("click", fetchData);

function answer() {
    let count = 0;
    const time = setInterval(() => {
        count++;
        ans.innerHTML = `Ans: ${count}`;
        if (count === 5) {
            clearInterval(time);
            ans.innerHTML = `Ans: ${anss}!!`;
        }
    }, 1000);
}

ansBtn.addEventListener("click", answer);

function btnFn() {
    ansBtn.style.display = "inline";
}
window.addEventListener('load', function () {
    const selectElement = document.querySelector('.form-select');
    const defaultValue = ''; // Set the desired default value here

    // Loop through the options and set the selected attribute on the default value
    Array.from(selectElement.options).forEach(function (option) {
        if (option.value === defaultValue) {
            option.selected = true;
        }
    });
});
