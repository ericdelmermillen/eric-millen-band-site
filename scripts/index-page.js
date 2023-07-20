
// You must append ?api_key=<your_api_key_here> to each of your API request URLs (except for /register)

// e.target.name.value = "";
// e.target.comment.value = "";

// ** environment variables get caps names

const BASE_URL = "https://project-1-api.herokuapp.com/";
const API_KEY = "api9536be29-b9d2-4068-bda0-2547f8adea65";

const headers = {
    'Content-Type': 'application/json'
};



// getComments
function getComments() {
    axios.get(`${BASE_URL}comments?api_key=${API_KEY}`)
    .then(response => {
        
        const commentsArr = createCommentElemArray(response.data);

        loadComments(commentsArr);
    })
    .catch(error => console.error(error));
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
        comment__heading.innerText = comment.name.length < 30 ? comment.name : comment.name.slice(0, 30)+"..."
        
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
                .sort((x, y) => y.length - x.length)[0].length;

            if(longestWordLength > 30) {
                commentBody.classList.add("break-word");
                commentBody.classList.add(`longest-word-length:${longestWordLength}`)
            }
        }

        breakLongWords(comment.comment)

        commentBody.innerText = comment.comment;

        commentText.appendChild(commentBody);

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


// Event Listener on Comment Button
commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // rule for name validation: outline on name input; span with message ?
    (e.target.name.value.trim().length < 2 || 
    e.target.name.value.trim().length > 50 || 
    // rule for comment validation: outline on name input; span with message ?
    e.target.comment.value.trim().length < 100 || 
    e.target.comment.value.trim().length > 500)

    // console.log(e.target.name.value)

        ? (alert("Name must be between 2-50 characters.\nComment must be between 100-500 characters."))
        : (createNewComment(e), getComments());

        //   (*** Does the createNewComment call need to be a promise since we don't know when it will return?)
});

// Creates new comment in commentArray
function createNewComment(e) {

    const newComment = {"name": e.target.name.value, "comment": e.target.comment.value};

    axios.post(`${BASE_URL}comments?api_key=${API_KEY}`, newComment, {headers})
    .then(response => {
        console.log(response)

        getComments();
    })
    .catch(error => console.error(error));

    
    // (***)needs to make post request to comment end point
    // --> .catch handles error; call errorOnCreateComment
}

// called after creating new comment
// function updateComments() {
//     const commentsArticle = document.querySelector(".comments__article");

//     // clear inputs
//     document.querySelector('#name').value = "";
//     document.querySelector('#comment').value = "";
    
//     // clear commentsArticle

//     commentsArticle.innerHTML = "";
    
//     createCommentElemArray(commentsArray).forEach(comment => commentsArticle.appendChild(comment));
// }

// creating the comment array
// function createCommentElemArray(commentsObj) {
    
//     const commentsArr = commentsObj.map((commentElem) => {

//         const comment = document.createElement("div");
//         comment.setAttribute("class", "comment");
        
//         const commentAvatar__container = document.createElement("div");
//         commentAvatar__container.setAttribute("class", "comment-avatar__container");
        
//         comment.appendChild(commentAvatar__container);
        
//         const commentAvatar = document.createElement("img");
//         commentAvatar.setAttribute("class", "comment__avatar");
//         commentAvatar.setAttribute("src", commentElem.avatar__image);
        
//         commentAvatar__container.appendChild(commentAvatar);
        
//         const commentText = document.createElement("div");
//         commentText.setAttribute("class", "comment__text");
//         comment.appendChild(commentText);
        
//         const commentHeader = document.createElement("div");
//         commentHeader.setAttribute("class", "comment__header");
//         commentText.appendChild(commentHeader);
        
//         const comment__heading = document.createElement("p");
//         comment__heading.setAttribute("class", "comment__heading");
//         comment__heading.innerText = commentElem.comment__heading;
        
//         commentHeader.appendChild(comment__heading);
        
//         const commentTimeStamp = document.createElement("p");
//         commentTimeStamp.setAttribute("class", "comment__time-stamp");
//         commentTimeStamp.innerText = commentElem.time_stamp;
        
//         commentHeader.append(commentTimeStamp);
        
//         const commentBody = document.createElement("p");
//         commentBody.setAttribute("class", "comment__body");
//         commentBody.innerText = commentElem.comment__body;

//         commentText.appendChild(commentBody);

//         return comment;
//     })

//     return commentsArr;
// }

// Year for the copyright in the footer
const year = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    year.textContent = currentYear;





// Changes:

// window page load listener
// 1: page load calls getComments; get request 
// --> .then returns commentObjectArray from api 
// --> calls createCommentElemArray (passes commentObjectArray to createCommentElemArray) 
// --> createElemCommentArray calls loadComments (passes commentElemArray to loadComments)  
// loadComments appends commentElems to container


// comment submit listener
// 2: createComment: put request passing event to api
// --> .then returns confirmation
// --> .then calls getComments get request (.catch calls error function if error returned)
// --> .then returns commentObjectArray


// <-- -->

// Planning:
// On submit form: --> createCommentObj (need to construct comment before making post request)

//  --> validate name and comment input min and max length

// --> if passes validation --> post request to bandsite api --> ***can call loading function to show something

// --> receives status + new comment back (*** could prepend to parent)

// --> call getComments

// --> when getComments returns promise set loading element to ""

// --> call load comments


// * eventListener on textArea for Enter submits form
document.querySelector(".comment__input--text").addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        console.log("You pushed 'Enter")
        document.querySelector(".comment__btn").click()
    }
})


// call get comments on page load
getComments();