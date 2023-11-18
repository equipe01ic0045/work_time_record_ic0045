function getUserTimeZone() {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return userTimeZone;
  }
  
  // Usage example
  const userTimeZone = getUserTimeZone();
  console.log('User Time Zone:', userTimeZone);

  function convertToUTC(timeString, timeZone) {
    // Parse the input time in the user's time zone
    const userTime = new Date(timeString);
  
    // Get the user's time zone offset in minutes
    const userTimeZoneOffset = userTime.getTimezoneOffset();
  
    // Create a new Date object with the UTC time
    const utcTime = new Date(userTime.getTime() + userTimeZoneOffset * 60 * 1000);
  
    // If the target time zone is different, adjust the time
    if (timeZone !== 'UTC') {
      const targetTimeZoneOffset = new Date(utcTime.toLocaleString('en-US', { timeZone })).getTimezoneOffset();
      const offsetDifference = targetTimeZoneOffset - userTimeZoneOffset;
      utcTime.setMinutes(utcTime.getMinutes() - offsetDifference);
    }
  
    return utcTime;
  }
  
  // Example usage
  const timeString = new Date()
  
  const utcTime = convertToUTC(timeString, userTimeZone);
  console.log("pc time: ", timeString)
  console.log('UTC Time:', utcTime.toISOString());