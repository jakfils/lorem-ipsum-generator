const copyBtn = document.getElementById("copy-button");
const copyMessage = document.getElementById("copy-message");

// Function show message for n seconds
function showMessage(numberOfSeconds){
setTimeout((e) => {
    copyMessage.classList.add("invisible");
  }, numberOfSeconds*1000);
}
// Function copy to clipboard
function copyToClipboard() {
  let copyText = document.querySelector(".generated-content").textContent;
  navigator.clipboard.writeText(copyText)
}
// Show copy message
copyBtn.addEventListener("click", (e) => {
  copyMessage.classList.remove("invisible");
  copyToClipboard();
  showMessage(2)
});
