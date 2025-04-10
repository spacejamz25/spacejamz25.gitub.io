class SouthwesternAdventureGame {
    constructor() {
        this.name = "";
        this.energy = 100;
        this.sales = 0;
        this.skills = {
            persistence: 1,
            communication: 1,
            organization: 1,
            resilience: 1,
            product_knowledge: 1,
            creativity: 1,
            adaptability: 1
        };
        this.day = 1;
        this.week = 1;
        this.max_week = 12;
        this.game_over = false;
        this.gaming_studio_bonus = true; // Special bonus from gaming background
        this.personal_growth = 0;
        this.referrals = [];
        this.cyber_techniques_used = 0;
        this.unique_encounters_seen = new Set();
        this.relationships = {}; // Track relationships with key NPCs
        this.message_queue = [];
        this.is_processing_queue = false;
        
        // Initialize the game screen
        this.gameScreen = document.getElementById('game-screen');
        this.showIntroduction();
    }

    // Helper to create HTML elements
    createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    // Display message with typewriter effect
    displayMessage(message, callback = null) {
        this.message_queue.push({ message, callback });
        if (!this.is_processing_queue) {
            this.processMessageQueue();
        }
    }

    processMessageQueue() {
        if (this.message_queue.length === 0) {
            this.is_processing_queue = false;
            return;
        }

        this.is_processing_queue = true;
        const item = this.message_queue.shift();
        const messageBox = document.querySelector('.message-box') || this.createElement('div', 'message-box');
        const messagePara = this.createElement('p', 'fade-in');
        messageBox.appendChild(messagePara);

        // Simulate typewriter by showing text
        messagePara.textContent = item.message;
        
        // After "typing" effect, process next message or run callback
        setTimeout(() => {
            if (item.callback) {
                item.callback();
            }
            this.processMessageQueue();
        }, 500); // Adjust timing as needed
    }

    clearGameScreen() {
        this.gameScreen.innerHTML = '';
    }

    showIntroduction() {
        this.clearGameScreen();
        
        const title = this.createElement('h1', null, 'SOUTHWESTERN ADVANTAGE: THE GAME');
        const subtitle = this.createElement('h2', null, '=================================');
        
        const messageBox = this.createElement('div', 'message-box');
        this.gameScreen.appendChild(title);
        this.gameScreen.appendChild(subtitle);
        this.gameScreen.appendChild(messageBox);

        this.displayMessage("Welcome to your summer adventure with Southwestern Advantage!");
        this.displayMessage("You'll experience what it's like to run your own business selling educational products.");
        this.displayMessage("Your military background, gaming studio experience, and personal growth journey have given you unique advantages in this challenging program.");
        this.displayMessage("Do you have what it takes to succeed?");

        const nameInput = this.createElement('input', null);
        nameInput.type = 'text';
        nameInput.placeholder = 'Enter your character\'s name';
        
        const startButton = this.createElement('button', null, 'Start Adventure');
        startButton.addEventListener('click', () => {
            this.name = nameInput.value || "Player";
            this.displayMessage(`Welcome, ${this.name}! Your journey begins now.`);
            setTimeout(() => this.startGame(), 1000);
        });

        this.gameScreen.appendChild(nameInput);
        this.gameScreen.appendChild(startButton);
    }

    startGame() {
        this.showStats();
        this.morningRoutine();
    }

    showStats() {
        const statsDiv = document.querySelector('.stats') || this.createElement('div', 'stats');
        statsDiv.innerHTML = '';
        
        const title = this.createElement('h3', null, 'Character Stats');
        statsDiv.appendChild(title);
        
        const statsGrid = this.createElement('div', 'stats-grid');
        
        // Basic stats
        const basicStats = this.createElement('div');
        basicStats.innerHTML = `
            <p><strong>Name:</strong> ${this.name}</p>
            <p><strong>Week:</strong> ${this.week} of ${this.max_week}</p>
            <p><strong>Day:</strong> ${this.day} of 7</p>
            <p><strong>Total Sales:</strong> $${this.sales}</p>
            <p><strong>Personal Growth:</strong> ${this.personal_growth}</p>
            <p><strong>Referrals:</strong> ${this.referrals.length}</p>
            <p><strong>Cybersecurity Techniques:</strong> ${this.cyber_techniques_used}</p>
        `;
        
        // Energy bar
        const energyDiv = this.createElement('div');
        energyDiv.innerHTML = `
            <p><strong>Energy:</strong> ${this.energy}%</p>
        `;
        const energyBar = this.createElement('div', 'energy-bar');
        const energyProgress = this.createElement('div', 'energy-progress');
        energyProgress.style.width = `${this.energy}%`;
        // Change color based on energy level
        if (this.energy < 30) {
            energyProgress.style.backgroundColor = 'var(--accent-color)';
        } else if (this.energy < 60) {
            energyProgress.style.backgroundColor = 'var(--warning-color)';
        }
        energyBar.appendChild(energyProgress);
        energyDiv.appendChild(energyBar);
        
        // Skills
        const skillsDiv = this.createElement('div');
        skillsDiv.innerHTML = '<p><strong>Skills:</strong></p>';
        
        for (const [skill, level] of Object.entries(this.skills)) {
            const skillName = this.createElement('div', null, 
                `${skill.charAt(0).toUpperCase() + skill.slice(1)}: ${level.toFixed(1)}`);
            
            const skillBar = this.createElement('div', 'skill-bar');
            const skillProgress = this.createElement('div', 'skill-progress');
            skillProgress.style.width = `${(level / 5) * 100}%`;
            skillBar.appendChild(skillProgress);
            
            skillsDiv.appendChild(skillName);
            skillsDiv.appendChild(skillBar);
        }
        
        statsGrid.appendChild(basicStats);
        statsGrid.appendChild(energyDiv);
        statsDiv.appendChild(statsGrid);
        statsDiv.appendChild(skillsDiv);
        
        // Only add to game screen if not already there
        if (!document.querySelector('.stats')) {
            this.gameScreen.prepend(statsDiv);
        }
    }

    morningRoutine() {
        this.clearGameScreen();
        
        const statsDiv = document.querySelector('.stats') || this.createElement('div', 'stats');
        this.gameScreen.appendChild(statsDiv);
        this.showStats();
        
        const title = this.createElement('h2', null, `Week ${this.week}, Day ${this.day}: Morning`);
        const messageBox = this.createElement('div', 'message-box');
        this.gameScreen.appendChild(title);
        this.gameScreen.appendChild(messageBox);
        
        this.displayMessage("It's 6:00 AM. The sun is just starting to rise as you prepare for another day.");
        
        // Morning options
        const options = [
            ["Quick breakfast and immediate preparation", 
             "You quickly eat while reviewing your route and materials for the day.", 
             {energy: 5, organization: 0.2}],
            ["Military-style workout and protein breakfast", 
             "Your Air Force discipline shows as you complete your workout and fuel up properly.", 
             {energy: 15, resilience: 0.3}],
            ["In-depth product study session", 
             "You carefully study the educational materials, making notes on key selling points.", 
             {energy: -5, product_knowledge: 0.5}],
            ["Meditation and visualization exercises", 
             "You center yourself with mindfulness practices and visualize successful interactions.", 
             {energy: 10, personal_growth: 1}],
            ["Work on your game project for 30 minutes", 
             "You spend time coding a new feature for your game, keeping your creative skills sharp.", 
             {energy: -5, gaming_bonus: true}],
            ["Call your student leader for morning motivation", 
             "The pep talk gives you renewed focus and practical tips for the day ahead.", 
             {energy: 5, all_skills: 0.1}],
            ["Review cybersecurity principles that apply to sales", 
             "You identify parallels between information security and building customer trust.", 
             {energy: -3, cyber: 1}]
        ];
        
        // Select 5 random options for variety
        const dailyOptions = this.getRandomElements(options, 5);
        
        // Add special option based on day of week
        if (this.day === 1) {
            dailyOptions.push([
                "Weekly planning session", 
                "You meticulously map out your entire week, identifying goals and strategies.", 
                {energy: -10, organization: 0.4}
            ]);
        } else if (this.day === 7) {
            dailyOptions.push([
                "Prepare for weekly wrap-up", 
                "You organize your notes to share insights with your team later today.", 
                {energy: -5, communication: 0.3}
            ]);
        }
        
        const optionsDiv = this.createElement('div', 'options');
        this.gameScreen.appendChild(optionsDiv);
        
        // Display options as buttons
        dailyOptions.forEach((option, index) => {
            const [optionText, resultText, effects] = option;
            const button = this.createElement('button', null, `${index + 1}. ${optionText}`);
            
            button.addEventListener('click', () => {
                // Apply effects of the choice
                this.displayMessage(resultText);
                this.applyEffects(effects);
                this.showStats(); // Update stats display
                
                // Move to daily sales after a short delay
                setTimeout(() => {
                    this.dailySales();
                }, 1500);
            });
            
            optionsDiv.appendChild(button);
        });
    }

    dailySales() {
        this.clearGameScreen();
        
        const statsDiv = document.querySelector('.stats') || this.createElement('div', 'stats');
        this.gameScreen.appendChild(statsDiv);
        this.showStats();
        
        const title = this.createElement('h2', null, `Week ${this.week}, Day ${this.day}: Sales`);
        const messageBox = this.createElement('div', 'message-box');
        this.gameScreen.appendChild(title);
        this.gameScreen.appendChild(messageBox);
        
        this.displayMessage("You're ready to start visiting families and presenting educational materials.");
        
        // Number of encounters varies by day and energy
        const baseEncounters = this.getRandomInt(5, 8);
        const energyBonus = Math.floor(this.energy / 25); // More energy = more encounters
        const encounters = Math.min(baseEncounters + energyBonus, 12); // Cap at 12
        
        this.displayMessage(`Today you'll have up to ${encounters} encounters, depending on your energy.`);
        
        // Start encounters
        this.processEncounters(encounters, 0);
    }

    processEncounters(totalEncounters, currentEncounter) {
        if (currentEncounter >= totalEncounters || this.energy <= 10) {
            // End of encounters, move to evening
            setTimeout(() => {
                if (this.energy <= 10) {
                    this.displayMessage("You're exhausted and can't continue effectively.");
                }
                this.displayMessage("Day complete! You've visited homes and now have $" + this.sales + " in total sales.");
                this.displayMessage(`You have ${this.referrals.length} pending referrals to visit.`);
                setTimeout(() => this.eveningActivity(), 2000);
            }, 1000);
            return;
        }
        
        // Create encounter container
        const encounterDiv = this.createElement('div', 'encounter fade-in');
        this.gameScreen.appendChild(encounterDiv);
        
        // Show encounter number
        const encounterNum = this.createElement('h3', null, `Encounter ${currentEncounter + 1}`);
        encounterDiv.appendChild(encounterNum);
        
        // Determine encounter type
        const encounterType = this.getUniqueEncounter();
        const encounterTypeText = encounterType.replace(/_/g, ' ');
        
        // Show encounter type
        const encounterTypeElem = this.createElement('p', null, `------ ${encounterTypeText.charAt(0).toUpperCase() + encounterTypeText.slice(1)} Encounter ------`);
        encounterDiv.appendChild(encounterTypeElem);
        
        // Handle different encounter types
        if (encounterType === "interested") {
            this.handleInterestedEncounter(encounterDiv, totalEncounters, currentEncounter);
        } else if (encounterType === "busy") {
            this.handleBusyEncounter(encounterDiv, totalEncounters, currentEncounter);
        } else if (encounterType === "skeptical") {
            this.handleSkepticalEncounter(encounterDiv, totalEncounters, currentEncounter);
        } else if (encounterType === "rude") {
            this.handleRudeEncounter(encounterDiv, totalEncounters, currentEncounter);
        } else if (encounterType === "curious") {
            this.handleCuriousEncounter(encounterDiv, totalEncounters, currentEncounter);
        } else if (encounterType === "gaming_enthusiast" || 
                  encounterType === "cyber_professional" || 
                  encounterType === "personal_growth_coach" || 
                  encounterType === "referral" || 
                  encounterType === "software_developer" || 
                  encounterType === "military_veteran") {
            this.handleSpecialEncounter(encounterDiv, encounterType, totalEncounters, currentEncounter);
        } else {
            this.handleGenericEncounter(encounterDiv, encounterType, totalEncounters, currentEncounter);
        }
        
        // Energy check display
        if (this.energy <= 30) {
            const energyWarning = this.createElement('p', 'warning', `[Energy critically low: ${this.energy}%]`);
            encounterDiv.appendChild(energyWarning);
        } else if (this.energy <= 50) {
            const energyWarning = this.createElement('p', 'warning', `[Energy running low: ${this.energy}%]`);
            encounterDiv.appendChild(energyWarning);
        }
        
        this.showStats(); // Update stats after encounter
    }

    handleInterestedEncounter(encounterDiv, totalEncounters, currentEncounter) {
        const description = this.createElement('p', null, "The family seems genuinely interested in educational materials.");
        encounterDiv.appendChild(description);
        
        const options = [
            ["Give a comprehensive presentation highlighting all features (Energy -10, Higher sale chance)",
             "You thoroughly explain all aspects of the products, showing how they work together."],
            ["Focus on their specific educational needs (Energy -7, Better relationship)",
             "You ask targeted questions to understand exactly what would help their children most."],
            ["Share success stories from similar families (Energy -6, Good connection)",
             "You tell stories of how other families have benefited from these materials."],
            ["Use your gaming background to make the presentation interactive (Energy -8, Unique approach)",
             "You turn the presentation into an engaging, game-like experience that captivates the children."],
            ["Demonstrate the cyber-safety features of digital products (Energy -7, Technical credibility)",
             "You explain how the digital components protect children's privacy and data."]
        ];
        
        // Display random subset of options
        const displayOptions = this.getRandomElements(options, 4);
        const optionsDiv = this.createElement('div', 'options');
        encounterDiv.appendChild(optionsDiv);
        
        displayOptions.forEach((option, index) => {
            const [optionText, resultText] = option;
            const button = this.createElement('button', null, `${index + 1}. ${optionText}`);
            
            button.addEventListener('click', () => {
                // Handle the choice
                const resultPara = this.createElement('p', null, resultText);
                optionsDiv.innerHTML = ''; // Clear options
                optionsDiv.appendChild(resultPara);
                
                // Determine outcome based on choice
                let saleChance = 0.4; // Base chance
                saleChance += this.skills.product_knowledge * 0.1;
                saleChance += this.skills.communication * 0.1;
                
                // Apply effects based on choice
                if (optionText.includes("comprehensive")) {
                    this.energy -= 10;
                    saleChance += 0.2;
                } else if (optionText.includes("specific")) {
                    this.energy -= 7;
                    saleChance += 0.15;
                    this.skills.communication += 0.2;
                } else if (optionText.includes("success stories")) {
                    this.energy -= 6;
                    saleChance += 0.1;
                    this.skills.communication += 0.1;
                } else if (optionText.includes("gaming")) {
                    this.energy -= 8;
                    saleChance += 0.25;
                    this.skills.creativity = (this.skills.creativity || 0) + 0.3;
                } else if (optionText.includes("cyber")) {
                    this.energy -= 7;
                    saleChance += 0.15;
                    this.cyber_techniques_used += 1;
                }
                
                // Gaming studio bonus
                if (this.gaming_studio_bonus && Math.random() < 0.3) {
                    const bonusPara = this.createElement('p', null, "You use storytelling techniques from your game development to enhance your presentation!");
                    optionsDiv.appendChild(bonusPara);
                    saleChance += 0.15;
                }
                
                // Determine if sale is made
                if (Math.random() < saleChance) {
                    const saleAmount = this.getRandomInt(100, 300);
                    this.sales += saleAmount;
                    const salePara = this.createElement('p', 'success', `SUCCESS! They purchase $${saleAmount} worth of materials!`);
                    optionsDiv.appendChild(salePara);
                    this.skills.persistence += 0.1;
                    
                    // Possible referral
                    if (Math.random() < 0.3) {
                        const referralCount = this.getRandomInt(1, 2);
                        const referralPara = this.createElement('p', null, `They also give you ${referralCount} referrals to other families!`);
                        optionsDiv.appendChild(referralPara);
                        
                        for (let i = 0; i < referralCount; i++) {
                            this.referrals.push("general");
                        }
                    }
                } else {
                    const noPurchasePara = this.createElement('p', null, "They're interested but decide not to purchase today.");
                    optionsDiv.appendChild(noPurchasePara);
                }
                
                this.showStats(); // Update stats
                
                // Continue to next encounter after delay
                setTimeout(() => {
                    this.processEncounters(totalEncounters, currentEncounter + 1);
                }, 2000);
            });
            
            optionsDiv.appendChild(button);
        });
    }

    handleBusyEncounter(encounterDiv, totalEncounters, currentEncounter) {
        const description = this.createElement('p', null, "The family seems busy and distracted when you arrive.");
        encounterDiv.appendChild(description);
        
        const options = [
            ["Ask if there's a better time to come back (Energy -3, Respectful)",
             "You respect their time and suggest scheduling a proper appointment."],
            ["Use military-developed conciseness to give a quick pitch (Energy -5, Efficient)",
             "Your Air Force training helps you deliver a focused, efficient presentation."],
            ["Offer to leave materials for them to review later (Energy -2, Low pressure)",
             "You provide key information they can look at when convenient."],
            ["Use a high-energy approach to capture their attention (Energy -8, Bold)",
             "You energetically engage them, quickly demonstrating key product benefits."],
            ["Involve the children directly while parents are busy (Energy -6, Creative)",
             "You show the educational materials directly to the children, sparking their interest."]
        ];
        
        // Display random subset of options
        const displayOptions = this.getRandomElements(options, 4);
        const optionsDiv = this.createElement('div', 'options');
        encounterDiv.appendChild(optionsDiv);
        
        displayOptions.forEach((option, index) => {
            const [optionText, resultText] = option;
            const button = this.createElement('button', null, `${index + 1}. ${optionText}`);
            
            button.addEventListener('click', () => {
                // Handle the choice
                const resultPara = this.createElement('p', null, resultText);
                optionsDiv.innerHTML = ''; // Clear options
                optionsDiv.appendChild(resultPara);
                
                // Base sale chance
                let saleChance = 0.2; // Lower chance due to busy family
                
                // Apply effects based on choice
                if (optionText.includes("better time")) {
                    this.energy -= 3;
                    const schedulePara = this.createElement('p', null, "You schedule a time to come back when they're less busy.");
                    optionsDiv.appendChild(schedulePara);
                    this.skills.organization += 0.1;
                    
                    if (Math.random() < 0.3) {
                        const appointmentPara = this.createElement('p', null, "They appreciate your understanding and agree to a proper appointment.");
                        optionsDiv.appendChild(appointmentPara);
                        this.referrals.push("scheduled_appointment");
                    }
                } else if (optionText.includes("military")) {
                    this.energy -= 5;
                    saleChance += 0.2;
                    this.skills.communication += 0.2;
                } else if (optionText.includes("leave materials")) {
                    this.energy -= 2;
                    saleChance += 0.05;
                    const leavePara = this.createElement('p', null, "You leave information and move on to the next house.");
                    optionsDiv.appendChild(leavePara);
                } else if (optionText.includes("high-energy")) {
                    this.energy -= 8;
                    saleChance += 0.15;
                    this.skills.persistence += 0.2;
                } else if (optionText.includes("children")) {
                    this.energy -= 6;
                    saleChance += 0.25;
                    this.skills.adaptability = (this.skills.adaptability || 0) + 0.2;
                }
                
                // Determine if sale is made
                if (Math.random() < saleChance) {
                    const saleAmount = this.getRandomInt(50, 150);
                    this.sales += saleAmount;
                    const salePara = this.createElement('p', 'success', `Surprisingly, they make a quick purchase of $${saleAmount}!`);
                    optionsDiv.appendChild(salePara);
                } else {
                    const noPurchasePara = this.createElement('p', null, "They're too busy to make a decision today.");
                    optionsDiv.appendChild(noPurchasePara);
                }
                
                this.showStats(); // Update stats
                
                // Continue to next encounter after delay
                setTimeout(() => {
                    this.processEncounters(totalEncounters, currentEncounter + 1);
                }, 2000);
            });
            
            optionsDiv.appendChild(button);
        });
    }

    handleSkepticalEncounter(encounterDiv, totalEncounters, currentEncounter) {
        const description = this.createElement('p', null, "The family seems skeptical about door-to-door sales and educational materials.");
        encounterDiv.appendChild(description);
        
        const options = [
            ["Share independent research on educational effectiveness (Energy -7, Evidence-based)",
             "You cite studies showing how these materials improve academic performance."],
            ["Focus on your military background for credibility (Energy -5, Trust-building)",
             "You explain how your Air Force experience taught you integrity and service."],
            ["Acknowledge their concerns directly (Energy -6, Honest approach)",
             "You validate their skepticism and explain how the company addresses those concerns."],
            ["Use cybersecurity analogy about verifying trustworthy sources (Energy -8, Technical)",
             "You relate skepticism to good security practices, then prove your credibility."],
            ["Show product reviews and testimonials (Energy -7, Social proof)",
             "You share feedback from other satisfied families in their community."]
        ];
        
        // Display random subset of options
        const displayOptions = this.getRandomElements(options, 4);
        const optionsDiv = this.createElement('div', 'options');
        encounterDiv.appendChild(optionsDiv);
        
        displayOptions.forEach((option, index) => {
            const [optionText, resultText] = option;
            const button = this.createElement('button', null, `${index + 1}. ${optionText}`);
            
            button.addEventListener('click', () => {
                // Handle the choice
                const resultPara = this.createElement('p', null, resultText);
                optionsDiv.innerHTML = ''; // Clear options
                optionsDiv.appendChild(resultPara);
                
                // Determine outcome based on choice and skills
                let saleChance = 0.2; // Lower base chance due to skepticism
                saleChance += this.skills.persistence * 0.05;
                saleChance += this.skills.communication * 0.1;
                
                if (optionText.includes("research")) {
                    this.energy -= 7;
                    saleChance += 0.15;
                    this.skills.product_knowledge += 0.2;
                } else if (optionText.includes("military")) {
                    this.energy -= 5;
                    saleChance += 0.2;
                    this.skills.resilience += 0.1;
                } else if (optionText.includes("Acknowledge")) {
                    this.energy -= 6;
                    saleChance += 0.25;
                    this.skills.communication += 0.2;
                } else if (optionText.includes("cybersecurity")) {
                    this.energy -= 8;
                    saleChance += 0.15;
                    this.cyber_techniques_used += 1;
                    this.skills.communication += 0.1;
                } else if (optionText.includes("reviews")) {
                    this.energy -= 7;
                    saleChance += 0.2;
                    this.skills.product_knowledge += 0.1;
                }
                
                // Determine if sale is made
                if (Math.random() < saleChance) {
                    const saleAmount = this.getRandomInt(75, 250);
                    this.sales += saleAmount;
                    const salePara = this.createElement('p', 'success', `You overcome their skepticism! Sale: ${saleAmount}`);
                    optionsDiv.appendChild(salePara);
                    this.skills.persistence += 0.2;
                } else {
                    const noPurchasePara = this.createElement('p', null, "They remain unconvinced and decline to purchase.");
                    optionsDiv.appendChild(noPurchasePara);
                }
                
                this.showStats(); // Update stats
                
                // Continue to next encounter after delay
                setTimeout(() => {
                    this.processEncounters(totalEncounters, currentEncounter + 1);
                }, 2000);
            });
            
            optionsDiv.appendChild(button);
        });
    }
    
    handleRudeEncounter(encounterDiv, totalEncounters, currentEncounter) {
        const description = this.createElement('p', null, "The person is immediately dismissive and borders on rude.");
        encounterDiv.appendChild(description);
        
        const options = [
            ["Stay calm and professional (Energy -5, Resilient approach)",
             "Your military training helps you maintain composure despite their attitude."],
            ["Acknowledge their feelings and apologize for interrupting (Energy -3, Empathetic)",
             "You validate their perspective and respectfully prepare to leave."],
            ["Use personal development techniques to stay positive (Energy -3, Growth mindset)",
             "You see this as a chance to practice emotional management and don't take it personally."],
            ["Try a different angle to engage them (Energy -10, Persistent)",
             "You attempt to find common ground despite their initial rudeness."],
            ["Thank them briefly and move on quickly (Energy -2, Efficient)",
             "You recognize this isn't worth your energy and move to the next house."]
        ];
        
        // Display random subset of options
        const displayOptions = this.getRandomElements(options, 4);
        const optionsDiv = this.createElement('div', 'options');
        encounterDiv.appendChild(optionsDiv);
        
        displayOptions.forEach((option, index) => {
            const [optionText, resultText] = option;
            const button = this.createElement('button', null, `${index + 1}. ${optionText}`);
            
            button.addEventListener('click', () => {
                // Handle the choice
                const resultPara = this.createElement('p', null, resultText);
                optionsDiv.innerHTML = ''; // Clear options
                optionsDiv.appendChild(resultPara);
                
                // Very low base chance
                let saleChance = 0.05;
                
                if (optionText.includes("Stay calm")) {
                    this.energy -= 5;
                    this.skills.resilience += 0.2;
                    saleChance += 0.05;
                } else if (optionText.includes("Acknowledge")) {
                    this.energy -= 3;
                    this.skills.communication += 0.1;
                    saleChance += 0.03;
                } else if (optionText.includes("personal development")) {
                    this.energy -= 3;
                    this.personal_growth += 1;
                    this.skills.resilience += 0.2;
                    saleChance += 0.02;
                } else if (optionText.includes("different angle")) {
                    this.energy -= 10;
                    this.skills.persistence += 0.3;
                    saleChance += 0.1;
                } else if (optionText.includes("Thank them")) {
                    this.energy -= 2;
                    this.skills.efficiency = (this.skills.efficiency || 0) + 0.2;
                    saleChance = 0; // No chance if you leave
                }
                
                // Determine if sale is made
                if (Math.random() < saleChance) {
                    const saleAmount = this.getRandomInt(50, 100);
                    this.sales += saleAmount;
                    const salePara = this.createElement('p', 'success', `Against all odds, you turn it around! Small sale: ${saleAmount}`);
                    optionsDiv.appendChild(salePara);
                    this.skills.persistence += 0.3;
                } else {
                    const noPurchasePara = this.createElement('p', null, "They remain uninterested, but you've handled the situation professionally.");
                    optionsDiv.appendChild(noPurchasePara);
                }
                
                // Potential character building
                if (!optionText.includes("Thank them")) {
                    this.personal_growth += 0.5;
                }
                
                this.showStats(); // Update stats
                
                // Continue to next encounter after delay
                setTimeout(() => {
                    this.processEncounters(totalEncounters, currentEncounter + 1);
                }, 2000);
            });
            
            optionsDiv.appendChild(button);
        });
    }
    
    handleCuriousEncounter(encounterDiv, totalEncounters, currentEncounter) {
        const description = this.createElement('p', null, "The family is curious and asks many questions about the products.");
        encounterDiv.appendChild(description);
        
        const options = [
            ["Answer each question in detail (Energy -10, Comprehensive)",
             "You patiently address all their questions with thorough explanations."],
            ["Focus on their main concerns (Energy -7, Targeted)",
             "You identify their key concerns and address those specifically."],
            ["Use your gaming experience to explain concepts (Energy -8, Engaging)",
             "You use storytelling techniques from your game development to make complex ideas clear."],
            ["Relate questions to your cybersecurity background (Energy -7, Technical)",
             "You connect their questions about online safety to your professional expertise."],
            ["Demonstrate with hands-on examples (Energy -9, Interactive)",
             "You let them interact with the materials while answering questions."]
        ];
        
        // Display random subset of options
        const displayOptions = this.getRandomElements(options, 4);
        const optionsDiv = this.createElement('div', 'options');
        encounterDiv.appendChild(optionsDiv);
        
        displayOptions.forEach((option, index) => {
            const [optionText, resultText] = option;
            const button = this.createElement('button', null, `${index + 1}. ${optionText}`);
            
            button.addEventListener('click', () => {
                // Handle the choice
                const resultPara = this.createElement('p', null, resultText);
                optionsDiv.innerHTML = ''; // Clear options
                optionsDiv.appendChild(resultPara);
                
                // Good base chance due to curiosity
                let saleChance = 0.6;
                saleChance += this.skills.product_knowledge * 0.1;
                
                if (optionText.includes("Answer each")) {
                    this.energy -= 10;
                    saleChance += 0.1;
                    this.skills.product_knowledge += 0.2;
                } else if (optionText.includes("Focus on")) {
                    this.energy -= 7;
                    saleChance += 0.15;
                    this.skills.communication += 0.1;
                } else if (optionText.includes("gaming")) {
                    this.energy -= 8;
                    saleChance += 0.2;
                    this.skills.creativity = (this.skills.creativity || 0) + 0.2;
                } else if (optionText.includes("cybersecurity")) {
                    this.energy -= 7;
                    saleChance += 0.15;
                    this.cyber_techniques_used += 1;
                } else if (optionText.includes("hands-on")) {
                    this.energy -= 9;
                    saleChance += 0.25;
                    this.skills.product_knowledge += 0.1;
                }
                
                // Determine if sale is made
                if (Math.random() < saleChance) {
                    const saleAmount = this.getRandomInt(150, 350);
                    this.sales += saleAmount;
                    const salePara = this.createElement('p', 'success', `Their curiosity leads to a purchase! Sale: ${saleAmount}`);
                    optionsDiv.appendChild(salePara);
                    
                    // Potential referral
                    if (Math.random() < 0.4) {
                        const referralCount = this.getRandomInt(1, 3);
                        const referralPara = this.createElement('p', null, `They're so impressed with your knowledge that they give you ${referralCount} referrals!`);
                        optionsDiv.appendChild(referralPara);
                        
                        for (let i = 0; i < referralCount; i++) {
                            this.referrals.push("general");
                        }
                    }
                } else {
                    const noPurchasePara = this.createElement('p', null, "They're grateful for the information but want to think about it.");
                    optionsDiv.appendChild(noPurchasePara);
                }
                
                this.showStats(); // Update stats
                
                // Continue to next encounter after delay
                setTimeout(() => {
                    this.processEncounters(totalEncounters, currentEncounter + 1);
                }, 2000);
            });
            
            optionsDiv.appendChild(button);
        });
    }
    
    handleSpecialEncounter(encounterDiv, encounterType, totalEncounters, currentEncounter) {
        let description;
        let options;
        
        if (encounterType === "gaming_enthusiast") {
            description = this.createElement('p', null, "You meet a family with teenagers who are passionate about video games. The moment you mention your gaming studio, their eyes light up with interest.");
            options = [
                ["Show them how educational materials connect to game design (Energy -8)",
                 "You explain how algorithms, design principles, and storytelling in games relate to the educational content."],
                ["Share specific examples of how gaming develops problem-solving skills (Energy -7)",
                 "You share how gaming develops critical thinking and how educational materials enhance those same skills."],
                ["Demonstrate your game prototype and relate it to learning (Energy -10)",
                 "You pull out your tablet and demonstrate your game prototype, relating game mechanics to learning principles."],
                ["Ask them about their favorite games and gaming habits (Energy -5)",
                 "You build rapport by discussing their gaming interests before connecting to educational benefits."],
                ["Explain how your military and gaming backgrounds connect (Energy -6)",
                 "You explain how both military and gaming experiences taught you discipline and creative problem-solving."]
            ];
        } else if (encounterType === "cyber_professional") {
            saleChance = 0.4; // Moderate base chance
            
            if (optionText.includes("build credibility")) {
                this.energy -= 7;
                this.skills.communication += 0.2;
                this.cyber_techniques_used += 1;
                saleChance += 0.3;
            } else if (optionText.includes("security features")) {
                this.energy -= 8;
                this.skills.product_knowledge += 0.3;
                this.cyber_techniques_used += 1;
                saleChance += 0.2;
            } else if (optionText.includes("military cybersecurity")) {
                this.energy -= 6;
                this.skills.communication += 0.3;
                this.cyber_techniques_used += 1;
                saleChance += 0.35;
            } else if (optionText.includes("offline products")) {
                this.energy -= 5;
                this.skills.adaptability = (this.skills.adaptability || 0) + 0.3;
                saleChance += 0.15;
            } else if (optionText.includes("technical analogy")) {
                this.energy -= 9;
                this.skills.product_knowledge += 0.2;
                this.cyber_techniques_used += 1;
                saleChance += 0.25;
            } else {
                this.energy -= 7;
                saleChance -= 0.1;
            }
            
            if (Math.random() < saleChance) {
                const saleAmount = this.getRandomInt(200, 400);
                this.sales += saleAmount;
                const salePara = this.createElement('p', 'success', `Your cybersecurity knowledge wins their trust! Sale: ${saleAmount}`);
                optionsDiv.appendChild(salePara);
                
                // Potential job lead
                if (Math.random() < 0.3) {
                    const jobPara = this.createElement('p', null, "They're impressed enough to mention potential internship opportunities in their company! You exchange contact information for follow-up after the summer.");
                    optionsDiv.appendChild(jobPara);
                    this.personal_growth += 2;
                }
            } else {
                const noPurchasePara = this.createElement('p', null, "Despite the technical discussion, they remain unconvinced about the educational products.");
                optionsDiv.appendChild(noPurchasePara);
                
                // Might still get professional advice
                if (Math.random() < 0.4) {
                    const advicePara = this.createElement('p', null, "However, they offer some valuable career advice for your cybersecurity studies.");
                    optionsDiv.appendChild(advicePara);
                    this.personal_growth += 1;
                }
            }
        } else if (encounterType === "personal_growth_coach") {
            saleChance = 0.5; // Good base chance
            
            if (optionText.includes("personal growth journey")) {
                this.energy -= 6;
                this.personal_growth += 2;
                saleChance += 0.2;
            } else if (optionText.includes("coaching advice")) {
                this.energy -= 5;
                for (let skill in this.skills) {
                    this.skills[skill] += 0.15;
                }
                this.personal_growth += 1;
                saleChance += 0.1;
            } else if (optionText.includes("entrepreneurial mindset")) {
                this.energy -= 7;
                this.skills.communication += 0.3;
                this.personal_growth += 1;
                saleChance += 0.15;
            } else if (optionText.includes("educational products")) {
                this.energy -= 8;
                this.skills.product_knowledge += 0.3;
                saleChance += 0.25;
            } else if (optionText.includes("gaming studio")) {
                this.energy -= 6;
                this.personal_growth += 2;
                saleChance += 0.15;
            } else {
                this.energy -= 7;
                saleChance -= 0.1;
            }
            
            if (Math.random() < saleChance) {
                const saleAmount = this.getRandomInt(300, 500);
                this.sales += saleAmount;
                const salePara = this.createElement('p', 'success', `They appreciate your authenticity and growth mindset! Sale: ${saleAmount}`);
                optionsDiv.appendChild(salePara);
            } else {
                const noPurchasePara = this.createElement('p', null, "While they value the conversation, they don't have children who need educational materials.");
                optionsDiv.appendChild(noPurchasePara);
                
                // Might still get development advice
                if (Math.random() < 0.6) {
                    const advicePara = this.createElement('p', null, "However, they share a powerful personal development concept that resonates with you.");
                    optionsDiv.appendChild(advicePara);
                    this.personal_growth += 2;
                }
            }
            
            // Growth opportunity
            const coachingPara = this.createElement('p', null, "They offer to have a coaching session with you after your day concludes.");
            optionsDiv.appendChild(coachingPara);
            
            const coachingOptionsDiv = this.createElement('div', 'options');
            optionsDiv.appendChild(coachingOptionsDiv);
            
            const acceptButton = this.createElement('button', null, "1. Accept the coaching session (Energy -10, Personal Growth +5)");
            const declineButton = this.createElement('button', null, "2. Politely decline due to your busy schedule (No effect)");
            
            acceptButton.addEventListener('click', () => {
                coachingOptionsDiv.innerHTML = '';
                this.energy -= 10;
                this.personal_growth += 5;
                for (let skill in this.skills) {
                    this.skills[skill] += 0.1;
                }
                const coachingResultPara = this.createElement('p', null, "The coaching session provides powerful insights that will help you throughout the summer.");
                coachingOptionsDiv.appendChild(coachingResultPara);
                this.showStats();
            });
            
            declineButton.addEventListener('click', () => {
                coachingOptionsDiv.innerHTML = '';
                const declineResultPara = this.createElement('p', null, "You thank them but explain that your schedule is packed with sales appointments.");
                coachingOptionsDiv.appendChild(declineResultPara);
            });
            
            coachingOptionsDiv.appendChild(acceptButton);
            coachingOptionsDiv.appendChild(declineButton);
        } else if (encounterType === "referral") {
            saleChance = 0.7; // High base chance for referrals
            
            if (optionText.includes("who referred you")) {
                this.energy -= 5;
                this.skills.communication += 0.2;
                saleChance += 0.15;
            } else if (optionText.includes("standard presentation")) {
                this.energy -= 8;
                this.skills.product_knowledge += 0.2;
                saleChance += 0.1;
            } else if (optionText.includes("specific educational needs")) {
                this.energy -= 6;
                this.skills.communication += 0.3;
                saleChance += 0.2;
            } else if (optionText.includes("special discount")) {
                this.energy -= 5;
                this.skills.persistence += 0.1;
                saleChance += 0.15;
            } else if (optionText.includes("unique background")) {
                this.energy -= 7;
                this.personal_growth += 1;
                saleChance += 0.15;
            } else {
                this.energy -= 7;
                saleChance -= 0.1;
            }
            
            if (Math.random() < saleChance) {
                const saleAmount = this.getRandomInt(200, 450);
                this.sales += saleAmount;
                const salePara = this.createElement('p', 'success', `The power of referrals! They purchase ${saleAmount} worth of materials!`);
                optionsDiv.appendChild(salePara);
                
                // Chain referral chance
                if (Math.random() < 0.5) {
                    const newReferrals = this.getRandomInt(1, 3);
                    const referralPara = this.createElement('p', null, `They're so pleased that they give you ${newReferrals} more referrals!`);
                    optionsDiv.appendChild(referralPara);
                    
                    for (let i = 0; i < newReferrals; i++) {
                        this.referrals.push("general");
                    }
                }
            } else {
                const noPurchasePara = this.createElement('p', null, "Despite the referral, they decide not to purchase today.");
                optionsDiv.appendChild(noPurchasePara);
            }
        } else if (encounterType === "software_developer") {
            saleChance = 0.5; // Moderate base chance
            
            if (optionText.includes("gaming studio experience")) {
                this.energy -= 7;
                this.skills.communication += 0.2;
                saleChance += 0.2;
            } else if (optionText.includes("software development principles")) {
                this.energy -= 8;
                this.skills.product_knowledge += 0.2;
                saleChance += 0.25;
            } else if (optionText.includes("cybersecurity insights")) {
                this.energy -= 6;
                this.cyber_techniques_used += 1;
                saleChance += 0.15;
            } else if (optionText.includes("development work")) {
                this.energy -= 5;
                this.skills.communication += 0.3;
                saleChance += 0.2;
            } else if (optionText.includes("technical aspects")) {
                this.energy -= 9;
                this.skills.product_knowledge += 0.3;
                saleChance += 0.3;
            } else {
                this.energy -= 7;
                saleChance -= 0.1;
            }
            
            if (Math.random() < saleChance) {
                const saleAmount = this.getRandomInt(200, 400);
                this.sales += saleAmount;
                const salePara = this.createElement('p', 'success', `Your technical knowledge wins them over! Sale: ${saleAmount}`);
                optionsDiv.appendChild(salePara);
                
                // Potential collaboration
                if (Math.random() < 0.3) {
                    const collaborationPara = this.createElement('p', null, "They're interested in discussing potential collaboration on educational games in the future! You exchange contact information for follow-up after the summer.");
                    optionsDiv.appendChild(collaborationPara);
                    this.personal_growth += 2;
                }
            } else {
                const noPurchasePara = this.createElement('p', null, "They appreciate the technical discussion but decide not to purchase today.");
                optionsDiv.appendChild(noPurchasePara);
                
                // Might still get technical advice
                if (Math.random() < 0.4) {
                    const advicePara = this.createElement('p', null, "However, they offer some valuable technical advice for your game development.");
                    optionsDiv.appendChild(advicePara);
                    this.personal_growth += 1;
                }
            }
        } else if (encounterType === "military_veteran") {
            saleChance = 0.6; // Good base chance due to shared background
            
            if (optionText.includes("specific experiences")) {
                this.energy -= 6;
                this.skills.communication += 0.2;
                saleChance += 0.2;
            } else if (optionText.includes("military training helps")) {
                this.energy -= 7;
                this.skills.persistence += 0.3;
                saleChance += 0.15;
            } else if (optionText.includes("military values")) {
                this.energy -= 8;
                this.skills.product_knowledge += 0.2;
                saleChance += 0.25;
            } else if (optionText.includes("Ask about their service")) {
                this.energy -= 5;
                this.skills.communication += 0.3;
                saleChance += 0.3;
            } else if (optionText.includes("military cybersecurity")) {
                this.energy -= 7;
                this.cyber_techniques_used += 1;
                saleChance += 0.2;
            } else {
                this.energy -= 7;
                saleChance -= 0.1;
            }
            
            if (Math.random() < saleChance) {
                const saleAmount = this.getRandomInt(250, 450);
                this.sales += saleAmount;
                const salePara = this.createElement('p', 'success', `The military connection creates instant trust! Sale: ${saleAmount}`);
                optionsDiv.appendChild(salePara);
                
                // Potential referrals to other veterans
                if (Math.random() < 0.6) {
                    const referrals = this.getRandomInt(1, 3);
                    const referralPara = this.createElement('p', null, `They offer to connect you with ${referrals} other military families in the area!`);
                    optionsDiv.appendChild(referralPara);
                    
                    for (let i = 0; i < referrals; i++) {
                        this.referrals.push("military_family");
                    }
                }
            } else {
                const noPurchasePara = this.createElement('p', null, "Despite the military connection, they decide not to purchase today.");
                optionsDiv.appendChild(noPurchasePara);
                
                // Might still get advice
                if (Math.random() < 0.5) {
                    const advicePara = this.createElement('p', null, "However, they share some valuable advice from their military career that will help you this summer.");
                    optionsDiv.appendChild(advicePara);
                    this.skills.resilience += 0.2;
                    this.personal_growth += 1;
                }
            }
        } else {
            // Generic special encounter logic
            saleChance = 0.5; // Base chance
            
            if (optionText.includes("common ground")) {
                this.energy -= 6;
                this.skills.communication += 0.2;
                saleChance += 0.2;
            } else if (optionText.includes("Tailor your presentation")) {
                this.energy -= 8;
                this.skills.product_knowledge += 0.2;
                saleChance += 0.25;
            } else if (optionText.includes("Share relevant")) {
                this.energy -= 7;
                this.personal_growth += 1;
                saleChance += 0.15;
            } else if (optionText.includes("Ask questions")) {
                this.energy -= 5;
                this.skills.communication += 0.3;
                saleChance += 0.2;
            } else {
                this.energy -= 7;
                saleChance -= 0.1;
            }
            
            if (Math.random() < saleChance) {
                const saleAmount = this.getRandomInt(200, 400);
                this.sales += saleAmount;
                const salePara = this.createElement('p', 'success', `Your personalized approach pays off! Sale: ${saleAmount}`);
                optionsDiv.appendChild(salePara);
                
                // Potential referral
                if (Math.random() < 0.4) {
                    const referrals = this.getRandomInt(1, 2);
                    const referralPara = this.createElement('p', null, `They offer ${referrals} referrals to others who might be interested!`);
                    optionsDiv.appendChild(referralPara);
                    
                    for (let i = 0; i < referrals; i++) {
                        this.referrals.push("general");
                    }
                }
            } else {
                const noPurchasePara = this.createElement('p', null, "Though the conversation went well, they decide not to purchase today.");
                optionsDiv.appendChild(noPurchasePara);
                
                // Might still get something positive
                if (Math.random() < 0.3) {
                    const insightPara = this.createElement('p', null, "However, they share some valuable insights that will help you going forward.");
                    optionsDiv.appendChild(insightPara);
                    this.personal_growth += 1;
                }
            }
        }
    }
    
    handleGenericEncounter(encounterDiv, encounterType, totalEncounters, currentEncounter) {
        const description = this.createElement('p', null, "You have a conversation with a family about educational materials.");
        encounterDiv.appendChild(description);
        
        const options = [
            ["Give your standard presentation (Energy -7)",
             "You deliver your well-practiced standard presentation."],
            ["Tailor your approach based on what you observe (Energy -9)",
             "You notice details about their home and family, customizing your approach."],
            ["Focus on building rapport before discussing products (Energy -6)",
             "You take time to connect with them before discussing products."],
            ["Showcase the most popular products first (Energy -5)",
             "You highlight the bestselling products that most families purchase."]
        ];
        
        const optionsDiv = this.createElement('div', 'options');
        encounterDiv.appendChild(optionsDiv);
        
        options.forEach((option, index) => {
            const [optionText, resultText] = option;
            const button = this.createElement('button', null, `${index + 1}. ${optionText}`);
            
            button.addEventListener('click', () => {
                // Handle the choice
                const resultPara = this.createElement('p', null, resultText);
                optionsDiv.innerHTML = ''; // Clear options
                optionsDiv.appendChild(resultPara);
                
                // Base chance
                let saleChance = 0.3;
                
                if (optionText.includes("standard presentation")) {
                    this.energy -= 7;
                    saleChance += 0.1;
                } else if (optionText.includes("Tailor your approach")) {
                    this.energy -= 9;
                    saleChance += 0.2;
                    this.skills.communication += 0.2;
                } else if (optionText.includes("building rapport")) {
                    this.energy -= 6;
                    saleChance += 0.15;
                    this.skills.communication += 0.1;
                } else if (optionText.includes("popular products")) {
                    this.energy -= 5;
                    saleChance += 0.1;
                } else {
                    this.energy -= 7;
                    saleChance -= 0.1;
                }
                
                // Determine if sale is made
                if (Math.random() < saleChance) {
                    const saleAmount = this.getRandomInt(100, 300);
                    this.sales += saleAmount;
                    const salePara = this.createElement('p', 'success', `They decide to purchase! Sale: ${saleAmount}`);
                    optionsDiv.appendChild(salePara);
                } else {
                    const noPurchasePara = this.createElement('p', null, "They listen politely but decide not to purchase today.");
                    optionsDiv.appendChild(noPurchasePara);
                }
                
                this.showStats(); // Update stats
                
                // Continue to next encounter after delay
                setTimeout(() => {
                    this.processEncounters(totalEncounters, currentEncounter + 1);
                }, 2000);
            });
            
            optionsDiv.appendChild(button);
        });
    }
    
    eveningActivity() {
        this.clearGameScreen();
        
        const statsDiv = document.querySelector('.stats') || this.createElement('div', 'stats');
        this.gameScreen.appendChild(statsDiv);
        this.showStats();
        
        const title = this.createElement('h2', null, `Week ${this.week}, Day ${this.day}: Evening`);
        const messageBox = this.createElement('div', 'message-box');
        this.gameScreen.appendChild(title);
        this.gameScreen.appendChild(messageBox);
        
        this.displayMessage("After a long day of sales, you have some evening time to use wisely.");
        
        // Different options based on day of week
        let specialOption;
        
        if (this.day === 1) { // Monday
            specialOption = ["Team meeting to share week goals (Energy +5, All Skills +0.1)",
                            "You participate in the weekly team meeting, setting goals and sharing strategies.",
                            {energy: 5, all_skills: 0.1}];
        } else if (this.day === 3) { // Wednesday
            specialOption = ["Mid-week check-in call with student leader (Energy +5, Resilience +0.2)",
                            "You review your progress and get personalized coaching to improve your approach.",
                            {energy: 5, resilience: 0.2}];
        } else if (this.day === 5) { // Friday
            specialOption = ["Community game night with other team members (Energy +10, Creativity +0.3)",
                            "You relax and bond with teammates while playing games, sharing your game design insights.",
                            {energy: 10, creativity: 0.3}];
        } else if (this.day === 7) { // Sunday
            specialOption = ["Weekly planning and reflection session (Energy +5, Organization +0.3)",
                            "You analyze your results, identify patterns, and plan your strategy for next week.",
                            {energy: 5, organization: 0.3}];
        } else {
            specialOption = ["Video call with family or friends from home (Energy +10, Resilience +0.2)",
                            "You reconnect with loved ones, sharing stories about your summer experience.",
                            {energy: 10, resilience: 0.2}];
        }
        
        // Regular evening options
        const regularOptions = [
            ["Call family/friends for support (Energy +10, Resilience +0.2)",
             "You catch up with loved ones, boosting your spirits for tomorrow.",
             {energy: 10, resilience: 0.2}],
            ["Study product materials (Energy -5, Product Knowledge +0.4)",
             "You deepen your understanding of the products and how to present them.",
             {energy: -5, product_knowledge: 0.4}],
            ["Work on your game development projects (Energy -10, Creativity +0.3)",
             "You spend time coding and designing your game, keeping your creative skills sharp.",
             {energy: -10, creativity: 0.3, gaming_bonus: true}],
            ["Team social activity (Energy +5, Communication +0.3)",
             "You join teammates for dinner and conversation, strengthening relationships.",
             {energy: 5, communication: 0.3}],
            ["Personal development and reflection (Energy +5, Personal Growth +2)",
             "You journal about the day's lessons and focus on your growth mindset.",
             {energy: 5, personal_growth: 2}],
            ["Exercise and physical recovery (Energy +15, Resilience +0.2)",
             "You maintain your military fitness habits, helping your body recover for tomorrow.",
             {energy: 15, resilience: 0.2}],
            ["Analyze sales data using cybersecurity analytical methods (Energy -8, Organization +0.3)",
             "You apply structured analysis techniques from your military training to identify patterns.",
             {energy: -8, organization: 0.3, cyber: 1}],
            ["Prepare and organize materials for tomorrow (Energy -5, Organization +0.3)",
             "You get everything ready for an efficient start tomorrow morning.",
             {energy: -5, organization: 0.3}],
            ["Watch educational videos about sales techniques (Energy +0, All Skills +0.1)",
             "You learn new approaches from training videos provided by Southwestern.",
             {energy: 0, all_skills: 0.1}]
        ];
        
        // Add the special option based on day
        const eveningOptions = [specialOption];
        
        // Add 4 random regular options
        eveningOptions.push(...this.getRandomElements(regularOptions, 4));
        
        // Display options
        const optionsDiv = this.createElement('div', 'options');
        this.gameScreen.appendChild(optionsDiv);
        
        this.displayMessage("How do you want to spend your evening?");
        
        eveningOptions.forEach((option, index) => {
            const [optionText, description, effects] = option;
            const button = this.createElement('button', null, `${index + 1}. ${optionText}`);
            
            button.addEventListener('click', () => {
                optionsDiv.innerHTML = '';
                const resultPara = this.createElement('p', null, description);
                optionsDiv.appendChild(resultPara);
                
                // Apply effects
                this.applyEffects(effects);
                this.showStats();
                
                // Random evening events (20% chance)
                if (Math.random() < 0.2) {
                    this.handleRandomEveningEvent(optionsDiv);
                } else {
                    // Continue to end day
                    setTimeout(() => {
                        this.endDay();
                    }, 2000);
                }
            });
            
            optionsDiv.appendChild(button);
        });
    }
    
    handleRandomEveningEvent(containerDiv) {
        const eveningEvents = [
            ["Your host family invites you to dinner with them.",
             "You enjoy a home-cooked meal and conversation, learning about the local community.",
             {energy: 15, communication: 0.2}],
            ["A teammate is struggling and calls you for advice.",
             "You draw on your military leadership experience to help them through a tough day.",
             {personal_growth: 2, resilience: 0.2}],
            ["You receive an unexpected message from a customer with a referral.",
             "They were so impressed with your approach that they've told their friends about you.",
             {referrals: this.getRandomInt(1, 3)}],
            ["You have a breakthrough idea for your game project.",
             "The day's experiences have given you a fresh perspective on your game design.",
             {creativity: 0.5, personal_growth: 1}],
            ["You discover a new cybersecurity concept that applies to sales.",
             "You realize how access control principles apply to identifying decision-makers in families.",
             {cyber: 1, product_knowledge: 0.3}]
        ];
        
        const event = this.getRandomElement(eveningEvents);
        const [eventTitle, eventDesc, effects] = event;
        
        const eventDiv = this.createElement('div', 'special-event');
        const eventTitleElem = this.createElement('h3', null, "SPECIAL EVENT: " + eventTitle);
        const eventDescElem = this.createElement('p', null, eventDesc);
        
        eventDiv.appendChild(eventTitleElem);
        eventDiv.appendChild(eventDescElem);
        containerDiv.appendChild(eventDiv);
        
        // Apply effects
        this.applyEffects(effects);
        
        // Special message for referrals
        if (effects.referrals) {
            const referralPara = this.createElement('p', null, `You've gained ${effects.referrals} new referrals!`);
            eventDiv.appendChild(referralPara);
        }
        
        this.showStats();
        
        // Continue to end day
        setTimeout(() => {
            this.endDay();
        }, 2500);
    }
            description = this.createElement('p', null, "You meet a cybersecurity professional who's immediately skeptical of door-to-door sales. They begin asking pointed questions about data privacy in educational apps.");
            options = [
                ["Leverage your cybersecurity background to build credibility (Energy -7)",
                 "You mention your Security+ certification and cybersecurity studies at UIW, instantly building credibility."],
                ["Discuss specific security features of the digital products (Energy -8)",
                 "You provide detailed information about encryption and privacy protections in the digital products."],
                ["Share your military cybersecurity experience (Energy -6)",
                 "You share stories from your Air Force cybersecurity experience, establishing instant rapport."],
                ["Acknowledge their concerns and focus on offline products (Energy -5)",
                 "You validate their concerns and focus on physical books and offline learning tools."],
                ["Use a technical analogy from cybersecurity to explain product benefits (Energy -9)",
                 "You use the concept of 'defense in depth' to explain how multiple learning approaches reinforce education."]
            ];
        } else if (encounterType === "personal_growth_coach") {
            description = this.createElement('p', null, "You encounter a professional personal development coach who is curious about your summer work. They ask insightful questions about what you're learning from the experience.");
            options = [
                ["Share your personal growth journey and goals (Energy -6)",
                 "You open up about your growth journey, creating an authentic connection."],
                ["Ask them for coaching advice that could help your sales approach (Energy -5)",
                 "They offer valuable insights about connecting authentically with customers."],
                ["Discuss how Southwestern develops entrepreneurial mindset (Energy -7)",
                 "You explain the character-building aspects of the Southwestern program."],
                ["Connect personal development to the educational products (Energy -8)",
                 "You demonstrate how the products foster growth mindset in children."],
                ["Share how your gaming studio reflects your personal growth (Energy -6)",
                 "You share how creating games reflects your values of learning through play."]
            ];
        } else if (encounterType === "referral") {
            if (this.referrals.length > 0) {
                const referralType = this.referrals.shift();
                description = this.createElement('p', null, `You're visiting a ${referralType.replace('_', ' ')} that was referred to you. They're already expecting you and seem receptive to your visit.`);
                options = [
                    ["Mention who referred you and build on that connection (Energy -5)",
                     "You strengthen the connection by elaborating on your interaction with their friend."],
                    ["Give your standard presentation, but personalized to their interests (Energy -8)",
                     "Your tailored presentation resonates with their specific situation."],
                    ["Ask about their specific educational needs first (Energy -6)",
                     "By understanding their needs first, you can focus on the most relevant products."],
                    ["Show gratitude for the referral and offer a special discount (Energy -5)",
                     "They appreciate the special offer for being a referral customer."],
                    ["Use your unique background to create immediate rapport (Energy -7)",
                     "You find common ground that creates an immediate connection."]
                ];
            } else {
                description = this.createElement('p', null, "You check your referral list but find it's empty.");
                encounterDiv.appendChild(description);
                
                // Skip this encounter and move to the next one
                setTimeout(() => {
                    this.processEncounters(totalEncounters, currentEncounter + 1);
                }, 1500);
                return;
            }
        } else if (encounterType === "software_developer") {
            description = this.createElement('p', null, "You meet a software developer who's curious about educational technology. They start asking detailed questions about the digital components of your products.");
            options = [
                ["Discuss your gaming studio experience and development process (Energy -7)",
                 "You discuss your game development experience, immediately establishing technical credibility."],
                ["Connect software development principles to learning methods (Energy -8)",
                 "You draw parallels between software development and how children learn through the materials."],
                ["Share your cybersecurity insights on the educational platforms (Energy -6)",
                 "Your cybersecurity knowledge impresses them as you discuss data protection in educational apps."],
                ["Ask about their development work and find common ground (Energy -5)",
                 "By showing genuine interest in their work, you build rapport before discussing products."],
                ["Show the technical aspects of the educational software (Energy -9)",
                 "Your detailed demonstration of the technical features resonates with their professional perspective."]
            ];
        } else if (encounterType === "military_veteran") {
            description = this.createElement('p', null, "You meet a military veteran who notices your disciplined demeanor. Their eyes light up when you mention your Air Force background.");
            options = [
                ["Share specific experiences from your military service (Energy -6)",
                 "You share stories from your Air Force days, creating an immediate bond of trust."],
                ["Discuss how military training helps in sales and business (Energy -7)",
                 "You explain how military discipline and adaptability transfer to entrepreneurship."],
                ["Connect military values to the educational products (Energy -8)",
                 "You relate military values like integrity and excellence to educational development."],
                ["Ask about their service and find common ground (Energy -5)",
                 "By showing genuine interest in their service, you build strong rapport before discussing products."],
                ["Explain how military cybersecurity relates to digital safety (Energy -7)",
                 "Your explanation of how cybersecurity principles apply to children's online safety resonates strongly."]
            ];
        } else {
            // Generic special encounter
            description = this.createElement('p', null, `You have a special encounter with a ${encounterType.replace('_', ' ')}. This unique opportunity could lead to a significant sale or valuable connection.`);
            options = [
                ["Focus on finding common ground and building rapport (Energy -6)",
                 "You establish a strong connection before discussing products."],
                ["Tailor your presentation to their specific situation (Energy -8)",
                 "Your customized presentation addresses their specific situation."],
                ["Share relevant aspects of your background (Energy -7)",
                 "Sharing relevant experiences helps establish credibility and trust."],
                ["Ask questions to understand their specific needs (Energy -5)",
                 "Your thoughtful questions help you understand exactly what they need."]
            ];
        }
        
        encounterDiv.appendChild(description);
        const optionsDiv = this.createElement('div', 'options');
        encounterDiv.appendChild(optionsDiv);
        
        // Special encounters have all options available
        options.forEach((option, index) => {
            const [optionText, resultText] = option;
            const button = this.createElement('button', null, `${index + 1}. ${optionText}`);
            
            button.addEventListener('click', () => {
                // Handle the choice
                const resultPara = this.createElement('p', null, resultText);
                optionsDiv.innerHTML = ''; // Clear options
                optionsDiv.appendChild(resultPara);
                
                // Handle specific encounter types
                this.handleSpecialEncounterResult(encounterType, optionText, optionsDiv);
                
                this.showStats(); // Update stats
                
                // Continue to next encounter after delay
                setTimeout(() => {
                    this.processEncounters(totalEncounters, currentEncounter + 1);
                }, 2500);
            });
            
            optionsDiv.appendChild(button);
        });
    }
    
    handleSpecialEncounterResult(encounterType, optionText, optionsDiv) {
        let saleChance = 0;
        let effects = {};
        
        // Handle each special encounter type
        if (encounterType === "gaming_enthusiast") {
            saleChance = 0.6; // High base chance due to shared interest
            
            if (optionText.includes("connect to game design")) {
                this.energy -= 8;
                this.skills.communication += 0.2;
                saleChance += 0.1;
            } else if (optionText.includes("problem-solving skills")) {
                this.energy -= 7;
                this.skills.product_knowledge += 0.2;
                saleChance += 0.15;
            } else if (optionText.includes("game prototype")) {
                this.energy -= 10;
                this.personal_growth += 1;
                saleChance += 0.25;
            } else if (optionText.includes("favorite games")) {
                this.energy -= 5;
                this.skills.communication += 0.3;
                saleChance += 0.2;
            } else if (optionText.includes("military and gaming")) {
                this.energy -= 6;
                this.skills.resilience += 0.2;
                saleChance += 0.1;
            } else {
                this.energy -= 8;
                saleChance -= 0.1;
            }
            
            if (Math.random() < saleChance) {
                const saleAmount = this.getRandomInt(250, 450);
                this.sales += saleAmount;
                const salePara = this.createElement('p', 'success', `Your gaming background creates an instant connection! They purchase ${saleAmount} worth of materials!`);
                optionsDiv.appendChild(salePara);
                
                // Bonus: Game design referrals
                if (Math.random() < 0.7) {
                    const referrals = this.getRandomInt(2, 5);
                    const referralPara = this.createElement('p', null, `They're so impressed that they give you ${referrals} referrals to other gaming families!`);
                    optionsDiv.appendChild(referralPara);
                    
                    for (let i = 0; i < referrals; i++) {
                        this.referrals.push("gaming_family");
                    }
                }
            } else {
                const noPurchasePara = this.createElement('p', null, "Though they enjoyed talking about gaming, they decide not to purchase today.");
                optionsDiv.appendChild(noPurchasePara);
                
                // Still might get a referral
                if (Math.random() < 0.3) {
                    const referralPara = this.createElement('p', null, "However, they do give you a referral to another family interested in gaming.");
                    optionsDiv.appendChild(referralPara);
                    this.referrals.push("gaming_family");
                }
            }
        } else if (encounterType === "cyber_professional") {