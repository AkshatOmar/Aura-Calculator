  
        // Add more questions here...
       const questions = [
    {
        question: "Your reaction to 'no cap fr fr':",
        answers: [
            { text: "ON GOD REAL TALK 💯", points: 1000 },
            { text: "Straight facts", points: 500 },
            { text: "Stop the cap", points: -500 },
            { text: "English please?", points: -1000 }
        ]
    },
    {
        question: "When someone says 'it's giving...':",
        answers: [
            { text: "MATERIAL GWORL ENERGY", points: 1000 },
            { text: "Main character vibes", points: 500 },
            { text: "What's it giving?", points: -500 },
            { text: "Giving what exactly?", points: -1000 }
        ]
    },
    {
        question: "Your response to 'touch grass':",
        answers: [
            { text: "GRASS TOUCHED + RATIO", points: 1000 },
            { text: "Grass: Touched ✅", points: 500 },
            { text: "Go outside yourself", points: -500 },
            { text: "I have a lawn", points: -1000 }
        ]
    },
    {
        question: "Best way to reply to a text with just 'k':",
        answers: [
            { text: "Send '👍'", points: 1000 },
            { text: "Leave them on read", points: 500 },
            { text: "Reply 'ok boomer'", points: -500 },
            { text: "Start a fight", points: -1000 }
        ]
    },
    {
        question: "Your reaction to 'slay queen':",
        answers: [
            { text: "YASSSSS 🔥", points: 1000 },
            { text: "You’re slaying it!", points: 500 },
            { text: "That’s cringe", points: -500 },
            { text: "Ignore and move on", points: -1000 }
        ]
    }
];

            

        let currentQuestion = 0;
        let auraPoints = 0;
        let currentQuestions = [];
        let soundEnabled = true;

        function playSound(id) {
            if (soundEnabled) {
                const sound = document.getElementById(id);
                sound.currentTime = 0;
                sound.play().catch(e => console.log('Sound play failed:', e));
            }
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function startQuiz() {
            playSound('clickSound');
            document.getElementById('landingPage').classList.add('hidden');
            document.getElementById('quizPage').classList.remove('hidden');
            currentQuestions = shuffleArray([...questions]).slice(0, 10);
            currentQuestion = 0;
            auraPoints = 0;
            showQuestion();
        }

        function showQuestion() {
            const question = currentQuestions[currentQuestion];
            document.getElementById('questionText').textContent = question.question;
            
            const answersHtml = shuffleArray([...question.answers])
                .map(answer => `
                    <button 
                        onclick="handleAnswer(${answer.points})"
                        class="w-full text-left p-6 bg-purple-100 hover:bg-purple-200 rounded-xl transition-all transform hover:scale-102 hover:shadow-md text-lg font-medium text-gray-700"
                    >
                        ${answer.text}
                    </button>
                `).join('');
            
            document.getElementById('answerButtons').innerHTML = answersHtml;
            document.getElementById('questionProgress').textContent = 
                `Question ${currentQuestion + 1} of ${currentQuestions.length}`;
        }

        function handleAnswer(points) {
            // Disable all buttons
            const buttons = document.querySelectorAll('#answerButtons button');
            buttons.forEach(button => button.disabled = true);

            // Play sound based on points
            if (points > 0) {
                playSound('correctSound');
            } else {
                playSound('wrongSound');
            }

            // Show points change with animation
            const pointsChange = document.getElementById('pointsChange');
            pointsChange.textContent = points >= 0 ? `+${points}` : points;
            pointsChange.classList.remove('hidden');
            pointsChange.classList.add(points >= 0 ? 'text-green-500' : 'text-red-500');

            setTimeout(() => {
                auraPoints += points;
                document.getElementById('pointsDisplay').textContent = `Aura Points: ${auraPoints}`;
                document.getElementById('progressBar').style.width = `${(auraPoints / 10000) * 100}%`;
                pointsChange.classList.add('hidden');
                
                if (currentQuestion === currentQuestions.length - 1) {
                    showResults();
                } else {
                    currentQuestion++;
                    showQuestion();
                }
            }, 1000);
        }

        function getRank(points) {
            if (points >= 7000) return {
                title: "⚡ Ultimate Rizz Lord  ⚡",
                description: "YOU'RE ABSOLUTELY GOATED WITH THE SAUCE! Your rizz levels are astronomical! 🔥"
            };
            if (points >= 3000) return {
                title: "✨ Certified Loverboy Certified Sigma ✨",
                description: "You're valid fr fr! The vibe check cleared! W RIZZ! 💫"
            };
            if (points >= 0) return {
                title: "🌟 Mid Energy Hai Aapki 🌟",
                description: "Not gonna cap, you're giving mid energy rn... But there's potential! 👀"
            };
            return {
                title: "💀 NPC Energy 💀",
                description: "Bro is stuck in NPC mode fr fr... Touch some grass maybe? 🌱"
            };
        }

        function showResults() {
            playSound('completionSound');
            document.getElementById('questionSection').classList.add('hidden');
            document.getElementById('resultsSection').classList.remove('hidden');
            
            const rank = getRank(auraPoints);
            document.getElementById('rankTitle').textContent = rank.title;
            document.getElementById('finalPoints').textContent = `Final Aura Points: ${auraPoints}`;
            document.getElementById('rankDescription').textContent = rank.description;
        }

        function resetQuiz() {
            playSound('clickSound');
            // Reset all state variables
            currentQuestion = 0;
            auraPoints = 0;
            currentQuestions = [];
            
            // Reset UI elements
            document.getElementById('pointsDisplay').textContent = 'Aura Points: 0';
            document.getElementById('progressBar').style.width = '0%';
            document.getElementById('pointsChange').classList.add('hidden');
            
            // Hide results and show question section
            document.getElementById('resultsSection').classList.add('hidden');
            document.getElementById('questionSection').classList.remove('hidden');
            
            // Start a new quiz
            startQuiz();
        }

        // Add sound toggle functionality
        function toggleSound() {
            soundEnabled = !soundEnabled;
            const soundButton = document.getElementById('soundButton');
            if (soundButton) {
                soundButton.innerHTML = soundEnabled ? '🔊' : '🔇';
            }
        }

        // Add keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (document.getElementById('quizPage').classList.contains('hidden')) {
                if (event.code === 'Space' || event.code === 'Enter') {
                    startQuiz();
                }
            } else {
                const buttons = document.querySelectorAll('#answerButtons button');
                if (event.code === 'Digit1' && buttons[0]) buttons[0].click();
                if (event.code === 'Digit2' && buttons[1]) buttons[1].click();
                if (event.code === 'Digit3' && buttons[2]) buttons[2].click();
                if (event.code === 'Digit4' && buttons[3]) buttons[3].click();
            }
        });

        // Initialize the quiz when the page loads
        window.addEventListener('load', () => {
            document.getElementById('landingPage').classList.remove('hidden');
            document.getElementById('quizPage').classList.add('hidden');
        });
    