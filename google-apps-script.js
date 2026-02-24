/**
 * Google Apps Script for Violin Booking Form Integration
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet with the following columns in row 1:
 *    Timestamp | Name | Phone | Email | Event Date | Event Time | Location | Budget | Message | Status
 *
 * 2. Open Extensions → Apps Script
 * 3. Copy and paste this entire code
 * 4. Click Save (💾 icon)
 * 5. Click Deploy → New deployment
 * 6. Select type: Web app
 * 7. Execute as: Me
 * 8. Who has access: Anyone
 * 9. Click Deploy and copy the Web app URL
 * 10. Add the URL to your Vercel environment variables as GOOGLE_SHEETS_WEBHOOK_URL
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.name || !data.email || !data.phone) {
      throw new Error('Missing required fields');
    }

    // Append a new row with the booking data
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name,
      data.phone,
      data.email,
      data.eventDate,
      data.eventTime,
      data.location,
      data.budget,
      data.message || '',
      data.status || 'Pending'
    ]);

    // Optional: Send email notification to yourself
    // Uncomment the following lines to enable email notifications:
    /*
    MailApp.sendEmail({
      to: 'shobitji2@gmail.com',
      subject: 'New Booking Request from ' + data.name,
      body: 'You have a new booking request!\n\n' +
            'Name: ' + data.name + '\n' +
            'Phone: ' + data.phone + '\n' +
            'Email: ' + data.email + '\n' +
            'Event Date: ' + data.eventDate + '\n' +
            'Time: ' + data.eventTime + '\n' +
            'Location: ' + data.location + '\n' +
            'Budget: ' + data.budget + '\n' +
            'Message: ' + data.message
    });
    */

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Booking saved successfully',
      'timestamp': new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error for debugging
    Logger.log('Error: ' + error.toString());

    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Function to test the script
 * Run this from the Apps Script editor to test if it works
 */
function testScript() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: 'Test User',
        phone: '+91 9876543210',
        email: 'test@example.com',
        eventDate: 'March 15, 2026',
        eventTime: '18:00',
        location: 'Delhi, India',
        budget: '₹ 50,000',
        message: 'This is a test booking',
        status: 'Pending'
      })
    }
  };

  var response = doPost(testData);
  Logger.log(response.getContent());
}

/**
 * Optional: Function to format the sheet
 * Run this once to make your sheet look nice
 */
function formatSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Freeze the header row
  sheet.setFrozenRows(1);

  // Make header row bold and colored
  var headerRange = sheet.getRange(1, 1, 1, 10);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');

  // Auto-resize columns
  for (var i = 1; i <= 10; i++) {
    sheet.autoResizeColumn(i);
  }

  // Set column widths for better visibility
  sheet.setColumnWidth(1, 180); // Timestamp
  sheet.setColumnWidth(2, 150); // Name
  sheet.setColumnWidth(3, 130); // Phone
  sheet.setColumnWidth(4, 200); // Email
  sheet.setColumnWidth(5, 150); // Event Date
  sheet.setColumnWidth(6, 100); // Event Time
  sheet.setColumnWidth(7, 150); // Location
  sheet.setColumnWidth(8, 120); // Budget
  sheet.setColumnWidth(9, 250); // Message
  sheet.setColumnWidth(10, 100); // Status

  // Add data validation for Status column (optional)
  var statusRange = sheet.getRange(2, 10, sheet.getMaxRows() - 1, 1);
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Pending', 'Confirmed', 'Declined', 'Completed'])
    .build();
  statusRange.setDataValidation(rule);
}
