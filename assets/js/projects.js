document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projectsContainer");
  const projectModal = document.getElementById("projectModal");
  const closeModalButton = document.getElementById("closeModalButton");

  // Fetch projects from server and render them
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/projects");
      const data = await response.json();

      // Clear previous projects
      projectsContainer.innerHTML = "";

      // Map through each project and render its card
      data.forEach((project) => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Function to create a project card
  const createProjectCard = (project) => {
    const card = document.createElement("div");
    card.classList.add("bg-gray-700", "rounded-lg", "border", "p-4");

    card.innerHTML = `
            <img src="${project.thumbnail}" alt="${project.title}" class="w-full h-48 rounded-md object-cover" />
            <div class="flex flex-col gap-4 justify-center items-center">
                <h1 class="text-white text-2xl text-center mt-3">${project.title}</h1>
                <span class="text-white text-center">${project.description}</span>
                <button class="open-modal-btn bg-[#D6D6D6] text-gray-900 font-bold" data-id="${project._id}">See Details</button>
            </div>
        `;

    // Add event listener for modal button
    const modalButton = card.querySelector(".open-modal-btn");
    modalButton.addEventListener("click", () => openModal(project));

    return card;
  };

  // Function to open the modal with project details
  const openModal = (project) => {
    const modalTitleText = document.getElementById("modalTitleText");
    const modalDescriptionText = document.getElementById(
      "modalDescriptionText"
    );
    const modalTechnologies = document.getElementById("modalTechnologies");
    const modalLinksContainer = document.getElementById("modalLinksContainer");

    // Set the modal content dynamically
    modalTitleText.textContent = project.title;
    modalDescriptionText.innerHTML = `
            <div class="flex gap-3 items-center text-md md:text-xl lg:text-xl">
                <ion-icon name="checkmark-circle" class="text-md md:text-3xl lg:text-3xl text-green-600"></ion-icon>
                ${project.feature1}
            </div>
            <div class="flex gap-3 items-center text-md md:text-xl lg:text-xl">
                <ion-icon name="checkmark-circle" class="text-md md:text-3xl lg:text-3xl text-green-600"></ion-icon>
                ${project.feature2}
            </div>
            <div class="flex gap-3 items-center text-md md:text-xl lg:text-xl">
                <ion-icon name="checkmark-circle" class="text-md md:text-3xl lg:text-3xl text-green-600"></ion-icon>
                ${project.feature3}
            </div>
            <div class="flex gap-3 items-center text-md md:text-xl lg:text-xl">
                <ion-icon name="checkmark-circle" class="text-md md:text-3xl lg:text-3xl text-green-600"></ion-icon>
                ${project.feature4}
            </div>
        `;

    // Set technologies used
    modalTechnologies.innerHTML = `
    <div class="flex flex-wrap gap-2">
        <span class="font-bold">Technologies used:</span>
        <span class="bg-sky-400 px-4 py-2 rounded-lg text-gray-900 font-bold">${project.tech1}</span>
        <span class="bg-sky-400 px-4 py-2 rounded-lg text-gray-900 font-bold">${project.tech2}</span>
        <span class="bg-sky-400 px-4 py-2 rounded-lg text-gray-900 font-bold">${project.tech3}</span>
        <span class="bg-sky-400 px-4 py-2 rounded-lg text-gray-900 font-bold">${project.tech4}</span>
    </div>
`;

    // Set links for GitHub and Live Site
    modalLinksContainer.innerHTML = `
            <a href="${project.githubLink}" target="_blank" class="bg-[#ffdb70] flex gap-2 justify-center items-center text-md md:text-xl lg:text-xl bg-gray-700 p-3 rounded-lg text-white">
                <ion-icon name="logo-github" class="text-lg md:text-3xl lg:text-3xl"></ion-icon>
                Github Repository
            </a>
            <a href="${project.liveLink}" target="_blank" class="flex gap-2 justify-center items-center text-md md:text-xl lg:text-xl bg-sky-600 p-3 rounded-lg text-white">
                <ion-icon name="globe-outline" class="text-lg md:text-3xl lg:text-3xl"></ion-icon>
                Live Site
            </a>
        `;

    // Show the modal
    projectModal.classList.remove("hidden");
  };

  // Function to close the modal
  closeModalButton.addEventListener("click", () => {
    projectModal.classList.add("hidden");
  });

  // Polling: Fetch projects every 1 second
  setInterval(fetchProjects, 1000);

  // Initial fetch
  fetchProjects();
});
