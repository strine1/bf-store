// التأكد من تحميل الصفحة بالكامل
document.addEventListener("DOMContentLoaded", function() {
    const startScreen = document.getElementById("startScreen");
    const gameOverScreen = document.getElementById("gameOverScreen");
    const restartButton = document.getElementById("restartButton");
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let gameStarted = false;
    let bird;
    let pipes = [];
    let score = 0;
    let highScore = 0;
    let gameInterval;
    let pipeInterval;

    // تعيين حجم الـ canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // تعيين الطائر
    function Bird() {
        this.x = 50;
        this.y = canvas.height / 2;
        this.width = 30;
        this.height = 30;
        this.gravity = 0.3;
        this.lift = -5;
        this.velocity = 0;

        // رسم الطائر
        this.draw = function() {
            ctx.fillStyle = "#ffeb3b";  // لون الطائر أصفر
            ctx.fillRect(this.x, this.y, this.width, this.height);
        };

        // تحديث موقع الطائر
        this.update = function() {
            this.velocity += this.gravity;
            this.y += this.velocity;

            if (this.y + this.height > canvas.height) {
                this.y = canvas.height - this.height;
                this.velocity = 0;
            }

            if (this.y < 0) {
                this.y = 0;
                this.velocity = 0;
            }
        };

        // قفز الطائر عند الضغط على المسافة
        this.flap = function() {
            this.velocity = this.lift;
        };
    }

    // تعيين الأنابيب
    function Pipe() {
        this.width = 50;
        this.gap = 200;
        this.x = canvas.width;
        this.top = Math.random() * (canvas.height - this.gap);
        this.bottom = this.top + this.gap;
// رسم الأنابيب بلون مشابه للأنابيب في Flappy Bird
this.draw = function() {
    // إعداد تدرج لوني يشبه الأنابيب في Flappy Bird (أخضر داكن إلى أخضر فاتح)
    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#006400");  // الأخضر الداكن
    gradient.addColorStop(0.5, "#2e8b57");  // أخضر متوسط
    gradient.addColorStop(1, "#228b22");  // أخضر فاتح

    // تطبيق التدرج على الأنابيب
    ctx.fillStyle = gradient;

    // رسم الجزء العلوي من الأنبوب
    ctx.fillRect(this.x, 0, this.width, this.top);  // الجزء العلوي من الأنبوب

    // رسم الجزء السفلي من الأنبوب
    ctx.fillRect(this.x, this.bottom, this.width, canvas.height - this.bottom);  // الجزء السفلي من الأنبوب
};


        // تحديث حركة الأنابيب
        this.update = function() {
            this.x -= 2;
            if (this.x + this.width < 0) {
                pipes.shift();
                score++;
            }
        };

        // التحقق من التصادم مع الطائر
        this.collides = function(bird) {
            if (bird.x + bird.width > this.x && bird.x < this.x + this.width) {
                if (bird.y < this.top || bird.y + bird.height > this.bottom) {
                    return true;
                }
            }
            return false;
        };
    }

    // بدء اللعبة
    function startGame() {
        bird = new Bird();
        pipes = [];
        score = 0;
        gameOverScreen.style.display = "none";
        gameStarted = true;
        startScreen.style.display = "none";
        pipeInterval = setInterval(createPipes, 3000);
        gameInterval = setInterval(updateGame, 1000 / 60);
    }

    // تحديث اللعبة
    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bird.update();
        bird.draw();

        if (pipes.length > 0 && pipes[0].collides(bird)) {
            gameOver();
        }

        pipes.forEach(function(pipe) {
            pipe.update();
            pipe.draw();
        });

        // تحديث النتيجة
        document.querySelector(".score").textContent = "Score: " + score;
        if (score > highScore) {
            highScore = score;
            document.querySelector(".highScore").textContent = "High Score : " + highScore;
        }
    }

    // إنشاء الأنابيب
    function createPipes() {
        pipes.push(new Pipe());
    }

    // إيقاف اللعبة عند التصادم
    function gameOver() {
        clearInterval(gameInterval);
        clearInterval(pipeInterval);
        gameOverScreen.style.display = "block";
        gameStarted = false;
    }

    // إعادة تشغيل اللعبة
    restartButton.addEventListener("click", function() {
        gameOverScreen.style.display = "none";
        startGame();
    });

    // الضغط على المسافة لبدء اللعبة أو قفز الطائر
    document.addEventListener("keydown", function(e) {
        if (e.code === "Space") {
            if (!gameStarted) {
                startGame();
            } else {
                bird.flap();
            }
        }
    });
});
