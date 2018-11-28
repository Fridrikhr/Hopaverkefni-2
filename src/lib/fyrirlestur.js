function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(lectures);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

// this requests the file and executes a callback with the parsed result once
//   it is available
fetchJSONFile('../lectures.json', function(data){
    // do something with your data

    document.createElement = <title> slug </title>;
    document.createElement = <h3>category</h3>;
    document.createElement = <h1>title</h1>;

    console.log(data);
});