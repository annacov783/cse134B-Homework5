

class InfoPanel extends HTMLElement {

    constructor() {
        super();

        //two sample items for Part 1
        this.items = [
            "Welcome! This portfolio highlights my background and interests.",
            "Explore my professional experience, skills, and responses to interview questions."
        ];

        this.currentIndex = 0;

        //create heading
        const heading = document.createElement("h2");
        heading.textContent = "Welcome to My Portfolio";

        //create content display
        this.display = document.createElement("p");

        //create status message
        this.status = document.createElement("p");
        this.status.setAttribute("role", "status");

        //create internal control
        const nextButton = document.createElement("button");
        nextButton.textContent = "Next Introduction";

        nextButton.addEventListener("click", () => {
            this.currentIndex =
                (this.currentIndex + 1) % this.items.length;

            this.updateDisplay();
        });

        //append elements
        this.appendChild(heading);
        this.appendChild(this.display);
        this.appendChild(nextButton);
        this.appendChild(this.status);

        //create portfolio sections
        const sections = [
            {
                title: "About",
                content: "This section introduces me, my background, and interests."
            },
            {
                title: "Resume",
                content: "This section summarizes my education, skills, and projects."
            },
            {
                title: "Interview Response Library",
                content: "This section contains interview questions and my prepared responses."
            }
        ];

        const pageInfoHeading = document.createElement("h2");
        pageInfoHeading.textContent = "Page Information";
        this.appendChild(pageInfoHeading);


        sections.forEach(section => {

            //create expandable section
            const details = document.createElement("details");
            

            const summary = document.createElement("summary");
            summary.textContent = section.title;

            const paragraph = document.createElement("p");
            paragraph.textContent = section.content;



            details.appendChild(summary);
            details.appendChild(paragraph);

            this.appendChild(details);
        });

        



        //Part 2
        //create API heading
        const apiHeading = document.createElement("h2");
        apiHeading.textContent = "Cat Facts";

        //create API button
        this.apiButton = document.createElement("button");
        this.apiButton.textContent = "Tell Me Something About Cats";

        

        this.apiDisplay = document.createElement("p");
        
        this.apiStatus = document.createElement("p");
        this.apiStatus.setAttribute("role", "status");

        this.apiButton.addEventListener("click", () => {
            this.loadCatFact();
        });

        //add API elements to component
        this.appendChild(apiHeading);
        this.appendChild(this.apiButton);
        this.appendChild(this.apiDisplay);
        this.appendChild(this.apiStatus);



        //display the initial sample item
        this.updateDisplay();
    }

    //update the displayed introduction and status
    updateDisplay() {

        this.display.textContent =
            this.items[this.currentIndex];

        this.status.textContent = `Introduction ${this.currentIndex + 1} of ${this.items.length}`;


    }

    //observe the compact attribute
    static get observedAttributes() {
        return ["compact"];
    }

    //respond when compact is added or removed
    attributeChangedCallback(name, oldValue, newValue) {

        if (name === "compact") {

            const sections = this.querySelectorAll("details");
            sections.forEach(section => {
                section.open = newValue === null;
            });
        }

        this.updateButtonLabel();
    }

    connectedCallback() {
        //restore preference after component is created
        this.restorePreference();
    }


    async loadCatFact() {

        //show loading message
        this.apiStatus.textContent = "Loading cat fact...";

        //disable button while requesting data
        this.apiButton.disabled = true;

        try {

            //send GET request to Cat Facts API
            const response = await fetch(
                "https://catfact.ninja/fact"
            );

            //check HTTP response
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }

            const data = await response.json();

            //validate fact field
            if (typeof data?.fact !== "string" ||
                data.fact.trim() === "") {

                throw new Error("Invalid API response.");
            }

            //display returned cat fact and update message
            this.apiDisplay.textContent = data.fact;
            this.apiStatus.textContent = "A new cat fact has been successfully loaded.";

        } catch (error) {
            //display error message
            this.apiStatus.textContent = "Unable to load cat fact. Check internet connection. Please try again.";
            console.error("Cat fact request failed:", error);

        } finally {
            //re-enable button after success or failure
            this.apiButton.disabled = false;
        }
    }



    //Part 3 - restore compact/expand preference from localStorage 
    restorePreference() {

        let savedMode = "compact";

        try {

            //test read error
            //throw new Error("Testing read failure");



            const storedMode = localStorage.getItem("hw5-info-panel-mode");

            if (storedMode === "compact" || storedMode === "expanded") {
                savedMode = storedMode;
            }

        } catch (error) {
            console.log("Could not read saved preference.");
        }

        //apply preference through observed attribute
        if (savedMode === "compact") {
            this.setAttribute("compact", "");
        } else {
            this.removeAttribute("compact");
        }
    }

    //handle button clicks
    toggleMode() {

        const sections = this.querySelectorAll("details");

        const anyCompacted = [...sections].some(section => !section.open);

        const newMode = anyCompacted ? "expanded" : "compact";

        //apply change immediately
        if (newMode === "compact") {
            this.setAttribute("compact", "");
        } else {
            this.removeAttribute("compact");
        }

        //save preference
        try {

            //test write error
            //throw new Error("Testing write failure");

            localStorage.setItem("hw5-info-panel-mode", newMode);
        } catch (error) {
            console.log("Could not save preference.");
        }
    }


    updateButtonLabel() {

        const button = document.querySelector("#toggleButton");

        if (button) {
            button.textContent = this.hasAttribute("compact")
                ? "Expand All Info"
                : "Compact All Info";
        }
    }



}

//register the custom HTML element
customElements.define("info-panel", InfoPanel);