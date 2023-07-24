const showsContainer = document.querySelector(".shows-container");

const BASE_URL = "https://project-1-api.herokuapp.com/";
const API_KEY = "api9536be29-b9d2-4068-bda0-2547f8adea65";

window.addEventListener(("load"), getShows);


// getShows
function getShows() {
    axios.get(`${BASE_URL}showdates?api_key=${API_KEY}`)
    .then(response => {
        const showsArr = createShowElemsArray(response.data); 
        loadShows(showsArr);
    })
    .catch(error => console.error(error));
}


// create showElemsArray
function createShowElemsArray(showObjsArr) {
    const showsArr = showObjsArr.map((showObj) => {

        // create show div
        const show = document.createElement("div");
        show.setAttribute("class", "show");
        show.setAttribute("id", showObj.id);
        
        // 1st show details div
        const showDetailsDate = document.createElement("div");
        showDetailsDate.setAttribute("class", "show__details");
        
        show.appendChild(showDetailsDate);

        // Date header p
        const detailsHeadingDate = document.createElement("p");
        detailsHeadingDate.setAttribute("class", "details__heading");
        detailsHeadingDate.innerText = "DATE";

        showDetailsDate.appendChild(detailsHeadingDate);

        // Date p
        const dateDetails = document.createElement("p");
        dateDetails.setAttribute("class", "date__details");
        dateDetails.innerText = new Date(showObj.date).toLocaleDateString(
            "en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
                });

        showDetailsDate.appendChild(dateDetails);

        // 2nd show details div
        const showDetailsVenue = document.createElement("div");
        showDetailsVenue.setAttribute("class", "show__details");
        
        show.appendChild(showDetailsVenue);

        // Venue header p
        const detailsHeadingVenue = document.createElement("p");
        detailsHeadingVenue.setAttribute("class", "details__heading");
        detailsHeadingVenue.innerText = "VENUE"
        
        showDetailsVenue.appendChild(detailsHeadingVenue);

        // Venue p
        const dateDetailsVenue = document.createElement("p");
        dateDetailsVenue.setAttribute("class", "venue__details");
        dateDetailsVenue.innerText = showObj.place;
        
        showDetailsVenue.appendChild(dateDetailsVenue);

        // 3rd show details div
        const showDetailsLocation = document.createElement("div");
        showDetailsLocation.setAttribute("class", "show__details");
        
        show.appendChild(showDetailsLocation);
        
        // Location header p
        const detailsHeadingLocation = document.createElement("p");
        detailsHeadingLocation.setAttribute("class", "details__heading");
        detailsHeadingLocation.innerText = "LOCATION";
        
        showDetailsLocation.appendChild(detailsHeadingLocation);
            
        // Venue p
        const dateDetailsLocation = document.createElement("p");
        dateDetailsLocation.setAttribute("class", "location__details");
        dateDetailsLocation.innerText = showObj.location;
        
        showDetailsLocation.appendChild(dateDetailsLocation);
    
        // cta div
        const showCta = document.createElement("div");
        showCta.setAttribute("class", "show__cta");
        
        show.appendChild(showCta);
        
        // cta button
        const btnBuyTickets = document.createElement("a");
        btnBuyTickets.setAttribute("class", "btn--buy-tickets");
    
        // Text
        btnBuyTickets.innerText = "BUY TICKETS";
        
        showCta.appendChild(btnBuyTickets);
        
        show.appendChild(showCta);    
        
        return show;
    })

    return showsArr
}
// create dummyShow
function createDummyShow() {
    const dummyShow = document.createElement("div");

        dummyShow.setAttribute("class", "show");
        
        // 1st show details div
        const showDetailsDate = document.createElement("div");
        showDetailsDate.setAttribute("class", "show__details");
        
        dummyShow.appendChild(showDetailsDate);

        // Date header p
        const detailsHeadingDate = document.createElement("p");
        detailsHeadingDate.setAttribute("class", "details__heading");
        detailsHeadingDate.innerText = "DATE";

        showDetailsDate.appendChild(detailsHeadingDate);

        // Date p
        const dateDetails = document.createElement("p");
        dateDetails.setAttribute("class", "date__details");
        dateDetails.innerText = ""

        showDetailsDate.appendChild(dateDetails);

        // 2nd show details div
        const showDetailsVenue = document.createElement("div");
        showDetailsVenue.setAttribute("class", "show__details");
        
        dummyShow.appendChild(showDetailsVenue);

        // Venue header p
        const detailsHeadingVenue = document.createElement("p");
        detailsHeadingVenue.setAttribute("class", "details__heading");
        detailsHeadingVenue.innerText = "VENUE"
        
        showDetailsVenue.appendChild(detailsHeadingVenue);

        // Venue p
        const dateDetailsVenue = document.createElement("p");
        dateDetailsVenue.setAttribute("class", "venue__details");
        dateDetailsVenue.innerText = "";
        
        showDetailsVenue.appendChild(dateDetailsVenue);

        // 3rd show details div
        const showDetailsLocation = document.createElement("div");
        showDetailsLocation.setAttribute("class", "show__details");
        
        dummyShow.appendChild(showDetailsLocation);
        
        // Location header p
        const detailsHeadingLocation = document.createElement("p");
        detailsHeadingLocation.setAttribute("class", "details__heading");
        detailsHeadingLocation.innerText = "LOCATION";
        
        showDetailsLocation.appendChild(detailsHeadingLocation);
            
        // Venue p
        const dateDetailsLocation = document.createElement("p");
        dateDetailsLocation.setAttribute("class", "location__details");
        dateDetailsLocation.innerText = "";
        
        showDetailsLocation.appendChild(dateDetailsLocation);
    
        // cta div
        const showCta = document.createElement("div");
        showCta.setAttribute("class", "show__cta");
        
        dummyShow.appendChild(showCta);
        
    return dummyShow
}

function loadShows(showsArr) {
    const dummyShow = createDummyShow();
    showsContainer.appendChild(dummyShow)
    
    showsArr.forEach(show => showsContainer.appendChild(show))
}

showsContainer.addEventListener("click", (e) => {
    const showsHTMLCollection = showsContainer.querySelectorAll(".show");
    const clickedChild = e.target.closest(".shows-container > * ");
    
    if (clickedChild !== showsContainer.firstElementChild && clickedChild.classList.contains("selected")) {
        clickedChild.classList.toggle("selected");

    } else if(clickedChild === showsContainer.firstElementChild) {
        showsHTMLCollection.forEach((show) => show.classList.remove("selected"));
    } else if (clickedChild !== showsContainer.firstElementChild){
        showsHTMLCollection.forEach((show) => show.classList.remove("selected"));
        clickedChild.classList.add("selected");
    }
})
  

document.addEventListener("click", (e) => {
    if(!showsContainer.contains(e.target)) {
        const shows = showsContainer.children;

        for(const show of shows) {
            show.classList.remove("selected");
        }
    }
})

// Year for the copyright in the footer
const year = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    year.textContent = currentYear;
