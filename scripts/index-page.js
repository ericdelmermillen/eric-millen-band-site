const nameInput = document.querySelector('#name');
const commentInput = document.querySelector('#comment');
const commentForm = document.getElementById("commentForm");
const commentBtn = document.getElementById("commentBtn");
const commentsArticle = document.querySelector(".comments__article")



function logForm(e) {
    e.preventDefault();
    console.log(`name: ${nameInput.value}, comment: ${commentInput.value}`)
    // commentInput.value = "";
}

// clear form
function clearForm(e) {
    e.preventDefault();
    nameInput.value = "";
    commentInput.value = "";
}


commentForm.addEventListener("submit", (e) => {
    logForm(e);
    clearForm(e);
});





















// const year = document.getElementById("year");
//     let currentYear = new Date().getFullYear();
//     year.textContent = currentYear;