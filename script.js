document.addEventListener("DOMContentLoaded",function(){

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLevel= document.getElementById("easy-label");
    const mediumLevel= document.getElementById("medium-label");
    const hardLevel= document.getElementById("hard-label");
    const statsCard = document.querySelector(".stats-card");


    function validateuserName(userName){
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/;
        if(userName.trim ===""){
            alert("Username should not be empty");
            return false;
        }
        
        // Regular expression for valid usernames
        
        else if (!usernameRegex.test(userName)) {
            alert("Invalid username.");
            return false;
        }
        return true;
    };


    async function fetchUserDetails(userName){
        const url =`https://leetcode-stats-api.herokuapp.com/${userName}`;

        try{

            searchButton.textContent="Searching";
            searchButton.disable = true;
            

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the user details");
            }
            const data = await response.json();
            console.log("Logging Data", data);
            displayUserdata(data);
        }
        catch(Error){
            statsContainer .innerHTML =`<p>${Error.message}</p>`;
        }
        finally{
            searchButton.textContent ="Search";
            searchButton.disable=false;

        }

    }


    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserdata(data){
        const totalQuestion = data.total_Questions;
        const totalEasyQuestion = data.totalEasy;
        const totalMediumQuestion = data.totalMedium;
        const totalHardQuestion = data.totalHard;

        const totalSolvedQuestion = data.totalSolved;
        const totalEasySolvedQuestion = data.easySolved;
        const totalMediumSolvedQuestion = data.mediumSolved;
        const totalHardSolvedQuestion = data.hardSolved;

        updateProgress(totalEasySolvedQuestion, totalEasyQuestion, easyLevel,easyProgressCircle);
        updateProgress(totalMediumSolvedQuestion, totalMediumQuestion, mediumLevel,mediumProgressCircle);
        updateProgress(totalHardSolvedQuestion, totalHardQuestion, hardLevel,hardProgressCircle);


        const cardData =[
            {label:" Total Acceptance rate: ", value: data.acceptanceRate},
            {label: "Ranking: ", value: data.ranking},
            {label: "Contribution Points", value: data.contributionPoints},
            {label: "Your Reputation", value: data.reputation}
    
        ];
        console.log(cardData);
        statsCard.innerHTML = cardData.map(
            data => 
                    `<div class="card">
                    <h4>${data.label}</h4>
                    <p>${data.value}</p>
                    </div>`
        ).join("")

    }

    searchButton.addEventListener('click',function(){
        const userName = usernameInput.value;
        console.log("Logging UserName: ", userName);
        if(validateuserName(userName)){
            fetchUserDetails(userName);
        }
    })







})