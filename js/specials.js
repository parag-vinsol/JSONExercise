class LoadFromJSON {
  constructor(specialsDivId, jsonPath, classForSubmitButton, title, text, image, color) {
    this.specialsDivId = specialsDivId;
    $(specialsDivId).append("<div />");
    this.selectOption = $(specialsDivId).find("select");
    this.jsonPath = jsonPath;   
    this.classForSubmitButton = classForSubmitButton;
    this.titleForSpecial = title;
    this.textForSpecial = text;
    this.imageForSpecial = image;
	this.colorForFont = color;
	this.IsJSONResponseSuccessfull = true;
  }
  init() {
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
		let title = this.jsonData[selectedOption][this.titleForSpecial];
    	let text = this.jsonData[selectedOption][this.textForSpecial];
        let img = this.jsonData[selectedOption][this.imageForSpecial];
        let fontColor = this.jsonData[selectedOption][this.colorForFont];
        $(this.specialsDivId).find("div").html(`<h2> ${title} </h2> <br> ${text} <br> <img src=${img}></img>`).css("color", fontColor);
	  }
	  else {
		$(this.specialsDivId).find("div").html("Selected Option does not have any specials");
	  }
	}
  }
  isSelectedOptionPresent = (selectedOption) => {
    if(this.jsonData[selectedOption]) {
	  return true;
	}
	else {
	  return false;
	}
  }
  removeFormButton() {
    $(this.specialsDivId).find(this.classForSubmitButton).remove();
  }
}
var loadFromJSON = new LoadFromJSON("#specials", "data/specials.json", ".buttons", "title", "text", "image", "color");
loadFromJSON.init();
