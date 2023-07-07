const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector("#browseBtn");
const fileLimit = 1 * 1024 * 1024;
browseBtn.addEventListener("click", ()=>{
    fileInput.click();
});

fileInput.addEventListener('click', (e)=>{
    //   console.log("dropped", e.dataTransfer.files[0].name);
    const files = fileInput.value;
     if (files.length > 1) {
      alert("File is already Uploaded");
    }
    
  })

  fileInput.addEventListener('change', (event) => {
    const target = event.target
        if (target.files && target.files[0]) {
  
        /*Maximum allowed size in bytes
          5MB Example
          Change first operand(multiplier) for your needs*/
        const maxAllowedSize = 5 * 1024 * 1024;
        if (target.files[0].size > maxAllowedSize) {
            // Here you can ask your users to load correct file
            alert("File is too big");
             target.value = ''
        }
    }
  })