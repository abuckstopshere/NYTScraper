function searchArticles(searchTerm , beginDate , endDate) {
    // set url vairable equal to nytimes api article search
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    // add parameters (designated by question mark) to include api key in order to be granted access to api
    url += '?' + $.param({
      'api-key': "96762f55ae9a4204ac699f7a5f67ba33" })
    // word(s) to be queried
    url += '&' + $.param({
        'q' : searchTerm })
        // begin date - if provided - with specific start date of Jan 1
    if ( beginDate !== "" ) {
    url += '&' + $.param({
        'begin_date' : beginDate + "0101"})}
        // end date - if provided - with specific end date of Dec 31
    if ( endDate !== "" ) {
    url += '&' + $.param({
        'end_date' : endDate + "1231"})}
    // perform ajax get on designated url
    $.ajax({
      url: url,
      method: 'GET',
    }).then(function(result) {
        // get the chosen value of desired articles to be returned
        var artNumb = $("#articleNumber").val()
        // for loop to append all the necessary data from the returned object for specifically the amount of articles requested
        for ( i = 0 ; i < artNumb ; i++ ) {
            // var pubDate = $(result.response.docs[i].pub_date).substring( 0 , 10 )
            // console.log(pubDate)
            $("#articleResults").append(`
                    <a href="${result.response.docs[i].web_url}" class="list-group-item list-group-item-action flex-column align-items-start active" target = "_blank">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${result.response.docs[i].headline.main}</h5>
                    <small>3 days ago</small>
                    </div>
                    <p class="mb-1">${result.response.docs[i].snippet}</p>
                    <small> ~ ${result.response.docs[i].byline.original}</small>
                    </a> <br>`)
            }
            })
            }
    
    
// Event handler for user clicking the search button
     $("#search").on("click", function(event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        // Storing the search term and, if provided, the start year and end year
        var searchTerm = $("#searchTerm").val()
        var beginDate = $("#startYear").val()
        var endDate = $("#endYear").val()
        // clearing the previous list of results
        $("#articleResults").empty()
    
        // Running the searchBandsInTown function (passing in the artist as an argument)
        searchArticles(searchTerm , beginDate , endDate);
      });
    
// on click even handler for clearing the most recent list of results on the clear button click
      $("#clear").on("click" , function(event) {
          $("#articleResults").empty()
      })