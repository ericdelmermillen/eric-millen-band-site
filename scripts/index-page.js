// You must append ?api_key=<your_api_key_here> to each of your API request URLs (except for /register)

// e.target.name.value = "";
// e.target.comment.value = "";

const BASE_URL = "https://project-1-api.herokuapp.com/";
const API_KEY = "api9536be29-b9d2-4068-bda0-2547f8adea65";

const headers = {
    'Content-Type': 'application/json'
};


// getComments
function getComments() {
    axios
        .get(`${BASE_URL}comments?api_key=${API_KEY}`)
        .then(response => {
            const commentsArr = createCommentElemArray(response.data);

            loadComments(commentsArr);

            // Event Listener on like Buttons
            document.querySelectorAll(".fa-heart").forEach((heartIcon) => {
                heartIcon.addEventListener("click", (e) => {

                let comment = { "id": e.currentTarget.closest(".comment").id}

                incrementLike(comment);
            });
        });
    })
    .catch(error => console.error(error));
}

function incrementLike(comment) {
    axios.put(`${BASE_URL}comments/${comment.id}/like?api_key=${API_KEY}`, null,{headers})
    .then(response => {

        updateLikeInnerText(response.data.id)
    })
    .catch(error => console.error(error));
}


function updateLikeInnerText(commentId) {
    const comments = document.querySelectorAll(".comment");

    comments.forEach(comment => {
        if(comment.id === commentId) {
            comment.children[1].children[2].children[1].children[0].innerText++
            console.log(comment.children[1].children[2].children[1].children[0].innerText);
        }
    });

}


// createComments array
function createCommentElemArray(comments) {

    let sortedComments = comments.sort((x, y) => y.timestamp - x.timestamp)

    const commentElems = sortedComments.map((comment) => {
        let image = comment.image || "./assets/images/user-placeholder.png";
        
        // create comment div
        const commentDiv = document.createElement("div");
        commentDiv.setAttribute("class", "comment");
        commentDiv.setAttribute("id", comment.id);
        
        // create comment-avatar__container div
        const commentAvatar__container = document.createElement("div");
        commentAvatar__container.setAttribute("class", "comment-avatar__container");
        
        commentDiv.appendChild(commentAvatar__container)
        
        // create comment__avatar img
        const commentAvatar = document.createElement("img");
        commentAvatar.setAttribute("class", "comment__avatar");
        commentAvatar.setAttribute("src", image);

        commentAvatar__container.appendChild(commentAvatar)

        // create comment__text div
        const commentText = document.createElement("div");
        commentText.setAttribute("class", "comment__text");

        commentDiv.appendChild(commentText);

        // create comment__header      
        const commentHeader = document.createElement("div");
        commentHeader.setAttribute("class", "comment__header");
        commentText.appendChild(commentHeader);
        
        // create comment__heading *need to rename to comment__heading--name(?)
        const comment__heading = document.createElement("p");
        comment__heading.setAttribute("class", "comment__heading");
        comment__heading.innerText = comment.name.length < 30 ? comment.name : comment.name.slice(0, 40)+"..."
        
        commentHeader.appendChild(comment__heading);
        
        // create comment__time-stamp *need to rename to comment__heading--date(?)
        const commentTimeStamp = document.createElement("p");
        commentTimeStamp.setAttribute("class", "comment__time-stamp");
        commentTimeStamp.innerText = new Date(comment.timestamp).toLocaleDateString(
            "en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
                });
        
        commentHeader.append(commentTimeStamp);
        
        // create comment__body
        const commentBody = document.createElement("p");
        
        function breakLongWords(comment) {
            commentBody.setAttribute("class", "comment__body");

            let longestWordLength = comment
                .split(" ")
                .sort((x, y) => y.length - x.length)[0]
                .length;

            if(longestWordLength > 30) {
                commentBody.classList.add("break-word");
            }
        }

        breakLongWords(comment.comment)

        commentBody.innerText = comment.comment;

        commentText.appendChild(commentBody);
        
        //  delete & heart container
        const commentSocials = document.createElement("div");
        commentSocials.setAttribute("class", "comment__socials")


        // delete icon
        const commentDeleteIcon = document.createElement("i");
        commentDeleteIcon.setAttribute("class", "comment__icon--delete")
        commentDeleteIcon.classList.add("fa")
        commentDeleteIcon.classList.add("fa-times-circle")

        commentSocials.appendChild(commentDeleteIcon);


        // heart icon
        const commentLike = document.createElement("i");
        commentLike.setAttribute("class", "comment__icon--heart")
        commentLike.classList.add("fa")
        commentLike.classList.add("fa-heart")
        
        
        // like count
        const commentLikeCount = document.createElement("span");
        commentLikeCount.setAttribute("class", "comment__like-count")
        commentLikeCount.innerText = comment.likes;
        // *** add return of request here

        commentLike.appendChild(commentLikeCount);

        commentSocials.appendChild(commentLike);

        commentText.appendChild(commentSocials);

        return commentDiv;
    })

    // commentElems.forEach(elem => console.log(elem.innerHTML))
    return commentElems
}


// called after creating new comment
function loadComments(commentsArr) {
    const commentsArticle = document.querySelector(".comments__article");

// clear inputs: refactor to use clearFormInputs()
    document.querySelector('#name').value = "";
    document.querySelector('#comment').value = "";
    
// clear commentsArticle
    commentsArticle.innerHTML = "";
    
    commentsArr.forEach(comment => commentsArticle.appendChild(comment));
}

function checkNameMinMax(e) {
    const minMaxWarningName = document.getElementById("minMaxWarningName");
    
    if(e.target.name.value.trim().length < 2) {
        minMaxWarningName.innerText = "MIN CHARACTERS: 2!";
        return;
    } else if (e.target.name.value.trim().length >= 2 && e.target.name.value.trim().length <= 50) {
        minMaxWarningName.innerText = "";

    } else if (e.target.name.value.trim().length > 50) {
        minMaxWarningName.innerText = "MAX CHARACTERS: 50!";
        return;
    }
    return true
}

function checkCommentMinMax(e) {
    const minMaxWarningText = document.getElementById("minMaxWarningText");
    
    if (e.target.comment.value.trim().length < 100) {
        minMaxWarningText.innerText = "MIN CHARACTERS: 100!";
        return;
    } else if (e.target.comment.value.trim().length >= 100 && e.target.comment.value.trim().length <= 500) {
        minMaxWarningText.innerText = "";

    } else if (e.target.comment.value.trim().length > 500) {
        minMaxWarningText.innerText = "MAX CHARACTERS: 500!";
        return;
    }
    return true;
}


// Event Listener on Comment Button
commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const commentBtn = document.getElementById("commentBtn");
    
    checkNameMinMax(e) && checkCommentMinMax(e) && createNewComment(e) 
    
    commentBtn.classList.add("disable-pointer");
    
    getComments();
});

// Creates new comment in commentArray
function createNewComment(e) {
    const newComment = {"name": e.target.name.value, "comment": e.target.comment.value};

    axios.post(`${BASE_URL}comments?api_key=${API_KEY}`, newComment, {headers})
    .then(response => {
        getComments();
        commentBtn.classList.remove("disable-pointer");
    })
    .catch(error => console.error(error));
}


// Year for the copyright in the footer
const year = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    year.textContent = currentYear;


getComments();