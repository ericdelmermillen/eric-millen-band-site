
let comments = [
    {
        avatar__image: "",
        comment__heading: "Connor Walton",
        time_stamp: "02/17/2021",
        comment__body: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what is is and what it contains"
    },
    {
        avatar__image: "",
        comment__heading: "Emilie Beach",
        time_stamp: "01/09/2021",
        comment__body: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        avatar__image: "",
        comment__heading: "Miles Acosta",
        time_stamp: "12/20/2020",
        comment__body: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
]

function updateComments() {
    const commentsArticle = document.querySelector(".comments__article")

    commentsArticle.innerHTML = "";
    
    createComment(comments).forEach(comment => commentsArticle.appendChild(comment));
}

function createNewComment(e) {
    

    let newComment = {
        avatar__image: "",
        comment__heading: e.target.name.value,
        time_stamp: new Date().toLocaleDateString(
            "en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"}
        ),
        comment__body: e.target.comment.value
    }
    comments.unshift(newComment)
}


// clear form
function clearForm() {
    // nameInput.value = "";
    // e.target.name.value = "";
    document.querySelector('#name').value = "";
    document.querySelector('#comment').value = "";
}


// creating a comment
function createComment (commentsObj) {
    
    let commentsArr = commentsObj.map((com) => {

        const comment = document.createElement("div");
        comment.setAttribute("class", "comment");
        
        const commentAvatar__container = document.createElement("div");
        commentAvatar__container.setAttribute("class", "comment-avatar__container");
        
        comment.appendChild(commentAvatar__container);
        
        const commentAvatar = document.createElement("img");
        commentAvatar.setAttribute("class", "comment__avatar");
        commentAvatar.setAttribute("src", com.avatar__image);
        
        commentAvatar__container.appendChild(commentAvatar);
        
        const commentText = document.createElement("div");
        commentText.setAttribute("class", "comment__text");
        comment.appendChild(commentText);
        
        const commentHeader = document.createElement("div");
        commentHeader.setAttribute("class", "comment__header");
        commentText.appendChild(commentHeader);
        
        const comment__heading = document.createElement("h3");
        comment__heading.setAttribute("class", "comment__heading");
        comment__heading.innerText = com.comment__heading;
        
        commentHeader.appendChild(comment__heading);
        
        const commentTimeStamp = document.createElement("p");
        commentTimeStamp.setAttribute("class", "comment__time-stamp");
        commentTimeStamp.innerText = com.time_stamp;
        
        commentHeader.append(commentTimeStamp)
        
        const commentBody = document.createElement("p");
        commentBody.setAttribute("class", "comment__body");
        commentBody.innerText = com.comment__body;

        commentText.appendChild(commentBody)

        return comment;
    })

    return commentsArr;
}
    

// Call updateComments on page load after dom centents loaded
window.addEventListener("DOMContentLoaded", updateComments);

commentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(e.target.name.value)
    createNewComment(e)
    updateComments();
    clearForm();
});


const year = document.getElementById("year");
    let currentYear = new Date().getFullYear();
    year.textContent = currentYear;
