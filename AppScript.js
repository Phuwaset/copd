function doPost(e) {
    var formData = e.parameter;
    var encodedId = formData.autoId;
    var decodedId = Utilities.newBlob(Utilities.base64Decode(encodedId)).getDataAsString();
    var currentDate = formData.currentDate;
    var name = formData.name;
    var surname = formData.surname;
    var gender = formData.gender;
    var age = formData.age;
    var career = formData.career;
    var location_working = formData.location_working;
    var Id_P = formData.Id_P;
    var Chronic_illness = formData.Chronic_illness;
    var Cause_copd = formData.Cause_copd;
  
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([decodedId, currentDate, name, surname, Id_P, career, location_working, Chronic_illness, gender, age, Cause_copd]);
  
    // ส่งการตอบกลับในรูปแบบ JSON
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      autoId: decodedId,
      name: name
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  function doGet(e) {
    var id = e.parameter.id;
    var Id_P = e.parameter.Id_P;
    var name = e.parameter.name;
  
    Logger.log('ID: ' + id);
    Logger.log('Id_P: ' + Id_P);
  
    if (!id && !Id_P) {
      Logger.log('ID or Id_P parameter is missing');
      return ContentService.createTextOutput(JSON.stringify({
        error: 'ID or Id_P parameter is missing'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
  
    for (var i = 1; i < data.length; i++) {
      Logger.log('Value from Sheet (Id_P): ' + data[i][4]);
      Logger.log('Value input (Id_P): ' + Id_P);
  
      if ((Id_P && data[i][4].toString() === Id_P.toString()) || (id && data[i][0] === id)) {
        return ContentService.createTextOutput(JSON.stringify({
          id: data[i][0],
          name: data[i][2],
          surname: data[i][3],
          Id_P: data[i][4],
          gender: data[i][8],
          age: data[i][9],
          career: data[i][5]
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
  
  
    Logger.log('ID or Id_P not found');
    return ContentService.createTextOutput(JSON.stringify({
      error: 'ID or Id_P not found'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  
  
  
  