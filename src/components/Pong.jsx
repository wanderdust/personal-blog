import { useEffect, useRef } from 'react';

export default function Pong({ isGameOver, onAiScore }) {
    const canvasRef = useRef(null);



    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        const paddleWidth = 10;
        const paddleHeight = 40;
        const ballRadius = 6;
        const paddleSpeed = 2;
        let playerScore = 0;
        let computerScore = 0;
        const winningScore = 3;
        let upArrowPressed = false;
        let downArrowPressed = false;
        let gameOver = false;


        const playerPaddle = { x: 20, y: canvas.height / 2 - paddleHeight / 2 };
        const computerPaddle = { x: canvas.width - 30, y: canvas.height / 2 - paddleHeight / 2 };
        const ball = { x: canvas.width / 2, y: canvas.height / 2, speed: 3, dx: 3, dy: 1 };

        const touchStartHandler = (e) => {
            const touchY = e.touches[0].clientY;
            if (touchY < canvas.height / 2) {
                upArrowPressed = true;
            } else {
                downArrowPressed = true;
            }
        };

        const touchEndHandler = () => {
            upArrowPressed = false;
            downArrowPressed = false;
        };


        const keyDownHandler = (e) => {
            if (e.key === 'w' || e.key === 'W') {
                upArrowPressed = true;
            } else if (e.key === 's' || e.key === 'S') {
                downArrowPressed = true;
            }
        };

        const keyUpHandler = (e) => {
            if (e.key === 'w' || e.key === 'W') {
                upArrowPressed = false;
            } else if (e.key === 's' || e.key === 'S') {
                downArrowPressed = false;
            }
        };

        const drawInstructions = (color = "white") => {
            const instructions = 'Use W/S keys to move';
            context.fillStyle = color;
            context.font = '16px Arial';
            context.fillText(instructions, canvas.width / 2 - context.measureText(instructions).width / 2, canvas.height - 30);
        };

        // Modify isGameOver callback
        if (playerScore === winningScore || computerScore === winningScore) {
            playerScore = 0;
            computerScore = 0;
            isGameOver();
        }

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
        canvas.addEventListener('touchstart', touchStartHandler);
        canvas.addEventListener('touchend', touchEndHandler);

        const drawRect = (x, y, width, height, color) => {
            context.fillStyle = color;
            context.fillRect(x, y, width, height);
        };

        const drawBall = (x, y, radius, color) => {
            context.fillStyle = color;
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI * 2, false);
            context.closePath();
            context.fill();
        };

        const drawText = (text, x, y, color) => {
            context.fillStyle = color;
            context.font = '24px Arial';
            context.fillText(text, x, y);
        };

        const moveBall = () => {
            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
                ball.dy *= -1;
            }

            if (ball.x + ballRadius > canvas.width) {
                playerScore++;
                resetBall();
            }

            if (ball.x - ballRadius < 0) {
                computerScore++;
                resetBall();
                onAiScore && onAiScore();
            }

            if (playerScore === winningScore || computerScore === winningScore) {
                gameOver = true;
                isGameOver();
            }
        };

        const resetBall = () => {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.dx *= -1;
        };

        const movePlayerPaddle = () => {
            if (upArrowPressed && playerPaddle.y > 0) {
                playerPaddle.y -= paddleSpeed;
            }
            if (downArrowPressed && playerPaddle.y < canvas.height - paddleHeight) {
                playerPaddle.y += paddleSpeed;
            }
        };

        const moveComputerPaddle = () => {
            const targetY = ball.y - paddleHeight / 2;
            const deltaY = targetY - computerPaddle.y;

            if (Math.abs(deltaY) <= paddleSpeed) {
                computerPaddle.y = targetY;
            } else if (deltaY > 0) {
                computerPaddle.y += paddleSpeed;
            } else {
                computerPaddle.y -= paddleSpeed;
            }

            // Keep the paddle within canvas bounds
            if (computerPaddle.y < 0) {
                computerPaddle.y = 0;
            } else if (computerPaddle.y > canvas.height - paddleHeight) {
                computerPaddle.y = canvas.height - paddleHeight;
            }
        };

        const detectCollision = (paddle) => {
            const collision =
                ball.x - ballRadius < paddle.x + paddleWidth &&
                ball.x + ballRadius > paddle.x &&
                ball.y - ballRadius < paddle.y + paddleHeight &&
                ball.y + ballRadius > paddle.y;

            if (collision) {
                const relativeIntersectY = paddle.y + paddleHeight / 2 - ball.y;
                const normalizedIntersectY = relativeIntersectY / (paddleHeight / 2);
                const bounceAngle = normalizedIntersectY * (Math.PI / 4);
                ball.dy = -ball.speed * Math.sin(bounceAngle);
            }

            return collision;
        };


        const update = () => {
            moveBall();
            movePlayerPaddle();
            moveComputerPaddle();

            if (detectCollision(playerPaddle) || detectCollision(computerPaddle)) {
                ball.dx *= -1;
            }

            draw();
        };

        const draw = () => {
            drawRect(0, 0, canvas.width, canvas.height, 'rgba(0, 0, 0, 0.5)');
            drawRect(playerPaddle.x, playerPaddle.y, paddleWidth, paddleHeight, 'white');
            drawRect(computerPaddle.x, computerPaddle.y, paddleWidth, paddleHeight, 'white');
            drawBall(ball.x, ball.y, ballRadius, 'white');
            drawText(playerScore, canvas.width / 4, 30, 'white');
            drawText(computerScore, canvas.width * 3 / 4, 30, 'white');
            drawInstructions();

            if (!gameOver) {
                requestAnimationFrame(update);
            }
        };
        let countdown = 3;

        const drawCountdown = () => {
            context.fillStyle = 'black';
            context.font = '48px Arial';
            context.fillText(countdown, canvas.width / 2 - 12, canvas.height / 2 + 18);
        };

        const drawCountdownScene = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawCountdown();
            drawInstructions('black');
        };


        const startGame = () => {
            update();

            document.addEventListener('keydown', keyDownHandler);
            document.addEventListener('keyup', keyUpHandler);
        };

        const startCountdown = () => {
            if (countdown > 0) {
                drawCountdownScene();
                setTimeout(() => {
                    countdown--;
                    startCountdown();
                }, 1000);
            } else {
                startGame();
            }
        };


        startCountdown();

        return () => {
            gameOver = true;
            document.removeEventListener('keydown', keyDownHandler);
            document.removeEventListener('keyup', keyUpHandler);
            canvas.removeEventListener('touchstart', touchStartHandler);
            canvas.removeEventListener('touchend', touchEndHandler);
            cancelAnimationFrame(update);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 1000 }}
        />
    );
}
