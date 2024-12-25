// Fetching skills
document.addEventListener("DOMContentLoaded", () => {
  const skillsListContainer = document.getElementById("skills-list");

  // Function to fetch skills from the API endpoint
  const fetchSkills = () => {
    fetch("https://portfolio-server-nine-theta.vercel.app/skills", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const skills = data; // The array of skill objects

        // Clear the container before appending new skills
        skillsListContainer.innerHTML = "";

        // Function to create the skill item HTML structure
        function createSkillItem(skill) {
          const skillItem = document.createElement("li");
          skillItem.classList.add("skills-item");

          const skillDiv = document.createElement("div");
          skillDiv.classList.add(
            "react",
            "bg-gray-700",
            "flex",
            "flex-col",
            "gap-2",
            "justify-center",
            "items-center",
            "py-3",
            "rounded-lg"
          );

          const skillSpan = document.createElement("span");
          skillSpan.classList.add("font-bold", "text-white");
          skillSpan.textContent = skill.skill; // Accessing the skill name from the object

          // Append span to div
          skillDiv.appendChild(skillSpan);
          // Append div to list item
          skillItem.appendChild(skillDiv);

          return skillItem;
        }

        // Loop through skills and render them
        skills.forEach((skill) => {
          const skillItem = createSkillItem(skill);
          skillsListContainer.appendChild(skillItem);
        });
      })
      .catch((error) => console.error("Error fetching skills:", error));
  };

  // Polling: Fetch skills every 1 second
  setInterval(fetchSkills, 1000);

  // Initial fetch
  fetchSkills();
});

// Fetching experiences
document.addEventListener("DOMContentLoaded", () => {
  // Server endpoint to fetch experiences
  const endpoint = "https://portfolio-server-nine-theta.vercel.app/experience";

  // Function to fetch and render experiences
  const fetchExperiences = () => {
    fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch experiences");
        }
        return response.json();
      })
      .then((data) => {
        renderTimeline(data);
      })
      .catch((error) => {
        console.error("Error fetching experiences:", error);
      });
  };

  // Function to render timeline items
  const renderTimeline = (experiences) => {
    const timelineList = document.querySelector(".timeline-list");
    timelineList.innerHTML = ""; // Clear previous items if any

    experiences.forEach((experience) => {
      const timelineItem = document.createElement("li");
      timelineItem.classList.add("timeline-item");

      timelineItem.innerHTML = `
          <h4 class="h4 timeline-item-title">${experience.companyName}</h4>
          <span>${experience.joinDate} - ${experience.endDate}</span>
          <p class="timeline-text mt-2">${experience.description}</p>
        `;

      // Optional: Add a visit link if available
      if (experience.profileLink) {
        const link = document.createElement("a");
        link.href = experience.profileLink;
        link.target = "_blank";
        link.textContent = "Visit Profile";
        link.classList.add(
          "text-white",
          "bg-gray-700",
          "p-2",
          "mt-3",
          "text-center",
          "rounded-lg",
          "w-[50%]",
          "md:w-[25%]",
          "lg:w-[25%]"
        );
        timelineItem.appendChild(link);
      }

      timelineList.appendChild(timelineItem);
    });
  };

  // Polling: Fetch experiences every 1 second
  setInterval(fetchExperiences, 1000);

  // Initial fetch
  fetchExperiences();
});
