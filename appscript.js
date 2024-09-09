function getCustomUSERId() {
  let rawId = Utilities.getUuid.split("-").join("");
  rawId = rawId.slice(0,10);
  return rawId;
}

function doPost(e) {
  var sheet = SpreadsheetApp.openById('1A2B3C4D5E6F7G8H9I0J').getSheetByName('Sheet1');
  var params = e ? e.parameter : {};

  // Log parameters received in POST request
  Logger.log('Parameters: ' + JSON.stringify(params));

  var detailText = params.mmrc_detail;
  var levelMmrc = parseInt(params.level_mmrc, 10); // ใช้ฐาน 10 สำหรับการ parse
  var detailTextCAT = params.cat_detail;

  var levelCat = parseInt(params.level_cat, 10); // ใช้ฐาน 10 สำหรับการ parse


  sheet.appendRow([new Date(),getCustomUSERId()])
  sheet.appendRow([detailText, levelMmrc]);
  sheet.appendRow([detailTextCAT, levelCat]);

  // เก็บข้อมูลใน User Properties
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('username', params.name); // สมมติว่ามีฟิลด์ 'name'

  return ContentService.createTextOutput('successfully');
}

function doGet(e) {
  var template = HtmlService.createTemplateFromFile('register_COPD');
  return template.evaluate();
}
