let showsContainer = document.querySelector(".shows-container");

let showsArray = [
  {
      date: "Mon Sept 06 2021",
      venue: "Ronald Lane",
      location: "San Francisco, CA"
  },
  {
      date: "Tues Sept 21 2021",
      venue: "Pier 3 East",
      location: "San Francisco, CA"
  },
  {
      date: "Fri Oct 15 2021",
      venue: "View Lounge",
      location: "San Francisco, CA"
  },
  {
      date: "Sat Nov 06 2021",
      venue: "Hyatt Regency",
      location: "San Francisco, CA"
  },
  {
      date: "Fri Nov 26 2021",
      venue: "Moscow Center",
      location: "San Francisco, CA"
  },
  {
      date: "Wed Dec 15 2021",
      venue: "Press Club",
      location: "San Francisco, CA"
  }
];

window.addEventListener(("DOMContentLoaded"), createShowElemArray());

function createShowElemArray() {
    showsArray.map((showObj) => {
        
        let show = document.createElement("div");
        show.setAttribute("class", "show");
        
        // 1st show details div
        let showDetailsDate = document.createElement("div");
        showDetailsDate.setAttribute("class", "show__details");
        
        show.appendChild(showDetailsDate);
        
        // Date h3
        let detailsHeadingDate = document.createElement("h3");
        detailsHeadingDate.setAttribute("class", "details__heading");
        detailsHeadingDate.innerText = "DATE";
        
        showDetailsDate.appendChild(detailsHeadingDate);
        
        // Date p
        let dateDetails = document.createElement("p");
        dateDetails.setAttribute("class", "date__details");
        dateDetails.innerText = showObj.date;
        
        showDetailsDate.appendChild(dateDetails);
        
        // 2nd show details div
        let showDetailsVenue = document.createElement("div");
        showDetailsVenue.setAttribute("class", "show__details");
        
        show.appendChild(showDetailsVenue);
        
        // Venue h3
        let detailsHeadingVenue = document.createElement("h3");
        detailsHeadingVenue.setAttribute("class", "details__heading");
        detailsHeadingVenue.innerText = "VENUE"
        
        showDetailsVenue.appendChild(detailsHeadingVenue);
        
        // Venue p
        let dateDetailsVenue = document.createElement("p");
        dateDetailsVenue.setAttribute("class", "venue__details");
        dateDetailsVenue.innerText = showObj.venue;
        
        showDetailsVenue.appendChild(dateDetailsVenue);
        
        // 3rd show details div
        let showDetailsLocation = document.createElement("div");
        showDetailsLocation.setAttribute("class", "show__details");
        
        show.appendChild(showDetailsLocation);
        
        // Location h3
        let detailsHeadingLocation = document.createElement("h3");
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
        
        // show.appendChild(showCta);
        
        // cta button
        let btnBuyTickets = document.createElement("a");
        btnBuyTickets.setAttribute("class", "btn--buy-tickets");

        // Text
        btnBuyTickets.innerText = "BUY TICKETS";
        
        showCta.appendChild(btnBuyTickets);
        
        show.appendChild(showCta);    
        
        document.querySelector('.shows-container').appendChild(show);
        }
    );
}

// showsContainer.addEventListener("click", (e) => {
//     let showsHTMLCollection = showsContainer.children;
//     let clickedChild = e.target.closest(".shows-container > * ")
    
//     if (clickedChild !== showsContainer.firstElementChild &&clickedChild.classList.contains("highlighted")) {
//         clickedChild.classList.toggle("highlighted")
//     } else if (clickedChild !== showsContainer.firstElementChild){
        
//         for(let i = 0; i < showsHTMLCollection.length; i++) {
//             showsHTMLCollection[i].classList.remove("highlighted");
//         } clickedChild.classList.add("highlighted")
//     }
// })

  
showsContainer.addEventListener("click", (e) => {
    let showsHTMLCollection = showsContainer.querySelectorAll(".show");
    let clickedChild = e.target.closest(".shows-container > * ");
    
    if (clickedChild !== showsContainer.firstElementChild && clickedChild.classList.contains("highlighted")) {
        clickedChild.classList.toggle("highlighted");
    } else if (clickedChild !== showsContainer.firstElementChild){
        showsHTMLCollection.forEach((show) => show.classList.remove("highlighted"));
        clickedChild.classList.add("highlighted");
    }
})
  

document.addEventListener("click", (e) => {
    if(!showsContainer.contains(e.target)) {
        console.log("outside");
        let shows = showsContainer.children;

        for(let show of shows) {
            show.classList.remove("highlighted");
        }
    }
})