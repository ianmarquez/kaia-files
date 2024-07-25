//! -------------------------------------- Word Count -------------------------------------- //
function wordCount() {
  document
    .querySelector("#Project-Description")
    .addEventListener("keyup", function() {
      var charCount = this.value.length;
      document.querySelector("#description-word-count").innerHTML = charCount;

      // Prevent user from entering more than 2000 characters
      if (charCount > 2000) {
        this.value = this.value.substring(0, 2000);
        document.querySelector("#description-word-count").innerHTML = 2000; // Update the character count display
      }
    });

  document
    .querySelector("#Project-Contract-Address-es")
    .addEventListener("keyup", function() {
      var charCount = this.value.length;
      document.querySelector("#addresses-word-count").innerHTML = charCount;

      // Prevent user from entering more than 2000 characters
      if (charCount > 2000) {
        this.value = this.value.substring(0, 2000);
        document.querySelector("#addresses-word-count").innerHTML = 2000; // Update the character count display
      }
    });
}

//! -------------------------------------- Submit Form -------------------------------------- //
function submitForm() {
  var form = document.querySelector("#wf-form-Project-Submission");
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Target checkboxes by their specific name attributes or a class if they have one

    var checkboxes = form.querySelectorAll(".select-checkbox");
    var checkboxesArray = Array.from(checkboxes); // Convert NodeList to Array

    checkboxesArray.forEach(function(checkbox) {
      if (checkbox.checked) {
        let siblingText = checkbox.nextElementSibling.innerText;
        checkbox.value = siblingText;
      }
    });

    // Debug: Log the FormData to see what's being submitted. Remove this in production.
    var formData = new FormData(form);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log(formData);
    // Submit the form
    //		form.submit();
  });
}

function replaceFormSubmissionRadioButtons() {
  const radioButtons = gsap.utils.toArray(document.querySelectorAll('.select-item-radio'))
  radioButtons.forEach(button => {
    const newRadioButtonVal = button.getAttribute('value-replaced')
    const [input] = gsap.utils.toArray(button.children)
    if (newRadioButtonVal) {
      input.setAttribute('value', newRadioButtonVal)
    }
  })
}

function addSocialsDropdownEventListener() {
  let dropdownOpen = false;
  let currentSocialIndex
  let visibleFields = 0;

  const addButton = document.getElementById('add-option')
  const dropdown = document.querySelector('.text-input-field.dropdown')
  const [dropdownItemsContainer, label, icon] = gsap.utils.toArray(dropdown.children)
  const [dropdownItemList] = gsap.utils.toArray(dropdownItemsContainer.children)
  const inputs = gsap.utils.toArray(document.querySelector('.socials-input-div').children)
  const dropdownItems = gsap.utils.toArray(dropdownItemList.children)
  const removeButtons = gsap.utils.toArray('.remove-button')

  const timeline = gsap.timeline({ paused: true })
    .to(dropdownItemsContainer, {
      height: 'auto',
      duration: 0.3,
      zIndex: 5
    })
    .to(icon, {
      rotate: 180
    }, "<")


  const onDropdownClick = (event) => {
    event.stopPropagation()
    if (visibleFields === dropdownItems.length) return
    if (dropdownOpen) {
      dropdownOpen = false
      return timeline.reverse()
    }
    dropdownOpen = true
    return timeline.play()
  }

  const onAddButtonClick = (event) => {
    if (currentSocialIndex !== undefined) {
      label.innerText = 'community'
      dropdownItems[currentSocialIndex].style.display = 'none'
      visibleFields += 1
      gsap.to(inputs[currentSocialIndex], {
        display: 'flex',
        duration: 0.3
      })
      currentSocialIndex = undefined
    }
  }

  const onDropdownItemClick = (event, index, text) => {
    event.stopPropagation()
    label.innerText = text
    timeline.reverse();
    currentSocialIndex = index
    dropdownOpen = false
  }

  const onDeleteButtonClick = (event, index) => {
    event.stopPropagation()
    visibleFields -= 1
    dropdownItems[index].style.display = 'block'
    inputs[index].style.display = 'none'
    const [_, input] = gsap.utils.toArray(inputs[index].children)
    if (!input.value) {
      input.value = ''
    }
  }

  removeButtons.forEach((removeBtn, idx) => {
    removeBtn.addEventListener('click', (event) => {
      onDeleteButtonClick(event, idx)
    })

  })

  dropdownItems.map((dropdownItem, idx) => {
    dropdownItem.addEventListener('click', (event) => {
      onDropdownItemClick(event, idx, dropdownItem.innerText)
    })
  })
  dropdown.addEventListener('click', onDropdownClick)
  addButton.addEventListener('click', onAddButtonClick)
  document.addEventListener('click', () => {
    timeline.reverse();
  })
}

function ProjectSubmission() {
  replaceFormSubmissionRadioButtons()
  const fileUploadsText = $(".w-file-upload-label .secondary-button-text");
  const uploadInfoText = $(".w-file-upload-info");
  fileUploadsText.map((i, el) => {
    el.innerText = "Attach A File";
  });
  uploadInfoText.map((i, el) => {
    el.innerText = "NO FILE ATTACHED";
    el.style.color = "var(--greyscale--fg--neutral)";
  });
  addSocialsDropdownEventListener()

  wordCount();
  submitForm();
}

$(document).ready(ProjectSubmission);
