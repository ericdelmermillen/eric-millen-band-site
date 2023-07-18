let showsContainer = document.querySelector(".shows-container");

const BASE_URL = "https://project-1-api.herokuapp.com/";
const API_KEY = "api9536be29-b9d2-4068-bda0-2547f8adea65";

// showdates: example return

// {
//     "id": 0,
//     "date": 1630900800000,
//     "place": "Rockwood Music Hall",
//     "location": "New York City, NY, United States"
//   },


window.addEventListener(("DOMContentLoaded"), getShows());


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
    let showsArr = showObjsArr.map((showObj) => {

        // create show div
        let show = document.createElement("div");
        show.setAttribute("class", "show");
        show.setAttribute("id", showObj.id);
        
        // 1st show details div
        let showDetailsDate = document.createElement("div");
        showDetailsDate.setAttribute("class", "show__details");
        
        show.appendChild(showDetailsDate);

        // Date header p
        let detailsHeadingDate = document.createElement("p");
        detailsHeadingDate.setAttribute("class", "details__heading");
        detailsHeadingDate.innerText = "DATE";

        showDetailsDate.appendChild(detailsHeadingDate);

        // Date p
        let dateDetails = document.createElement("p");
        dateDetails.setAttribute("class", "date__details");
        dateDetails.innerText = new Date(showObj.date).toLocaleDateString(
            "en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
                });

        showDetailsDate.appendChild(dateDetails);

        // 2nd show details div
        let showDetailsVenue = document.createElement("div");
        showDetailsVenue.setAttribute("class", "show__details");
        
        show.appendChild(showDetailsVenue);

        // Venue header p
        let detailsHeadingVenue = document.createElement("p");
        detailsHeadingVenue.setAttribute("class", "details__heading");
        detailsHeadingVenue.innerText = "VENUE"
        
        showDetailsVenue.appendChild(detailsHeadingVenue);

        // Venue p
        let dateDetailsVenue = document.createElement("p");
        dateDetailsVenue.setAttribute("class", "venue__details");
        dateDetailsVenue.innerText = showObj.place;
        
        showDetailsVenue.appendChild(dateDetailsVenue);

        // 3rd show details div
        let showDetailsLocation = document.createElement("div");
        showDetailsLocation.setAttribute("class", "show__details");
        
        show.appendChild(showDetailsLocation);
        
        // Location header p
        let detailsHeadingLocation = document.createElement("p");
        detailsHeadingLocation.setAttribute("class", "details__heading");
        detailsHeadingLocation.innerText = "LOCATION";
        
        showDetailsLocation.appendChild(detailsHeadingLocation);
            
        // Venue p
        let dateDetailsLocation = document.createElement("p");
        dateDetailsLocation.setAttribute("class", "location__details");
        dateDetailsLocation.innerText = showObj.location;
        
        showDetailsLocation.appendChild(dateDetailsLocation);
    
        // cta div
        let showCta = document.createElement("div");
        showCta.setAttribute("class", "show__cta");
        
        show.appendChild(showCta);
        
        // cta button
        let btnBuyTickets = document.createElement("a");
        btnBuyTickets.setAttribute("class", "btn--buy-tickets");
    
        // Text
        btnBuyTickets.innerText = "BUY TICKETS";
        
        showCta.appendChild(btnBuyTickets);
        
        show.appendChild(showCta);    
        
        return show;
    })

    return showsArr
}

function loadShows(showsArr) {
    console.log(showsArr[0].outerHTML)
    showsArr.forEach(show => showsContainer.appendChild(show))
}


showsContainer.addEventListener("click", (e) => {
    let showsHTMLCollection = showsContainer.querySelectorAll(".show");
    let clickedChild = e.target.closest(".shows-container > * ");
    
    if (clickedChild !== showsContainer.firstElementChild && clickedChild.classList.contains("selected")) {
        clickedChild.classList.toggle("selected");

    } else if(clickedChild === showsContainer.firstElementChild) {
        console.log("first child clicked");
        showsHTMLCollection.forEach((show) => show.classList.remove("selected"));
    } else if (clickedChild !== showsContainer.firstElementChild){
        showsHTMLCollection.forEach((show) => show.classList.remove("selected"));
        clickedChild.classList.add("selected");
    }
})
  

document.addEventListener("click", (e) => {
    if(!showsContainer.contains(e.target)) {
        let shows = showsContainer.children;

        for(let show of shows) {
            show.classList.remove("selected");
        }
    }
})

// Year for the copyright in the footer
const year = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    year.textContent = currentYear;
