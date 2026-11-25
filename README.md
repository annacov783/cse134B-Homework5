

The two pages selected for Part 4 are home page (/ssg-exercise/astro-ssg/src/pages/index.astro) and 
resume page (/ssg-exercise/astro-ssg/src/pages/resume.astro).

From within /ssg-exercise/astro-ssg folder, run the commands:

Install Dependencies:
npm install

Build Website:
npm run build

Preview:
npm run preview


Design Note:

The vistor's goal would be to obtain new information from the website using the button on the page. The user navigates to the button related to cat facts and clicks it, creating an API request. An HTTP request is sent to the API. While the request is processing, the space below the button says "Loading cat fact...". Once the request has processed successfully, the fact is displayed below the button, then the success message: "A new cat fact has been successfully loaded.". To successfully process the request and display the data, the program parses the JSON data received in the API response, then updates page content with the cat fact. This causes the DOM to update. If the request fails, an error message is displayed: "Unable to load cat fact. Check internet connection. Please try again.". 