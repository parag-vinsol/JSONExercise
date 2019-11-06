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
  }
  init() {
    $.getJSON(this.jsonPath, this.getJSONData);
    this.selectOption.change(this.findSpecialsForTheDay);
    this.removeGoButton();
  }
  getJSONData = (data) => {
    this.jsonData = data;
  }
  findSpecialsForTheDay = (event) => {
    let selectedOption = $(event.target).val();
    let title = this.jsonData[selectedOption][this.titleForSpecial];
    let text = this.jsonData[selectedOption][this.textForSpecial];
    let img = this.jsonData[selectedOption][this.imageForSpecial];
    let fontColor = this.jsonData[selectedOption][this.colorForFont];
    $(this.specialsDivId).find("div").html(`<h2> ${title} </h2> <br> ${text} <br> <img src=${img}></img>`).css("color", fontColor);
  }
  removeGoButton() {
    $(this.specialsDivId).find(this.classForSubmitButton).remove();
  }
}
var loadFromJSON = new LoadFromJSON("#specials", "data/specials.json", ".buttons", "title", "text", "image", "color");
loadFromJSON.init();