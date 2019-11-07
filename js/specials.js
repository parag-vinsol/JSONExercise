class LoadFromJSON {
  constructor(specialsDivId, jsonPath, classForSubmitButton) {
    this.specialsDivId = specialsDivId;
    this.selectOption = $(specialsDivId).find("select");
    this.jsonPath = jsonPath;   
    this.classForSubmitButton = classForSubmitButton;
    this.IsJSONResponseSuccessfull = true;
  }
  init() {
    $(this.specialsDivId).append("<div />");
    $.getJSON(this.jsonPath).done(this.getJSONData).fail(this.jsonRequestFail);
    this.selectOption.change(this.findSpecialsForTheDay);
    this.removeFormButton();
  }
  getJSONData = (data) => {
    this.jsonData = data;
  }
  jsonRequestFail = () => {
    this.IsJSONResponseSuccessfull = false;
  }
  findSpecialsForTheDay = (event) => {
    if(!this.IsJSONResponseSuccessfull) {
      $(this.specialsDivId).find("div").html("<h2>File Not Found</h2>");
    }
    else {  
      let selectedOption = $(event.target).val();
      if(this.isSelectedOptionPresent(selectedOption)) {
	let title = this.jsonData[selectedOption].title;
    	let text = this.jsonData[selectedOption].text;
        let img = this.jsonData[selectedOption].image;
        let fontColor = this.jsonData[selectedOption].color;
        $(this.specialsDivId).find("div").html(`<h2> ${title} </h2> <br> ${text} <br> <img src=${img}></img>`).css("color", fontColor);
	  }
      else {
        $(this.specialsDivId).find("div").html("Selected Option does not have any specials");
      }
    }
  }
  isSelectedOptionPresent = (selectedOption) => {
    return selectedOption;
  }
  removeFormButton() {
    $(this.specialsDivId).find(this.classForSubmitButton).remove();
  }
}
var loadFromJSON = new LoadFromJSON("#specials", "data/specials.json", ".buttons");
loadFromJSON.init();
