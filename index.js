const gameData = {
       english: [
                {
                    question: "I came ___ India.",
                    options: ["from", "in", "on", "at"],
                    correct: 0,
                },
                { 
                    question:" I __ cold." ,
                    options:["am" , "have" , "is" , "are"],
                    correct:1,
                
                },
                { 
                    question:"Nowadays everyone ______ mobile phone." ,
                    options:["had used" , "use" ,"uses", "used"],
                    correct:2,
                
                },
                { 
                    question:"______ there anybody in the room?" ,
                    options:["are" , "am" , "if" ,"is"],
                    correct:3,
                
                },
                { 
                    question:"Which book is ______?" ,
                    options:["your" ,"your's" , "yours" , "you is"],
                    correct:2,
                
                },
            ],
            mandarin: [
                {
                    question: "你好吗？ (Nǐ hǎo ma?) 我___。 (Wǒ ___)",
                    options: ["好 (Hǎo)", "是的 (Shì de)", "不好 (Bù hǎo)", "谢谢 (Xièxiè)"],
                    correct: 0,
                },
                {
                    question: "请问，__ 什么名字？ (Qǐngwèn, ___ shénme míngzì?)",
                    options: ["你 (Nǐ)", "我 (Wǒ)", "他 (Tā)", "她 (Tā)"],
                    correct: 0,
                },
                {
                    question: "这是__吗？ (Zhè shì ___ ma?)",
                    options: ["书 (shū)", "苹果 (píngguǒ)", "椅子 (yǐzi)", "手机 (shǒujī)"],
                    correct: 2,
                },
                {
                    question: "你喜欢__吗？ (Nǐ xǐhuān ___ ma?)",
                    options: ["狗 (gǒu)", "猫 (māo)", "鸟 (niǎo)", "鱼 (yú)"],
                    correct: 1,
                },
                {
                    question: "我要__。 (Wǒ yào ___)",
                    options: ["吃饭 (chīfàn)", "喝水 (hē shuǐ)", "睡觉 (shuìjiào)", "跳舞 (tiàowǔ)"],
                    correct: 0,
                },
                
            ],   
        };

    //javascript initialization
    const quiz = document.querySelector("#quiz");
    const answerElement = document.querySelectorAll(".answer");
    const languageSelect = document.getElementById("language");
    languageSelect.addEventListener("change", () => {
        currentQuiz = 0; // Reset the quiz when language changes
        marks = 0;
        selectedLanguage = languageSelect.value;
        loadQuiz();
    });

    const [questionElement , option_1,option_2,option_3,option_4] =
        document.querySelectorAll(".question,#option_1,#option_2,#option_3,#option_4");
    
    let scoreElement = document.querySelector(".score"); 

    const submitButton = document.getElementById("submit"); 

    let currentQuiz=0;
    let marks=0;     
    let selectedLanguage = languageSelect.value;
    //dynamic acceptance of questions and answers
    const loadQuiz = () => {

       const selectedLanguage = languageSelect.value;
       const { question, options } = gameData[selectedLanguage][currentQuiz];    
       questionElement.innerText = `${currentQuiz + 1 }: ${question}`;//replaced html text with the question stored in the array     
       scoreElement.innerText =  `Score :  ${marks}/${gameData[selectedLanguage].length}`;
       options.forEach(
              (curOption, index) => (window[`option_${index + 1}`].innerText = curOption)
        );
    };
    loadQuiz();
    
    const getSelectedOption = ()=>{
       /* let answer_index;
        answerElement.forEach((curOption,index)=>{
            if(curOption.checked){
                answer_index=index;
            }
        });
        return answer_index;
     this is method 1 that can be used as well*/

     let ans = Array.from(answerElement);
     return ans.findIndex((currentElem)=>currentElem.checked);
     /**This converts the answerElement NodeList (which represents all the radio
        buttons with the class "answer") into an array. 
       This is done to make it easier to work with array methods like findIndex */

    };

    //in the beginning no answer selection 
    const deselectedAnswer = ()=>{
         return answerElement.forEach((currentElem)=> currentElem.checked = false)
    }
    submitButton.addEventListener( "click" , () => {
        const SelectedOptionIndex = getSelectedOption();
        console.log(SelectedOptionIndex);

        if (SelectedOptionIndex == gameData[selectedLanguage][currentQuiz].correct)
        {
            marks=marks+1;
        }
        currentQuiz++;   
        if(currentQuiz < gameData[selectedLanguage].length) 
        {
            deselectedAnswer();
            loadQuiz();
        }else{
            quiz.innerHTML = `
            <div class = "result">
            <h2>Your marks are : ${marks}/${gameData[selectedLanguage].length}</h2>
            <button class="reload-button" onClick="location.reload()">Restart</button>
            </div>
            `
        }
    });
