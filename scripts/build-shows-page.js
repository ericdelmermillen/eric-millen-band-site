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
        
        // Date header p
        let detailsHeadingDate = document.createElement("p");
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
        
        // Venue header p
        let detailsHeadingVenue = document.createElement("p");
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
