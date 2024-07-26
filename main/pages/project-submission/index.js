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


function validateRequiredFieldTextBox(id) {
  const formControl = document.getElementById(id)
  let input = formControl.querySelector('input')
  if (!input) {
    input = formControl.querySelector('textarea')
  }
  const errorDiv = formControl.querySelector('.error-container')
  if (input.value && input.value.length > 0) {
    gsap.to(errorDiv, {
      display: 'none'
    })
    $(formControl).removeClass('has-error')
    return true;
  }
  gsap.timeline()
    .to(errorDiv, {
      display: 'flex'
    }).to(errorDiv.children, {
      display: 'flex'
    }, '<')
  $(formControl).addClass('has-error')
  return false
}

function validateValidUrl(formControl) {
  let input = formControl.querySelector('input')
  let isValid = true;
  const errorDiv = formControl.querySelector('.error-container')
  const [_, required] = gsap.utils.toArray(errorDiv.children)

  try {
    new URL(input.value)
  } catch (err) {
    isValid = false
  }

  if (isValid) {
    gsap.to(errorDiv, {
      display: 'none'
    })
    $(formControl).removeClass('has-error')
    return true;
  }

  gsap.timeline()
    .to(errorDiv, {
      display: 'flex'
    })
    .to(required, {
      display: 'none'
    })
  $(formControl).addClass('has-error')
}

function validateRequiredRadio(id) {
  const formControl = document.getElementById(id)
  const inputs = gsap.utils.toArray(formControl.querySelectorAll('input'))
  let input;
  const errorDiv = formControl.querySelector('.error-container')
  let hasChecked = false;
  inputs.map(radio => {
    if (radio.checked) {
      hasChecked = true
      input = radio
    }
  })
  if (hasChecked) {
    gsap.to(errorDiv, {
      display: 'none'
    })
    $(formControl).removeClass('has-error')
    return true;
  }
  $(formControl).addClass('has-error')
  gsap.to(errorDiv, {
    display: 'flex'
  })
  return false
}


function validateProjectName() {
  return validateRequiredFieldTextBox("project-name")
}

function validateProjectCategory() {
  return validateRequiredRadio('project-category')
}

function validateProjectDescription() {
  return validateRequiredFieldTextBox('project-description')
}

function validateProjectContractAddress() {
  return validateRequiredFieldTextBox('project-contract-address')
}

function validateProjectWebsite() {
  const requireCheck = validateRequiredFieldTextBox('project-website')
  if (!requireCheck) return requireCheck
  const formControl = document.getElementById('project-website')
  return validateValidUrl(formControl)
}

function validateProjectTelegramId() {
  const formControl = document.getElementById('telegram-id')
  const requireCheck = validateRequiredFieldTextBox('telegram-id')
  if (!requireCheck) return requireCheck
  return validateValidUrl(formControl)
}

function validateSocials() {
  let isValid = 0
  const socialsFormControls = gsap.utils.toArray('.socials-input-container')
  socialsFormControls.map(formControl => {
    const input = formControl.querySelector('input')
    if (input.value && input.value.length > 0) {
      const result = validateValidUrl(formControl) ? 0 : 1
      isValid += result
    }
  })
  return isValid
}

function validateCheckbox() {
  const formControl = document.querySelector('.check-box-container')
  const errorDiv = formControl.querySelector('.error-container')
  const input = formControl.querySelector('input')

  if (input.checked) {
    gsap.to(errorDiv, {
      display: 'none'
    })
    $(formControl).removeClass('has-error')
    return true;
  }

  console.log(errorDiv)
  gsap.to(errorDiv, {
    display: 'flex'
  })
  $(formControl).addClass('has-error')

  return false;
}

function attachValidationToForm() {
  const fauxSubmitButton = document.getElementById('faux-submit-button')
  const realSubmitButton = document.getElementById('real-submit-button')


  fauxSubmitButton.addEventListener('click', () => {
    let isValid = 0;

    isValid += validateProjectName() ? 0 : 1;
    isValid += validateProjectCategory() ? 0 : 1;
    isValid += validateProjectDescription() ? 0 : 1;
    isValid += validateProjectContractAddress() ? 0 : 1;
    isValid += validateProjectWebsite() ? 0 : 1;
    isValid += validateSocials()
    isValid += validateProjectTelegramId() ? 0 : 1;
    isValid += validateCheckbox() ? 0 : 1;

    if (isValid > 0) {
      const formItemWithErr = document.querySelector(".has-error")
      formItemWithErr?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return;
    }

    realSubmitButton.click()
  })
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
  let currentSocialIndex = 0
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

  const onAddButtonClick = () => {
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
    event?.stopPropagation()
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
  onAddButtonClick()
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

  gsap.to('.error-container', { display: "none" })

  addSocialsDropdownEventListener()
  wordCount();
  attachValidationToForm();
}

$(document).ready(ProjectSubmission);
