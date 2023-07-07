
const copyURLBtn = document.querySelector("#copyURLBtn");
const fileURL = document.querySelector("#fileURL");

// sharing container listenrs


copyURLBtn.addEventListener("click", () => {
  
  fileURL.select();
   // Copy the text inside the text field
   navigator.clipboard.writeText(fileURL.value);

   // Alert the copied text
   alert("Copied the Link: ");
});


