const start = document.getElementById("start")
const quiz = document.getElementById("quiz")
const question = document.getElementById("question")
const choiceA = document.getElementById("a")
const choiceB = document.getElementById("b")
const choiceC = document.getElementById("c")
const choiceD = document.getElementById("d")
const choiceE = document.getElementById("e")
const results = document.getElementById("score")
const countdown  = document.getElementById("countdown")


// Write your question bank into this dictionary, each question should follow the format below 
let questions = [
    {question: "What differential expression analysis method is used to compute the Level 5 gene set signatures computed for drug perturbations from the L1000 data in SigCom LINCS?" ,
    answers: [
        "limma",
        "limma-voom",
        "DESeq2",
        "Characteristic Direction",
        "EdgeR"],
    correct_answer: "Characteristic Direction" }, 
    {question: "SigCom LINCS provides L1000 signatures in RNA-seq-like format. What type of model was used in the first step to produce these RNA-seq-like profiles?",
    answers: [
        "Linear Regression", 
        "Random Forest", 
        "CycleGAN", 
        "Support Vector Machine", 
        "Naive Bayes Classifier" ],
    correct_answer: "CycleGAN" }, 
    {question: "How many signatures are currently served on SigCom LINCS for search and download?" ,
    answers: [
        "1113059",
        "4443059",
        "113059",
        "443059",
        "8883059"],
    correct_answer: "1113059" }, 
    {question: "How many data and signature generation centers were funded in the second phase of the LINCS program?" ,
    answers: [
        "2",
        "4",
        "5",
        "6",
        "7"],
    correct_answer: "6" },  
    {question: "What subset of LINCS L1000 signatures was used for benchmarking? " ,
    answers: [
        "CRISPR knockout signatures from 10 cancer cell lines",
        "CRISPR knockout signatures for 44 aging-related genes",
        "CRISPR knockout signatures for 44 transcription factors",
        "Drug perturbation signatures from 10 cancer cell lines",
        "Drug perturbation signatures for 44 HDAC inhibitors"],
    correct_answer: "CRISPR knockout signatures for 44 transcription factors" }, 
    {question: "The SigCom LINCS APIs are documented with?" ,
    answers: [
        "PublicAPI",
        "SmartAPI",
        "OpenAPI",
        "GitHubAPI",
        "DoItAPI"],
    correct_answer: "OpenAPI" }, 
    {question: "The signatures created from the GTEx portal and served on SigCom LINCS compare:" ,
    answers: [
        "Tissues to cell lines",
        "Different age groups across tissues",
        "Drug perturbations",
        "Mutations across tissue",
        "Males vs. females"],
    correct_answer: "Different age groups across tissues" }, 
    {question: "The GMT files available for download from SigCom LINCS contain:" ,
    answers: [
        "Gene sets",
        "Gene expression levels for all genes",
        "Single cells gene expression for one sample",
        "Gene mutations in tissues (GMT)",
        "Drug synonyms"],
    correct_answer: "Gene sets" }, 
    {question: "The similarity between drugs in the drug-drug similarity matrix available for download from SigCom LINCS was computed based on:" ,
    answers: [
        "Drug structure similarity",
        "Target profile similarity",
        "Cell viability similarity",
        "Gene expression profile similarity",
        "Known mechanisms of action similarity"],
    correct_answer: "Gene expression profile similarity" },
    {question: "In this string, LJP009_MCF10A_24H_D07_KIN001-242_10uM, the different parts are:" ,
    answers: [
        "Study: KIN001-242; Cell: MCF10A; Time point: 24H; Plate: LJP009; Drug: D07; Concentration: 10uM",
        "Study: MCF10A; Cell: LJP009; Time point: 24H; Plate: KIN001-242; Drug: D07; Concentration: 10uM",
        "Study: LJP009; Cell: MCF10A; Time point: 24H; Plate: D07; Drug: KIN001-242; Concentration: 10uM",
        "Study: LJP009; Cell: KIN001-242; Time point: 24H; Plate: MCF10A; Drug: D07; Concentration: 10uM",
        "Study: MCF10A; Cell: LJP009; Time point: 24H; Plate: DO7; Drug: KIN001-242; Concentration: 10uM"],
    correct_answer: "Study: LJP009; Cell: MCF10A; Time point: 24H; Plate: D07; Drug: KIN001-242; Concentration: 10uM" },
   ]


function assignLet(){
    for(var i = 0; i < questions.length; i++){
        if (questions[i].correct_answer == questions[i].answers[0]){
            questions[i].correct_answer = "a";
        }
        else if(questions[i].correct_answer == questions[i].answers[1]){
            questions[i].correct_answer = "b";
        }
        else if(questions[i].correct_answer == questions[i].answers[2]){
            questions[i].correct_answer = "c";
        }
        else if(questions[i].correct_answer == questions[i].answers[3]){
            questions[i].correct_answer = "d";
        }
        else {
            questions[i].correct_answer = "e";
        }
    }
}



const totalQuestions = questions.length - 1;
let currentQuestion = 0;

 function showQ(){
    let q = questions[currentQuestion];
     question.innerHTML = "<p>"+ q.question +"</p>"
     choiceA.innerHTML = q.answers[0]
     choiceB.innerHTML = q.answers[1]
     choiceC.innerHTML = q.answers[2]
     choiceD.innerHTML = q.answers[3]
     choiceE.innerHTML = q.answers[4]
 }


 let timeleft = 20;
 const done = 0;
 let count;
 const gWidth = 150;
 const gUnit = gWidth/timeleft


 function showTime(){    
     if(timeleft >= done) {
         countdown.innerHTML = timeleft;
         timeleft--;
     }
     else {
         timeleft = 20;
         if(currentQuestion < totalQuestions){
             currentQuestion++;
             showQ();
         }
         else {
             clearInterval(count);
             countdown.style.display = 'none'
             showScore();
         }
     }
 }

 
 function showScore(){
 results.style.display = "block"   
 scoreFrac = score + '/' + questions.length
 results.innerHTML = "<p>"+ "Your score = " + scoreFrac +"</p>"
 }

 let score = 0;

 function check(response){
     if (response == questions[currentQuestion].correct_answer){
        score++;
         timeleft = 20;
         if(currentQuestion < totalQuestions){
             currentQuestion++;
             showQ();
         }
         else {
             clearInterval(count);
             countdown.style.display = 'none'
             showScore();
        }
     }
     else{ 
         timeleft = 20;
         if(currentQuestion < totalQuestions){
             currentQuestion++;
             showQ();
         }
         else {
             clearInterval(count)
             countdown.style.display = 'none'
            showScore();
         }
     }
 }


start.addEventListener("click", startQuiz)

function startQuiz(){
assignLet();
start.style.display = "none";
showQ();
quiz.style.display = "block";
showTime();
count = setInterval(showTime, 1000)
}









