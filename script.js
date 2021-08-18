const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];
const containerEl = document.querySelector('.container')
window.addEventListener('DOMContentLoaded', loadQuestions)    //Order matters here
const questionContainer = document.querySelector('.text-container')
const answerChoices = document.getElementsByTagName('input')




let currentQuestion = 0     //0 - 3 (4 Questions total)
let correctAnswers = 0

function loadQuestions(){
  if(currentQuestion == 4){     //if that was the last question, show results screen
    showResults()

  }else{                        //Otherwise, show next question
  containerEl.innerHTML = `
  <div class="text-container">
    <h1 id="question-text">${quizData[currentQuestion].question}</h1>
    <ul>
      <li>
        <input type="radio" name="ans" id="a" />
        <label for="a">${quizData[currentQuestion].a}</label>
      </li>
      
      <li>
        <input type="radio" name="ans" id="b" />
        <label for="b">${quizData[currentQuestion].b}</label>
      </li>
      
      <li>
        <input type="radio" name="ans" id="c" />
        <label for="c">${quizData[currentQuestion].c}</label>
      </li>

      <li>
        <input type="radio" name="ans" id="d" />
        <label for="d">${quizData[currentQuestion].d}</label>
      </li>
    </ul>
  </div>
  <button id="submitBtn">Submit</button>

  `

  // Query the submit button
  const submitBtn = document.getElementById('submitBtn')
  submitBtn.addEventListener('click', submitAnswer )
  }
}

/* Submit Answer Function Logic 
>Iterate over the 4 multiple choice answers
>Pull the selected radio button, compare ID with quizData Array ['correct']
>Icrement correctAnswers if the correct answer is selected

>If no answer is selected, decrement CurrentQuestion
      >Because it will be incremented at the end of the function
      >So it will remain the same, and display the same question
*/
function submitAnswer(){
  let unchecked = 0
  for(let answer of answerChoices){                           //Iterate Over Multiple Choice Answers
    if(answer.checked){                                       //Find the selected answer
      if(answer.id == quizData[currentQuestion].correct){     //If correct answer
        correctAnswers++
      }
    }else{
      unchecked++
      if(unchecked === 4){    //IF NO RADIO BUTTON SELECTED
        currentQuestion--     //**Decrement == Same question**
      }
    }
  }
  currentQuestion++           //**Increment == Same question**
  loadQuestions()
}


function showResults(){                   //After the 4th question, show results
  containerEl.innerHTML = `
  <h1 id="results-text">You answered ${correctAnswers}/4 correctly</h1>
  <button id="reloadBtn">Reload</button>
  `
  const reloadBtn = document.getElementById('reloadBtn').addEventListener('click', reloadQuiz)
}

function reloadQuiz(){      //Reset counters, display first question
  currentQuestion = 0
  correctAnswers = 0
  loadQuestions()

}