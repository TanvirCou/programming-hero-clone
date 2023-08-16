const milestonesData = JSON.parse(data).data;

function loadMilestones() {
  const milestones = document.querySelector('.milestones');

  milestones.innerHTML = `${milestonesData.map(milestone => {
    return `<div class="milestone border-b" id="${milestone._id}">
        <div class="flex">
          <div class="checkbox"><input type="checkbox" onclick="markMilestone(this, ${milestone._id})" /></div>
          <div onclick="openMilestone(this, ${milestone._id})">
            <p>
              ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">
          ${milestone.modules.map(module => {
      return `<div class="module border-b">
            <p>${module.name}</p>
          </div>`
    }).join("")}
        </div>
      </div>`
  }).join("")}`
}

function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector('.show');
  const activePanel = document.querySelector('.active');

  if (!milestoneElement.classList.contains('active') && activePanel) {
    activePanel.classList.remove('active')
  }
  milestoneElement.classList.toggle('active');

  if (!currentPanel.classList.contains('show') && shownPanel) {
    shownPanel.classList.remove('show');
  }
  currentPanel.classList.toggle('show');

  showMilestone(id);
}

function showMilestone(id) {
  const milestoneImage = document.querySelector('.milestoneImage');
  const milestoneName = document.querySelector('.title');
  const milestoneDetails = document.querySelector('.details');

  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  milestoneName.innerText = milestonesData[id].name;
  milestoneDetails.innerText = milestonesData[id].description;
}

const milestoneImage = document.querySelector('.milestoneImage');
milestoneImage.onload = function () {
  this.style.opacity = "1";
}

function markMilestone(checkbox, id) {
  const doneList = document.querySelector('.doneList');
  const milestoneList = document.querySelector('.milestones');

  const item = document.getElementById(id);

  if (checkbox.checked) {
    milestoneList.removeChild(item);
    doneList.appendChild(item);
  } else {
    doneList.removeChild(item);
    milestoneList.appendChild(item);

    const modules = document.querySelectorAll('.milestones .milestone');
    console.log(modules);
    let listItem = [];
    modules.forEach(module => listItem.push(module));
    listItem.sort((a, b) => a.id - b.id);
    listItem.forEach(item => milestoneList.appendChild(item));
  }
}

loadMilestones();

