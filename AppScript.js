function doPost(e) {
  try {
    var formData = e.parameter;

    // ฟิลด์ที่ใช้ true/false
    var mMRC_Question1 = formData.mMRC_Question1; // ส่งเป็นข้อความ
    var mMRC_Question2 = formData.mMRC_Question2; // ส่งเป็นข้อความ
    var mMRC_Question3 = formData.mMRC_Question3; // ส่งเป็นข้อความ
    var mMRC_Question4 = formData.mMRC_Question4; // ส่งเป็นข้อความ
    var mMRC_Question5 = formData.mMRC_Question5; // ส่งเป็นข้อความ

    // ข้อมูลอื่น ๆ
    var encodedId = formData.autoId;
    var decodedBytes = Utilities.base64Decode(encodedId);
    var decodedId = Utilities.newBlob(decodedBytes).getDataAsString();
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
    var data = sheet.getDataRange().getValues();

    for (var i = 1; i < data.length; i++) {
      if ((Id_P && data[i][4].toString() === Id_P.toString()) || (decodedId && data[i][0] === decodedId)) {
        sheet.getRange(i + 1, 1).setValue(decodedId);
        sheet.getRange(i + 1, 2).setValue(currentDate);
        sheet.getRange(i + 1, 3).setValue(name);
        sheet.getRange(i + 1, 4).setValue(surname);
        sheet.getRange(i + 1, 5).setValue(Id_P);
        sheet.getRange(i + 1, 6).setValue(career);
        sheet.getRange(i + 1, 7).setValue(location_working);
        sheet.getRange(i + 1, 8).setValue(Chronic_illness);
        sheet.getRange(i + 1, 9).setValue(gender);
        sheet.getRange(i + 1, 10).setValue(age);
        sheet.getRange(i + 1, 11).setValue(Cause_copd);
        sheet.getRange(i + 1, 12).setValue(mMRC_Question1);
        sheet.getRange(i + 1, 13).setValue(mMRC_Question2);
        sheet.getRange(i + 1, 14).setValue(mMRC_Question3);
        sheet.getRange(i + 1, 15).setValue(mMRC_Question4);
        sheet.getRange(i + 1, 16).setValue(mMRC_Question5);

        return ContentService.createTextOutput(JSON.stringify({
          status: 'success',
          autoId: decodedId,
          name: name
        })).setMimeType(ContentService.MimeType.JSON)
          .setHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'ID or Id_P not found'
    })).setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}



function doGet(e) {
  var id = e.parameter.id;
  var Id_P = e.parameter.Id_P;
  var name = e.parameter.name ? e.parameter.name.toLowerCase() : null;
  var surname = e.parameter.surname ? e.parameter.surname.toLowerCase() : null;

  Logger.log('ID: ' + id);
  Logger.log('Id_P: ' + Id_P);
  Logger.log('Name: ' + name);
  Logger.log('Surname: ' + surname);

  if (!id && !Id_P && !name && !surname) {
    Logger.log('ID, Id_P, name, or surname parameter is missing');
    return ContentService.createTextOutput(JSON.stringify({
      error: 'ID, Id_P, name, or surname parameter is missing'
    })).setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var sheetName = data[i][2] ? data[i][2].toString().toLowerCase() : "";
    var sheetSurname = data[i][3] ? data[i][3].toString().toLowerCase() : "";

    // ค้นหาด้วย Id_P หรือ id
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

    // ค้นหาด้วย name และ surname (แบบไม่คำนึงถึงตัวพิมพ์เล็กใหญ่)
    if (name && surname && sheetName === name && sheetSurname === surname) {
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

  Logger.log('ID, Id_P, name, or surname not found');
  return ContentService.createTextOutput(JSON.stringify({
    error: 'ID, Id_P, name, or surname not found'
  })).setMimeType(ContentService.MimeType.JSON);
}






