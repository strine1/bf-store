let randomNumber;
let attempts = 0;
let maxAttempts = 8;  // الحد الأقصى للمحاولات
let timeLimit = 90;   // المدة الزمنية المحددة 90 ثانية
let timerInterval;
let soundCorrect = new Audio('sounds/c.mp3');
let soundWrong = new Audio('sounds/w2rong.mp3');

function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('resultMessage').textContent = '';
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('userInput').disabled = false;
    document.querySelector('button').disabled = false;
    
    // إعادة ضبط المؤقت
    timeLimit = 90;  // تغيير الوقت إلى 90 ثانية
    document.getElementById('timer').textContent = timeLimit;
    
    // بدء المؤقت
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeLimit > 0) {
        timeLimit--;
        document.getElementById('timer').textContent = timeLimit;
    } else {
        gameOver("انتهى الوقت! حاول مرة أخرى.");
    }
}

function checkGuess() {
    const userInput = parseInt(document.getElementById('userInput').value);  // تحويل الإدخال إلى عدد صحيح
    attempts++;

    if (userInput === randomNumber) {
        soundCorrect.play();
        document.getElementById('resultMessage').textContent = `مبروك! لقد خمنت الرقم الصحيح ${randomNumber}`;
        document.getElementById('resultMessage').style.color = 'green';
        document.getElementById('restartButton').style.display = 'block';
        document.getElementById('userInput').disabled = true;
        document.querySelector('button').disabled = true;
        clearInterval(timerInterval); // إيقاف المؤقت عند الفوز
    } else if (userInput > randomNumber) {
        soundWrong.play();
        document.getElementById('resultMessage').textContent = `الرقم الذي أدخلته أكبر من الرقم الصحيح!, حاول الرقم أصغر من ${userInput}.`;
        document.getElementById('resultMessage').style.color = 'red';
    } else if (userInput < randomNumber) {
        soundWrong.play();
        document.getElementById('resultMessage').textContent = `الرقم الذي أدخلته أصغر من الرقم الصحيح!, حاول الرقم أكبر من ${userInput}.`;
        document.getElementById('resultMessage').style.color = 'red';
    }

    document.getElementById('attempts').textContent = attempts;

    if (attempts >= maxAttempts) {
        gameOver("لقد تجاوزت الحد الأقصى للمحاولات! حاول مرة أخرى.");
    }
}

function gameOver(message) {
    clearInterval(timerInterval); // إيقاف المؤقت
    document.getElementById('resultMessage').textContent = message;
    document.getElementById('restartButton').style.display = 'block';
    document.getElementById('userInput').disabled = true;
    document.querySelector('button').disabled = true;
}

function restartGame() {
    startGame();
    document.getElementById('userInput').value = '';  // مسح المدخل
}

startGame();




